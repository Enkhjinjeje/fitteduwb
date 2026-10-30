'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';

// The scroll controller and rolling counter from the Imagescroll study in jejepawns
// (~/Desktop/components/Imagescroll), trimmed to the finite, non-looping case this page needs.

/** Native-page scroll controller: a tall section with a sticky stage, read as a fractional item position. */
export function useLoopScroll({ count, scrollPerItem = 0.9 }: { count: number; scrollPerItem?: number }) {
  const steps = Math.max(0, count - 1);
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [width, setWidth] = useState(0);
  const activeIndex = Math.min(steps, Math.max(0, Math.round(position)));

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!rootRef.current || !stageRef.current) return;
      const travel = rootRef.current.offsetHeight - stageRef.current.offsetHeight;
      const step = steps ? travel / steps : 0;
      const top = rootRef.current.getBoundingClientRect().top;
      setPosition(step > 0 ? Math.min(steps, Math.max(0, -top / step)) : 0);
      setWidth(stageRef.current.clientWidth);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    if (rootRef.current) observer.observe(rootRef.current);
    if (stageRef.current) observer.observe(stageRef.current);
    addEventListener('scroll', schedule, { passive: true });
    update();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); removeEventListener('scroll', schedule); };
  }, [steps]);

  const goTo = (index: number) => {
    if (!rootRef.current || !stageRef.current || !steps) return;
    const target = Math.min(steps, Math.max(0, Math.round(index)));
    const start = scrollY + rootRef.current.getBoundingClientRect().top;
    const travel = rootRef.current.offsetHeight - stageRef.current.offsetHeight;
    scrollTo({ top: start + (target / steps) * travel, behavior: reducedMotion ? 'instant' : 'smooth' });
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1, Home: -Infinity, End: Infinity };
    if (!(event.key in keys)) return;
    event.preventDefault();
    goTo(activeIndex + keys[event.key]);
  };
  const progress = reducedMotion ? activeIndex : position;

  return {
    rootRef, stageRef, activeIndex, progress, reducedMotion, width, goTo, onKeyDown,
    sectionHeight: `${100 + steps * scrollPerItem * 100}svh`,
    offsetFor: (index: number) => index - progress,
    next: () => goTo(activeIndex + 1),
    previous: () => goTo(activeIndex - 1),
    canPrevious: activeIndex > 0,
    canNext: activeIndex < steps,
  };
}

/** Rolling counter; inherits font, colour and size. */
export function ScrollNumber({ count, progress, className, style }: { count: number; progress: number; className?: string; style?: CSSProperties }) {
  if (!count) return null;
  const position = Math.min(count - 1, Math.max(0, progress));
  return (
    <div aria-hidden="true" className={className} style={{ ...style, height: '1em', overflow: 'hidden', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
      <div style={{ transform: `translateY(${-position}em)` }}>
        {Array.from({ length: count }, (_, i) => <div key={i} style={{ height: '1em' }}>{String(i + 1).padStart(2, '0')}</div>)}
      </div>
    </div>
  );
}
