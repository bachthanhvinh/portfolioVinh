'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  imageClassName?: string;
};

export default function ParallaxImage({
  src,
  alt,
  sizes = '100vw',
  className = '',
  imageClassName = '',
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [reduceMotion ? '0%' : '-12%', reduceMotion ? '0%' : '12%'],
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-[-12%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={`object-cover grayscale contrast-125 ${imageClassName}`}
        />
      </motion.div>
    </div>
  );
}