import React, { useEffect, useRef } from 'react';

/**
 * InteractiveCharacter
 * 
 * Cinematic 2D Anime Character featuring:
 * - Authentic Guna likeness in a crisp dark charcoal formal shirt (100% uncropped shoulders)
 * - 100% transparent background floating seamlessly on the hero section
 * - Ultra-responsive real-time eye gaze tracking (direct 60fps viewport tracking, ±9px iris travel)
 * - Periodic natural blinking with peaceful curved eyelids (occasional double-blink)
 * - Dynamic living smile cycle: smiles warmly then naturally returns to normal, like blinking
 * - Canvas bottom feather gradient for seamless blending into the page background
 */
export default function InteractiveCharacter({ isHovered = false, isTouchDevice = false }) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Gaze & Expression physics states (ref-based for 60fps RAF loop without re-renders)
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

  // Load and cache all authentic portrait image assets
  useEffect(() => {
    let active = true;
    const baseImg = new Image();
    const blinkPatch = new Image();
    const smilePatch = new Image();

    // Use full uncropped transparent formal portrait
    baseImg.src = '/guna-formal-transparent.png';
    blinkPatch.src = '/guna-patch-blink.png';
    smilePatch.src = '/guna-patch-smile.png';

    let loadedCount = 0;
    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === 3 && active) {
        // Offscreen buffer for the eye socket region (240x70)
        const eyeBuffer = document.createElement('canvas');
        eyeBuffer.width = 240;
        eyeBuffer.height = 70;
        const eyeBufferCtx = eyeBuffer.getContext('2d');
        // Source eye region in 1376x768 base image: x=530, y=255, w=240, h=70
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

  // Direct window mousemove listener for instant, jitter-free eyeball tracking
  useEffect(() => {
    if (isTouchDevice) return;

    const handleWindowMouseMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();

      // Guna's face center in viewport coordinates
      const faceCenterX = rect.left + rect.width * 0.5;
      const faceCenterY = rect.top + rect.height * 0.32;

      const deltaX = e.clientX - faceCenterX;
      const deltaY = e.clientY - faceCenterY;

      // Normalization span (comfortable eye tracking across entire screen)
      const rangeX = Math.max(window.innerWidth * 0.38, 340);
      const rangeY = Math.max(window.innerHeight * 0.38, 280);

      const nx = Math.max(-1, Math.min(1, deltaX / rangeX));
      const ny = Math.max(-1, Math.min(1, deltaY / rangeY));

      // Obvious, distinct pupil travel: ±9.0px X, ±5.0px Y
      gazeStateRef.current.targetX = nx * 9.0;
      gazeStateRef.current.targetY = ny * 5.0;
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, [isTouchDevice]);

  // Periodic human blinking scheduler (every 3.5s - 5.5s with occasional double-blink)
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
      const delay = 3500 + Math.random() * 2000;
      timeoutId = setTimeout(() => {
        if (Math.random() < 0.25) {
          triggerBlink(130, () => {
            doubleBlinkId = setTimeout(() => {
              triggerBlink(110, scheduleNextBlink);
            }, 100);
          });
        } else {
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

  // Periodic and interactive smile cycle:
  // "smile should also have animation that it can be normal after smiling like blinking eyes"
  useEffect(() => {
    let smileTimeoutId;
    let smileHoldId;
    let isMounted = true;

    const triggerSmile = (holdDuration, onComplete) => {
      gazeStateRef.current.targetSmile = 0.85;
      smileHoldId = setTimeout(() => {
        // Naturally returns to normal expression
        gazeStateRef.current.targetSmile = 0.0;
        if (onComplete) onComplete();
      }, holdDuration);
    };

    const scheduleNextSmile = () => {
      if (!isMounted) return;
      const delay = 6000 + Math.random() * 3500; // Every 6s - 9.5s
      smileTimeoutId = setTimeout(() => {
        triggerSmile(1800, scheduleNextSmile);
      }, delay);
    };

    scheduleNextSmile();

    return () => {
      isMounted = false;
      clearTimeout(smileTimeoutId);
      clearTimeout(smileHoldId);
    };
  }, []);

  // Additional smile trigger on explicit hover, smoothly relaxing back to normal
  const prevHoveredRef = useRef(false);
  useEffect(() => {
    let interactionHoldId;
    if (isHovered && !prevHoveredRef.current) {
      gazeStateRef.current.targetSmile = 0.95;
      interactionHoldId = setTimeout(() => {
        gazeStateRef.current.targetSmile = 0.0;
      }, 2000);
    }
    prevHoveredRef.current = isHovered;

    return () => {
      if (interactionHoldId) clearTimeout(interactionHoldId);
    };
  }, [isHovered]);

  // Main 60 FPS Canvas Rendering Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Uncropped coordinate mapping (Both shoulders 100% complete)
    // Base image bounding box: X in [240, 1040] (w=800), Y in [30, 768] (h=738)
    // High-DPI canvas dimensions: 1600 x 1476 (exact 2.0x scale)
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
        // 1. Organic spring interpolation for gaze tracking (damping factor 0.12)
        if (!state.isBlinking) {
          state.currentX += (state.targetX - state.currentX) * 0.12;
          state.currentY += (state.targetY - state.currentY) * 0.12;
        }

        // 2. Smoothly transition smile expression in and out (factor 0.06)
        state.currentSmile += (state.targetSmile - state.currentSmile) * 0.06;

        // Clear canvas (100% transparent)
        ctx.clearRect(0, 0, CROP.dstW, CROP.dstH);

        // A. Draw Full Uncropped Character (Preserving complete shoulders, hair & torso)
        ctx.drawImage(
          state.baseImg,
          CROP.srcX, CROP.srcY, CROP.srcW, CROP.srcH,
          0, 0, CROP.dstW, CROP.dstH
        );

        // B. Organic Eye Gaze Tracking (Natural iris movement within anatomical sockets)
        const shiftX = Math.max(-9.2, Math.min(9.2, state.currentX));
        const shiftY = Math.max(-5.2, Math.min(5.2, state.currentY));

        if (!state.isBlinking && (Math.abs(shiftX) > 0.04 || Math.abs(shiftY) > 0.04)) {
          const w = 240, h = 70;
          const outData = state.eyeBufferCtx.createImageData(w, h);
          const src = state.baseEyeData.data;
          const dst = outData.data;
          for (let i = 0; i < src.length; i++) dst[i] = src[i];

          // Eye centers & radii in the 240x70 eyeBuffer
          const eyes = [
            { cx: 61, cy: 22, rx: 25, ry: 13 },
            { cx: 173, cy: 22, rx: 25, ry: 13 },
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
                const distSq = nx * nx + ny * ny;

                if (distSq < 1.0) {
                  const weight = Math.cos(Math.sqrt(distSq) * Math.PI * 0.5);
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

        // C. Smooth Smiling Mouth Cross-Fade (Ramps up, holds, and returns to normal)
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

        // D. Authentic Closed Eyelids Blink Overlay
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
