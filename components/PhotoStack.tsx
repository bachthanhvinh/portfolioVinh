'use client';

import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useRef, type PointerEvent } from 'react';

type Print = {
  src: string;
  caption: string;
  className: string;
  depth: number;
  drift: number;
};

const prints: Print[] = [
  {
    src: '/images/circuit.jpg',
    caption: 'fig. 01',
    className: 'left-0 top-0 w-36 -rotate-3',
    depth: -180,
    drift: 96,
  },
  {
    src: '/images/code-screen.jpg',
    caption: 'fig. 02',
    className: 'right-0 top-12 w-40 rotate-2',
    depth: -90,
    drift: 54,
  },
  {
    src: '/images/code-green.jpg',
    caption: 'fig. 03',
    className: 'bottom-0 left-10 w-32 rotate-3',
    depth: 0,
    drift: 12,
  },
];

export default function PhotoStack() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const springX = useSpring(pointerX, { stiffness: 160, damping: 22 });
  const springY = useSpring(pointerY, { stiffness: 160, damping: 22 });
  const rotateY = useTransform(springX, [0, 1], [reduceMotion ? 0 : -16, reduceMotion ? 0 : 16]);
  const rotateX = useTransform(springY, [0, 1], [reduceMotion ? 0 : 14, reduceMotion ? 0 : -14]);

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
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-sm [perspective:1400px]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 h-64 w-64 rotate-12 border border-subtle bg-card/50" />
        <div className="absolute -bottom-20 -right-20 h-56 w-56 -rotate-6 border border-subtle bg-card/50" />
        <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rotate-3 border border-subtle bg-card/50" />
      </div>

      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full"
      >
        {prints.map((print) => (
          <Print
            key={print.src}
            print={print}
            progress={scrollYProgress}
            reduceMotion={Boolean(reduceMotion)}
          />
        ))}
      </motion.div>
    </div>
  );
}

function Print({
  print,
  progress,
  reduceMotion,
}: {
  print: Print;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const y = useTransform(
    progress,
    [0, 1],
    [reduceMotion ? 0 : print.drift, reduceMotion ? 0 : -print.drift],
  );
  const z = useTransform(progress, [0, 1], [print.depth - 40, print.depth + 90]);

  return (
    <motion.figure
      style={{ y, z }}
      className={`absolute border border-subtle bg-card p-1.5 ${print.className}`}
    >
      <div className="relative aspect-square overflow-hidden border border-subtle">
        <Image
          src={print.src}
          alt=""
          aria-hidden
          fill
          sizes="160px"
          className="object-cover grayscale contrast-125"
        />
      </div>
      <figcaption className="mt-1 text-center font-mono text-[8px] uppercase tracking-[0.15em] text-muted">
        {print.caption}
      </figcaption>
    </motion.figure>
  );
}