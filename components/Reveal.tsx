'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  intensity?: 'mild' | 'strong';
};

const intensityConfig = {
  mild: { rotateX: 5, rotateY: 3, translateZ: 60, y: 24, perspective: 900 },
  strong: { rotateX: 12, rotateY: 8, translateZ: 140, y: 48, perspective: 1100 },
} as const;

export default function Reveal({ children, className, intensity = 'strong' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.45'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 28,
    restDelta: 0.001,
  });

  const config = intensityConfig[intensity];
  const rotateX = useTransform(progress, [0, 1], [reduceMotion ? 0 : config.rotateX, 0]);
  const rotateY = useTransform(progress, [0, 1], [reduceMotion ? 0 : config.rotateY, 0]);
  const translateZ = useTransform(progress, [0, 1], [reduceMotion ? 0 : -config.translateZ, 0]);
  const y = useTransform(progress, [0, 1], [reduceMotion ? 0 : config.y, 0]);
  const opacity = useTransform(progress, [0, 1], [reduceMotion ? 1 : 0.1, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        translateZ,
        y,
        opacity,
        transformPerspective: config.perspective,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}