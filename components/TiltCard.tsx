'use client';

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef, type PointerEvent, type ReactNode } from 'react';

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  max?: number;
};

export default function TiltCard({ children, className, max = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const springX = useSpring(pointerX, { stiffness: 320, damping: 24 });
  const springY = useSpring(pointerY, { stiffness: 320, damping: 24 });
  const rotateY = useTransform(springX, [0, 1], [-max, max]);
  const rotateX = useTransform(springY, [0, 1], [max, -max]);
  const rotate = useTransform(springX, [0, 1], [-2, 2]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const depth = useTransform(
    scrollYProgress,
    [0, 1],
    [reduceMotion ? 0 : -200, reduceMotion ? 0 : 80],
  );

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  }

  function resetTilt() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, rotate, z: depth, transformPerspective: 1000, transformStyle: 'preserve-3d' }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}