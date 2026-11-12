'use client';

import { useEffect, useRef } from 'react';

// Page-wide effects:
//  - [data-reveal] elements rise in once as they scroll into view (styles in globals.css).
//  - A tomato dot follows the mouse and opens into a "View" disc over anything marked [data-cursor].
export function Effects() {
  const dot = useRef<HTMLDivElement>(null);

  // Entrances
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { items.forEach(el => el.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px 12% 0px' });
    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Cursor (mouse only, and not with reduced motion)
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = dot.current!;
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      el.dataset.view = String(!!(e.target as Element).closest?.('[data-cursor]'));
      el.dataset.on = 'true';
    };
    const leave = () => { el.dataset.on = 'false'; };
    const tick = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    raf = requestAnimationFrame(tick);
    return () => { removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', leave); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={dot} data-motion-cursor aria-hidden="true" data-on="false" data-view="false" className="group/c pointer-events-none fixed top-0 left-0 z-[80]">
      <span className="absolute -top-[7px] -left-[7px] grid size-[14px] place-items-center rounded-full bg-tomato text-[0px] text-ink opacity-0 transition-all duration-400 ease-expo group-data-[on=true]/c:opacity-100 group-data-[view=true]/c:-top-12 group-data-[view=true]/c:-left-12 group-data-[view=true]/c:size-24 group-data-[view=true]/c:text-[15px]">
        View
      </span>
    </div>
  );
}
