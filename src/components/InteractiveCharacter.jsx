import React, { useEffect, useRef } from 'react';

/**
 * InteractiveCharacter
 * 
 * Cinematic 2D Anime Character Eye Tracking & Facial Animation Engine
 * 
 * Implements:
 * 1. Natural Eye Tracking: Rigid-core iris translation without distortion or bulging.
 * 2. Relative Face Gaze Zone: Cursor distance calculated relative to face center with edge dampening.
 * 3. Human Interpolation Lag: RAF-driven organic acceleration/deceleration (~500ms response).
 * 4. Symmetrical Tracking: Both eyes track synchronously with strict sclera clamping (max 7.2px X, 3.4px Y).
 * 5. Automatic Natural Blinking: 3-6s randomized interval, 140ms duration, occasional double-blink.
 * 6. Responsive Friendly Smile: Ramps in (500-800ms) on hero entry; smoothly returns to neutral on exit.
 * 7. Eyelid Occlusion & Layering: Upper lid naturally covers iris when looking upward.
 * 8. Mobile Safe: Touch devices retain peaceful centered gaze and blinking with zero touch tracking.
 */
export default function InteractiveCharacter({ isHovered = false, isTouchDevice = false }) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // 60 FPS Physics & Animation State (ref-based for zero React re-renders)
  const gazeStateRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    currentSmile: 0,
    targetSmile: 0,
    isBlinking: false,
    ready: false,
    baseImg: null,
    blinkPatch: null,
    smilePatch: null,
    eyeBuffer: null,
    eyeBufferCtx: null,
  });

  // 1. Asset Preloading & Eye Buffer Initialization
  useEffect(() => {
    let active = true;
    const baseImg = new Image();
    const blinkPatch = new Image();
    const smilePatch = new Image();

    baseImg.src = '/guna-formal-transparent.png';
    blinkPatch.src = '/guna-patch-blink.png';
    smilePatch.src = '/guna-patch-smile.png';

    let loadedCount = 0;
    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === 3 && active) {
        // Offscreen buffer for the eye socket region (240x70)
        // Source eye region in 1376x768 base image: x=530, y=255, w=240, h=70
        const eyeBuffer = document.createElement('canvas');
        eyeBuffer.width = 240;
        eyeBuffer.height = 70;
        const eyeBufferCtx = eyeBuffer.getContext('2d');
        eyeBufferCtx.drawImage(baseImg, 530, 255, 240, 70, 0, 0, 240, 70);

        gazeStateRef.current.ready = true;
        gazeStateRef.current.baseImg = baseImg;
        gazeStateRef.current.blinkPatch = blinkPatch;
        gazeStateRef.current.smilePatch = smilePatch;
        gazeStateRef.current.eyeBuffer = eyeBuffer;
        gazeStateRef.current.eyeBufferCtx = eyeBufferCtx;
      }
    };

    baseImg.onload = handleLoad;
    blinkPatch.onload = handleLoad;
    smilePatch.onload = handleLoad;

    return () => {
      active = false;
    };
  }, []);

  // 2. Relative Face Gaze Zone Tracking (Requirement 1, 4, 9, 10)
  useEffect(() => {
    if (isTouchDevice) return;

    const handleWindowMouseMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();

      // Check if cursor is inside or near the hero section
      const heroEl = document.getElementById('home');
      let isInsideHero = isHovered;
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        // Give a generous 100px padding around hero
        isInsideHero = (
          e.clientY >= heroRect.top - 50 &&
          e.clientY <= heroRect.bottom + 50 &&
          e.clientX >= heroRect.left &&
          e.clientX <= heroRect.right
        );
      }

      // If cursor is outside hero, target returns to neutral center (Requirement 9)
      if (!isInsideHero) {
        gazeStateRef.current.targetX = 0;
        gazeStateRef.current.targetY = 0;
        gazeStateRef.current.targetSmile = 0.0;
        return;
      }

      // Friendly smile response when inside hero (Requirement 7)
      gazeStateRef.current.targetSmile = 0.75;

      // Character's face center in viewport coordinates
      // In 1600x1476 canvas: face center is at X=814 (50.8%), Y=502 (34.0%)
      const faceCenterX = rect.left + rect.width * 0.508;
      const faceCenterY = rect.top + rect.height * 0.340;

      const deltaX = e.clientX - faceCenterX;
      const deltaY = e.clientY - faceCenterY;

      // Limited Natural Gaze Zone around the face (Requirement 4)
      // Active interaction zone: ~520px horizontal, ~360px vertical
      const zoneX = Math.max(window.innerWidth * 0.40, 500);
      const zoneY = Math.max(window.innerHeight * 0.40, 350);

      // Soft non-linear saturation curve (tanh) - looking AT cursor rather than linear sliding
      const normX = Math.tanh(deltaX / zoneX);
      const normY = Math.tanh(deltaY / zoneY);

      // Edge dampening factor to prevent straining at extreme screen edges (Requirement 4)
      const distFromEdgeX = Math.min(e.clientX, window.innerWidth - e.clientX) / (window.innerWidth * 0.5);
      const distFromEdgeY = Math.min(e.clientY, window.innerHeight - e.clientY) / (window.innerHeight * 0.5);
      const edgeFactor = Math.min(1.0, Math.max(0.72, Math.min(distFromEdgeX, distFromEdgeY) * 1.35));

      // Maximum iris movement (subtle natural gaze: max ~3.8px X, 2.2px Y)
      const targetX = normX * 3.8 * edgeFactor;
      const targetY = normY * 2.2 * edgeFactor;

      gazeStateRef.current.targetX = targetX;
      gazeStateRef.current.targetY = targetY;
    };

    const handleMouseLeave = () => {
      // Cursor left window completely -> return to center
      gazeStateRef.current.targetX = 0;
      gazeStateRef.current.targetY = 0;
      gazeStateRef.current.targetSmile = 0.0;
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouchDevice, isHovered]);

  // 3. Natural Blinking Scheduler: 3-6s interval, 140ms duration, occasional double-blink (Requirement 6)
  useEffect(() => {
    let timeoutId;
    let blinkDurationId;
    let doubleBlinkId;
    let isMounted = true;

    const triggerBlink = (duration, onComplete) => {
      gazeStateRef.current.isBlinking = true;
      blinkDurationId = setTimeout(() => {
        gazeStateRef.current.isBlinking = false;
        if (onComplete) onComplete();
      }, duration);
    };

    const scheduleNextBlink = () => {
      if (!isMounted) return;
      // Randomized interval between 3.0s and 6.0s
      const delay = 3000 + Math.random() * 3000;
      timeoutId = setTimeout(() => {
        // 20% probability of natural double-blink
        if (Math.random() < 0.20) {
          triggerBlink(120, () => {
            doubleBlinkId = setTimeout(() => {
              triggerBlink(110, scheduleNextBlink);
            }, 90);
          });
        } else {
          // Standard single blink: 140ms
          triggerBlink(140, scheduleNextBlink);
        }
      }, delay);
    };

    scheduleNextBlink();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      clearTimeout(blinkDurationId);
      clearTimeout(doubleBlinkId);
    };
  }, []);

  // 4. Smile Response Synced to Hero Hover (Requirement 7)
  useEffect(() => {
    if (isHovered) {
      gazeStateRef.current.targetSmile = 0.75;
    } else {
      gazeStateRef.current.targetSmile = 0.0;
    }
  }, [isHovered]);

  // 5. 60 FPS GPU Canvas Rendering Engine (Requirements 1, 2, 3, 8, 11)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // High-DPI coordinate mapping (Retina 2.0x sharpness)
    // Source: X in [240, 1040] (w=800), Y in [30, 768] (h=738) -> Canvas: 1600 x 1476
    const CROP = {
      srcX: 240,
      srcY: 30,
      srcW: 800,
      srcH: 738,
      dstW: 1600,
      dstH: 1476,
      scale: 2.0,
    };

    const toCanvasX = (x) => (x - CROP.srcX) * CROP.scale;
    const toCanvasY = (y) => (y - CROP.srcY) * CROP.scale;

    // Anatomical 3D Eye Definitions with exact lash-line contour clipping
    const eyes = [
      {
        cx: 61.5,
        cy: 20.6,
        rx: 15.6,
        ry: 8.8,
        irisRx: 8.8,
        irisRy: 9.6,
        pupilRx: 3.9,
        pupilRy: 4.3,
        path: (c) => {
          c.beginPath();
          c.moveTo(43.5, 22.0);
          c.bezierCurveTo(48.0, 14.6, 68.0, 14.0, 77.2, 22.2);
          c.bezierCurveTo(71.0, 28.2, 51.5, 28.0, 43.5, 22.0);
          c.closePath();
        }
      },
      {
        cx: 173.0,
        cy: 20.6,
        rx: 15.6,
        ry: 8.8,
        irisRx: 8.8,
        irisRy: 9.6,
        pupilRx: 3.9,
        pupilRy: 4.3,
        path: (c) => {
          c.beginPath();
          c.moveTo(157.0, 22.2);
          c.bezierCurveTo(166.0, 14.0, 186.0, 14.6, 190.5, 22.0);
          c.bezierCurveTo(184.5, 28.0, 163.5, 28.2, 157.0, 22.2);
          c.closePath();
        }
      }
    ];

    const render = () => {
      const state = gazeStateRef.current;

      if (state.ready) {
        // Organic human lag interpolation with smooth acceleration/deceleration
        // Spring factor: ~0.082 gives a calm, deliberate ~500ms human gaze movement
        const lagFactor = (state.targetX === 0 && state.targetY === 0) ? 0.065 : 0.082;
        if (!state.isBlinking) {
          state.currentX += (state.targetX - state.currentX) * lagFactor;
          state.currentY += (state.targetY - state.currentY) * lagFactor;
        }

        // Smooth smile transition (duration ~600ms, factor 0.045)
        state.currentSmile += (state.targetSmile - state.currentSmile) * 0.045;

        // Clear canvas (100% transparent background)
        ctx.clearRect(0, 0, CROP.dstW, CROP.dstH);

        // Layer 1: Base Character Body & Torso (Shoulders 100% complete & uncropped)
        ctx.drawImage(
          state.baseImg,
          CROP.srcX, CROP.srcY, CROP.srcW, CROP.srcH,
          0, 0, CROP.dstW, CROP.dstH
        );

        // Layer 2: 3D Dimensional Eye Rendering Engine
        // Clamped strictly to anatomy (max ±3.8px X, ±2.2px Y - never leaves sclera)
        const shiftX = Math.max(-3.8, Math.min(3.8, state.currentX));
        const shiftY = Math.max(-2.2, Math.min(2.2, state.currentY));

        if (!state.isBlinking) {
          const eyeCtx = state.eyeBufferCtx;
          // Refresh eyeBuffer with original face pixels to keep surrounding lashes & skin 100% pristine
          eyeCtx.drawImage(state.baseImg, 530, 255, 240, 70, 0, 0, 240, 70);

          for (const eye of eyes) {
            eyeCtx.save();
            eye.path(eyeCtx);
            eyeCtx.clip();

            // A. Clean Anatomical Sclera with soft depth gradient
            const scleraGrad = eyeCtx.createRadialGradient(
              eye.cx, eye.cy, 2,
              eye.cx, eye.cy, eye.rx
            );
            scleraGrad.addColorStop(0.0, '#fafafc');
            scleraGrad.addColorStop(0.68, '#eeedf0');
            scleraGrad.addColorStop(1.0, '#dad4d6');
            eyeCtx.fillStyle = scleraGrad;
            eyeCtx.fill();

            // Caruncle pink warmth in inner eye corner
            if (eye.cx < 100) {
              const cornerGrad = eyeCtx.createRadialGradient(76.5, 22.2, 0, 76.5, 22.2, 7.5);
              cornerGrad.addColorStop(0.0, 'rgba(235, 170, 165, 0.70)');
              cornerGrad.addColorStop(1.0, 'rgba(235, 170, 165, 0.0)');
              eyeCtx.fillStyle = cornerGrad;
              eyeCtx.fill();
            } else {
              const cornerGrad = eyeCtx.createRadialGradient(157.5, 22.2, 0, 157.5, 22.2, 7.5);
              cornerGrad.addColorStop(0.0, 'rgba(235, 170, 165, 0.70)');
              cornerGrad.addColorStop(1.0, 'rgba(235, 170, 165, 0.0)');
              eyeCtx.fillStyle = cornerGrad;
              eyeCtx.fill();
            }

            const ix = eye.cx + shiftX;
            const iy = eye.cy + shiftY;
            const irx = eye.irisRx;
            const iry = eye.irisRy;
            const prx = eye.pupilRx;

            // B. Layered 3D Iris with Limbal Ring & Warm Depth
            eyeCtx.save();
            eyeCtx.translate(ix, iy);
            eyeCtx.scale(1, iry / irx);

            const irisGrad = eyeCtx.createRadialGradient(-0.3, -0.3, 0.5, 0, 0, irx);
            irisGrad.addColorStop(0.0, '#0c0a0e'); // Deep velvet pupil boundary
            irisGrad.addColorStop(0.38, '#1d1513'); // Rich dark espresso
            irisGrad.addColorStop(0.70, '#38281e'); // Warm chestnut amber depth
            irisGrad.addColorStop(0.90, '#211814'); // Transition ring
            irisGrad.addColorStop(1.0, '#09080b'); // Outer limbal ring

            eyeCtx.fillStyle = irisGrad;
            eyeCtx.beginPath();
            eyeCtx.arc(0, 0, irx, 0, Math.PI * 2);
            eyeCtx.fill();

            // C. Fine Iris Radial Striations
            eyeCtx.globalAlpha = 0.16;
            eyeCtx.strokeStyle = '#5a4232';
            eyeCtx.lineWidth = 0.6;
            for (let a = 0; a < Math.PI * 2; a += Math.PI / 7) {
              eyeCtx.beginPath();
              eyeCtx.moveTo(Math.cos(a) * (irx * 0.38), Math.sin(a) * (irx * 0.38));
              eyeCtx.lineTo(Math.cos(a) * (irx * 0.90), Math.sin(a) * (irx * 0.90));
              eyeCtx.stroke();
            }
            eyeCtx.globalAlpha = 1.0;

            // D. Outer Limbal Ring Stroke
            eyeCtx.strokeStyle = 'rgba(7, 7, 10, 0.94)';
            eyeCtx.lineWidth = 0.9;
            eyeCtx.beginPath();
            eyeCtx.arc(0, 0, irx - 0.45, 0, Math.PI * 2);
            eyeCtx.stroke();

            // E. Dimensional 3D Pupil
            const pupilGrad = eyeCtx.createRadialGradient(0, 0, 0, 0, 0, prx);
            pupilGrad.addColorStop(0.0, '#020204');
            pupilGrad.addColorStop(0.85, '#070609');
            pupilGrad.addColorStop(1.0, '#120f14');
            eyeCtx.fillStyle = pupilGrad;
            eyeCtx.beginPath();
            eyeCtx.arc(0, 0, prx, 0, Math.PI * 2);
            eyeCtx.fill();

            // F. Bottom Amber Light Bounce
            const bounceGrad = eyeCtx.createRadialGradient(
              irx * 0.30, irx * 0.30, 0,
              irx * 0.30, irx * 0.30, irx * 0.52
            );
            bounceGrad.addColorStop(0.0, 'rgba(165, 120, 95, 0.30)');
            bounceGrad.addColorStop(1.0, 'rgba(165, 120, 95, 0.0)');
            eyeCtx.fillStyle = bounceGrad;
            eyeCtx.beginPath();
            eyeCtx.arc(0, 0, irx - 0.8, 0, Math.PI * 2);
            eyeCtx.fill();

            eyeCtx.restore();

            // G. Upper Eyelid Ambient Occlusion Shadow
            const shadowGrad = eyeCtx.createLinearGradient(0, eye.cy - eye.ry, 0, eye.cy + eye.ry * 0.35);
            shadowGrad.addColorStop(0.0, 'rgba(14, 10, 16, 0.62)');
            shadowGrad.addColorStop(0.65, 'rgba(14, 10, 16, 0.22)');
            shadowGrad.addColorStop(1.0, 'rgba(14, 10, 16, 0.0)');
            eyeCtx.fillStyle = shadowGrad;
            eyeCtx.fillRect(eye.cx - eye.rx - 2, eye.cy - eye.ry - 2, (eye.rx + 2) * 2, eye.ry * 2);

            // H. Specular Corneal Catchlights with 3D Parallax Shift
            const lx = ix - 2.5 + shiftX * 0.15;
            const ly = iy - 2.6 + shiftY * 0.15;

            // Soft gloss aura
            const glossGlow = eyeCtx.createRadialGradient(lx, ly, 0, lx, ly, 2.8);
            glossGlow.addColorStop(0.0, 'rgba(255, 255, 255, 0.90)');
            glossGlow.addColorStop(0.40, 'rgba(255, 255, 255, 0.35)');
            glossGlow.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
            eyeCtx.fillStyle = glossGlow;
            eyeCtx.beginPath();
            eyeCtx.arc(lx, ly, 2.8, 0, Math.PI * 2);
            eyeCtx.fill();

            // Crisp specular diamond
            eyeCtx.fillStyle = '#ffffff';
            eyeCtx.beginPath();
            eyeCtx.arc(lx - 0.15, ly - 0.15, 1.25, 0, Math.PI * 2);
            eyeCtx.fill();

            // Secondary micro-catchlight
            eyeCtx.fillStyle = 'rgba(255, 255, 255, 0.55)';
            eyeCtx.beginPath();
            eyeCtx.arc(lx + 1.2, ly + 2.4, 0.60, 0, Math.PI * 2);
            eyeCtx.fill();

            eyeCtx.restore();
          }

          // Blit 3D eye buffer to character canvas
          ctx.drawImage(
            state.eyeBuffer,
            toCanvasX(530), toCanvasY(255),
            240 * CROP.scale, 70 * CROP.scale
          );
        }

        // Layer 3: Warm Subtle Smiling Mouth Overlay (Requirement 7: No teeth, gentle friendly smile)
        if (state.currentSmile > 0.01) {
          ctx.save();
          ctx.globalAlpha = Math.min(1, Math.max(0, state.currentSmile));
          ctx.drawImage(
            state.smilePatch,
            toCanvasX(578), toCanvasY(345),
            220 * CROP.scale, 80 * CROP.scale
          );
          ctx.restore();
        }

        // Layer 4: Authentic Closed Eyelid Blink Overlay (Requirement 6: 120-180ms duration)
        if (state.isBlinking) {
          ctx.save();
          ctx.drawImage(
            state.blinkPatch,
            toCanvasX(530), toCanvasY(255),
            240 * CROP.scale, 70 * CROP.scale
          );
          ctx.restore();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={1600}
        height={1476}
        className="w-full h-full object-contain select-none pointer-events-none filter contrast-[1.02] drop-shadow-[0_20px_40px_rgba(20,24,35,0.12)]"
        style={{
          maskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
        }}
      />
    </div>
  );
}
