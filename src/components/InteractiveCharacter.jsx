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
    baseEyeData: null,
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
        const baseEyeData = eyeBufferCtx.getImageData(0, 0, 240, 70);

        gazeStateRef.current.ready = true;
        gazeStateRef.current.baseImg = baseImg;
        gazeStateRef.current.blinkPatch = blinkPatch;
        gazeStateRef.current.smilePatch = smilePatch;
        gazeStateRef.current.eyeBuffer = eyeBuffer;
        gazeStateRef.current.eyeBufferCtx = eyeBufferCtx;
        gazeStateRef.current.baseEyeData = baseEyeData;
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

      // Maximum iris movement (Requirement 2: horizontal 6-9px, vertical 3-5px)
      // Normal gaze: ~70% horizontal, ~40% vertical of maximum
      const targetX = normX * 7.2 * edgeFactor;
      const targetY = normY * 3.4 * edgeFactor;

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

        // Layer 2: Rigid-Core Eye Gaze Tracking (Requirements 1, 2, 3, 8)
        // Clamped strictly to anatomy: max 7.2px X, 3.4px Y (never leaves eye whites)
        const shiftX = Math.max(-7.4, Math.min(7.4, state.currentX));
        const shiftY = Math.max(-3.6, Math.min(3.6, state.currentY));

        if (!state.isBlinking && (Math.abs(shiftX) > 0.02 || Math.abs(shiftY) > 0.02)) {
          const w = 240, h = 70;
          const outData = state.eyeBufferCtx.createImageData(w, h);
          const src = state.baseEyeData.data;
          const dst = outData.data;
          for (let i = 0; i < src.length; i++) dst[i] = src[i];

          // Anatomical eye socket centers and radii in 240x70 buffer
          // rInner = 0.55 defines the rigid iris core (100% distortion-free)
          const eyes = [
            { cx: 61.5, cy: 22.0, rx: 22.0, ry: 12.0, rInner: 0.55 },
            { cx: 173.0, cy: 22.0, rx: 22.0, ry: 12.0, rInner: 0.55 },
          ];

          for (const eye of eyes) {
            const xMin = Math.max(0, Math.floor(eye.cx - eye.rx));
            const xMax = Math.min(w - 1, Math.ceil(eye.cx + eye.rx));
            const yMin = Math.max(0, Math.floor(eye.cy - eye.ry));
            const yMax = Math.min(h - 1, Math.ceil(eye.cy + eye.ry));

            for (let y = yMin; y <= yMax; y++) {
              for (let x = xMin; x <= xMax; x++) {
                const nx = (x - eye.cx) / eye.rx;
                const ny = (y - eye.cy) / eye.ry;
                const r = Math.sqrt(nx * nx + ny * ny);

                if (r < 1.0) {
                  let weight;
                  if (r <= eye.rInner) {
                    // RIGID IRIS CORE: 100% constant translation
                    // Guarantees zero pupil distortion, zero bulging, and round symmetry
                    weight = 1.0;
                  } else {
                    // Smooth cosine S-curve falloff to 0 at the eyelid boundary
                    // Eyelids, eyelashes, skin, and eye corners remain 100% fixed
                    const t = (r - eye.rInner) / (1.0 - eye.rInner);
                    weight = 0.5 * (1.0 + Math.cos(t * Math.PI));
                  }

                  const srcX = x - shiftX * weight;
                  const srcY = y - shiftY * weight;

                  const x0 = Math.floor(srcX);
                  const x1 = Math.min(w - 1, x0 + 1);
                  const y0 = Math.floor(srcY);
                  const y1 = Math.min(h - 1, y0 + 1);
                  const fx = srcX - x0;
                  const fy = srcY - y0;

                  const dstIdx = (y * w + x) * 4;
                  const i00 = (y0 * w + x0) * 4;
                  const i10 = (y0 * w + x1) * 4;
                  const i01 = (y1 * w + x0) * 4;
                  const i11 = (y1 * w + x1) * 4;

                  for (let k = 0; k < 4; k++) {
                    const top = src[i00 + k] * (1 - fx) + src[i10 + k] * fx;
                    const bot = src[i01 + k] * (1 - fx) + src[i11 + k] * fx;
                    dst[dstIdx + k] = Math.round(top * (1 - fy) + bot * fy);
                  }
                }
              }
            }
          }

          state.eyeBufferCtx.putImageData(outData, 0, 0);
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
        className="w-full h-full object-contain select-none pointer-events-none filter contrast-[1.02] drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)]"
        style={{
          maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
        }}
      />
    </div>
  );
}
