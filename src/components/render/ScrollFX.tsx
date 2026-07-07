import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import type { AnimationConfig } from '../../types';
import { useScrollContainer } from './ScrollContainerContext';

const EASE_MAP: Record<AnimationConfig['easing'], [number, number, number, number]> = {
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  circOut: [0, 0.55, 0.45, 1],
  backOut: [0.34, 1.56, 0.64, 1],
};

const DIR_OFFSET: Record<AnimationConfig['direction'], { x?: number; y?: number }> = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: 60 },
  right: { x: -60 },
};

interface Props {
  anim: AnimationConfig;
  className?: string;
  children: React.ReactNode;
  /**
   * True when this should stretch to fill an ancestor section that only has
   * a min-height (hero/background-image use). CSS resolves percentage
   * heights (h-full) against an auto-height ancestor as `auto`, so filling
   * must go through `position:absolute; inset:0` instead, which is sized
   * from the ancestor's final used height rather than its declared height.
   * Leave false for inline content (cards, inline images) that should size
   * to its own content.
   */
  fill?: boolean;
}

function getVariants(anim: AnimationConfig) {
  const dirOffset = DIR_OFFSET[anim.direction];
  switch (anim.type) {
    case 'fade':
      return { initial: { opacity: 0 }, animate: { opacity: 1 } };
    case 'slide':
      return { initial: { opacity: 0, ...dirOffset }, animate: { opacity: 1, x: 0, y: 0 } };
    case 'scale':
      return { initial: { opacity: 0, scale: 0.82 }, animate: { opacity: 1, scale: 1 } };
    case 'reveal':
      return {
        initial: { opacity: 0, y: 28, clipPath: 'inset(0 0 100% 0)' },
        animate: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' },
      };
    default:
      return { initial: {}, animate: {} };
  }
}

export function ScrollFX({ anim, className, children, fill }: Props) {
  const fillClass = fill ? 'absolute inset-0' : '';

  if (!anim.enabled || anim.type === 'none') {
    return <div className={`${fillClass} ${className ?? ''}`}>{children}</div>;
  }
  if (anim.type === 'parallax') {
    return (
      <ParallaxFX anim={anim} className={className} fill={fill}>
        {children}
      </ParallaxFX>
    );
  }
  if (anim.type === 'pinned') {
    return (
      <PinnedFX anim={anim} className={className}>
        {children}
      </PinnedFX>
    );
  }
  if (anim.type === 'horizontal') {
    return (
      <HorizontalFX anim={anim} className={className}>
        {children}
      </HorizontalFX>
    );
  }

  const { initial, animate } = getVariants(anim);
  return (
    <motion.div
      className={`${fillClass} ${className ?? ''}`}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: anim.scrub > 0.5 ? 0.1 : 0.3 }}
      transition={{ duration: anim.duration, delay: anim.delay, ease: EASE_MAP[anim.easing] }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxFX({ anim, className, children, fill }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({ target: ref, container, offset: ['start end', 'end start'] });
  const range = 20 + anim.speed * 2.5;
  const rawY = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const y = useSpring(rawY, { stiffness: 40 + (1 - anim.scrub) * 160, damping: 30 });

  if (fill) {
    // `absolute inset-0` sizes against the section's final used height even
    // when that height only comes from min-height (see the Props.fill note).
    // `h-full` would not, since it resolves against auto-height ancestors as 0.
    return (
      <div ref={ref} className={`absolute inset-0 overflow-hidden ${className ?? ''}`}>
        <motion.div style={{ y, scale: 1.15 }} className="absolute inset-0">
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
      <motion.div style={{ y, scale: 1.08 }}>{children}</motion.div>
    </div>
  );
}

function PinnedFX({ anim, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({ target: ref, container, offset: ['start start', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + anim.speed / 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.25]);
  return (
    <div ref={ref} className="relative" style={{ height: `${170 + anim.speed}vh` }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div style={{ scale, opacity }} className={`h-full w-full ${className ?? ''}`}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

function HorizontalFX({ anim, className, children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollContainer = useScrollContainer();
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    function measure() {
      if (trackRef.current) {
        const viewportWidth = trackRef.current.parentElement?.clientWidth ?? window.innerWidth;
        setDistance(Math.max(trackRef.current.scrollWidth - viewportWidth, 0));
      }
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer,
    offset: ['start start', 'end end'],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 40 + (1 - anim.scrub) * 160, damping: 30 });
  const scrollHeightVh = Math.min(Math.max(distance / 4, 140), 400);

  return (
    <div ref={containerRef} className="relative" style={{ height: `${scrollHeightVh}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className={`flex gap-6 px-6 md:px-16 ${className ?? ''}`}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
