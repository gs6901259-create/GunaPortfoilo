import React, { useEffect, useState, useRef } from 'react';

/**
 * LiquidCursor
 * 
 * Ethereal fluid membrane cursor follower:
 * - Physics-based velocity tracking & directional elongation
 * - Smooth spring interpolation (lerp)
 * - Elastic recovery when resting
 * - Subdued, high-end soft electric cyan and translucent lavender sheen
 * - Disabled on touch devices and respects prefers-reduced-motion
 */
export default function LiquidCursor() {
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    // 1. Accessibility & device checks
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (prefersReducedMotion || !isFinePointer) return;

    setMounted(true);

    let rafId;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let prevX = -100;
    let prevY = -100;
    let angle = 0;
    let velocity = 0;
    let scaleX = 1;
    let scaleY = 1;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      targetX = -200;
      targetY = -200;
    };

    const updatePhysics = () => {
      // Lerp position
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;

      // Compute speed / velocity
      const dx = currentX - prevX;
      const dy = currentY - prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Smooth velocity interpolation
      velocity += (speed - velocity) * 0.2;

      // Directional angle
      if (speed > 0.5) {
        angle = Math.atan2(dy, dx) * (180 / Math.PI);
      }

      // Elastic deformation: stretch along movement axis, squeeze perpendicular
      const stretch = Math.min(velocity * 0.028, 0.45);
      const targetScaleX = 1 + stretch;
      const targetScaleY = Math.max(0.65, 1 - stretch * 0.6);

      scaleX += (targetScaleX - scaleX) * 0.2;
      scaleY += (targetScaleY - scaleY) * 0.2;

      prevX = currentX;
      prevY = currentY;

      // Update membrane element
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
      }

      // Update ambient soft spotlight
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Ambient Large Fluid Glow Spotlight on white canvas */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 w-[550px] h-[550px] -z-10 rounded-full blur-[100px] transition-opacity duration-300 opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.07) 0%, rgba(192, 132, 252, 0.03) 45%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* Fluid Spring-Deforming Micro-Membrane */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-40 w-8 h-8 rounded-full border border-sky-400/40 shadow-[0_0_16px_rgba(2,132,199,0.18)]"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.6) 0%, rgba(6, 182, 212, 0.2) 60%, rgba(192, 132, 252, 0.1) 100%)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          willChange: 'transform',
        }}
      />
    </>
  );
}
