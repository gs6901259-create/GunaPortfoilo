import React from 'react';
import { motion } from 'framer-motion';

/**
 * LiquidBackground
 * 
 * Calm, organic liquid gradients with ultra-slow morphing shapes
 * designed specifically for the #FAFAF8 white canvas:
 * - Fluid translucent blobs (cyan, lavender, silver)
 * - Ultra-subtle dot grid for tactile depth
 * - Zero CPU-heavy physics loops, pure GPU-accelerated transforms
 */
export default function LiquidBackground() {
  return (
    <div 
      aria-hidden="true" 
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Subtle tactile micro-dot grid */}
      <div className="absolute inset-0 bg-liquid-grid opacity-70" />

      {/* Primary Organic Liquid Blob - Top Right */}
      <motion.div
        animate={{
          x: [0, 40, -25, 0],
          y: [0, -35, 20, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -right-28 w-[600px] h-[600px] rounded-full blur-[140px] opacity-45"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.16) 0%, rgba(192, 132, 252, 0.10) 50%, transparent 70%)',
        }}
      />

      {/* Secondary Organic Liquid Blob - Middle Left */}
      <motion.div
        animate={{
          x: [0, -30, 35, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.96, 1.06, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute top-1/3 -left-36 w-[550px] h-[550px] rounded-full blur-[150px] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(2, 132, 199, 0.12) 0%, rgba(203, 213, 225, 0.18) 60%, transparent 70%)',
        }}
      />

      {/* Tertiary Organic Liquid Blob - Bottom Right */}
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -25, 30, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 8,
        }}
        className="absolute -bottom-24 right-1/4 w-[650px] h-[650px] rounded-full blur-[160px] opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.10) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 70%)',
        }}
      />
    </div>
  );
}
