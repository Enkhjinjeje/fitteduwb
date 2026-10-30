'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { ClubEvent } from '@/lib/data';
import { EventSheet } from './event-sheet';
import { ScrollNumber, useLoopScroll } from './loop-scroll';

// Every event in one sticky stage: posters travel along a diagonal as the page scrolls (after the
// Imagescroll study in jejepawns), the stage takes each poster's colours, and the poster in the
// middle opens a detail sheet (event-sheet.tsx) that grows out of it.
type ViewTransitionDoc = Document & { startViewTransition?: (cb: () => void) => unknown };

export function EventReel({ events }: { events: ClubEvent[] }) {
  const count = events.length;
  const {
    rootRef, stageRef, activeIndex: active, progress, reducedMotion: reduced, width,
    sectionHeight, offsetFor, goTo, previous, next, canPrevious, canNext, onKeyDown,
  } = useLoopScroll({ count, scrollPerItem: 0.75 });
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [shown, setShown] = useState(0);

  const mobile = width > 0 && width < 768;
  const posterW = mobile ? Math.min(width * 0.52, 260) : Math.min(Math.max(width * 0.2, 220), 330);
  // Desktop runs the diagonal down and to the left; a phone slides neighbours in from the sides so
  // they never cover the title under the poster.
  const stepX = mobile ? -width * 0.78 : -posterW * 0.55;
  const stepY = mobile ? posterW * 0.12 : posterW * 1.25 + 64;
  const current = events[active];

  // ── Detail sheet ──
  // The page behind the sheet must not scroll, or the reel would move under it.
  useEffect(() => {
    if (open === null) return;
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);

  const transition = (change: () => void) => {
    const doc = document as ViewTransitionDoc;
    if (reduced || !doc.startViewTransition) change();
    else doc.startViewTransition(change);
  };
  const show = (i: number) => transition(() => {
    flushSync(() => { setShown(i); setOpen(i); });
    dialog.current?.showModal();
  });
  const hide = () => transition(() => {
    dialog.current?.close();
    flushSync(() => setOpen(null));
  });

  if (!count) return null;
  const sheetEvent = events[shown];

  return (
    <section ref={rootRef} id="events" aria-labelledby="events-h" className="relative" style={{ height: sectionHeight }}>
      <div
        ref={stageRef}
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' && e.target === e.currentTarget) show(active); else onKeyDown(e); }}
        aria-label="Events. Scroll or use the arrow keys to move through them; press Enter for details."
        className="sticky top-0 h-svh min-h-[600px] overflow-hidden outline-none transition-[background-color,color] duration-700 ease-expo"
        style={{ backgroundColor: current.ground, color: current.ink }}
      >
        {/* Heading */}
        <header className="absolute inset-x-0 top-0 z-20 flex items-baseline justify-between gap-6 py-7 pr-[3.5vw] pl-[calc(3.5vw+80px)] max-md:py-5 max-md:pr-5 max-md:pl-20">
          <h2 id="events-h" className="text-[clamp(28px,3vw,44px)] leading-none font-normal tracking-[-0.03em]">Events</h2>
          <p className="text-small opacity-70 max-md:hidden">2025–2026 · scroll through the year</p>
        </header>

        {/* When, where, what: the facts of the event in the middle. */}
        <dl aria-live="polite" className="absolute top-[38%] left-[3.5vw] z-10 grid w-[22vw] max-w-[300px] gap-5 text-small leading-snug max-md:hidden">
          <div><dt className="mb-1 opacity-60">When</dt><dd>{current.date}{current.time && <><br />{current.time}</>}</dd></div>
          <div><dt className="mb-1 opacity-60">Where</dt><dd>{current.place}</dd></div>
          <div><dt className="mb-1 opacity-60">What</dt><dd>{current.format}</dd></div>
        </dl>

        {/* Posters on the diagonal. The middle one opens; a neighbour scrolls to itself. */}
        <div className="absolute inset-0">
          {events.map((e, i) => {
            const o = offsetFor(i);
            const far = Math.abs(o) > 2.4 || (reduced && i !== active);
            const isActive = i === active;
            return (
              <button
                key={e.id}
                type="button"
                data-cursor={isActive || undefined}
                tabIndex={isActive ? 0 : -1}
                aria-hidden={!isActive}
                aria-label={`${e.name}, ${e.date}. Open details.`}
                onClick={() => (isActive ? show(i) : goTo(i))}
                className="group absolute top-1/2 left-1/2 cursor-pointer will-change-transform focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current max-md:top-[36%]"
                style={{
                  width: posterW,
                  transform: `translate(-50%, -50%) translate(${o * stepX}px, ${o * stepY}px) rotate(${reduced ? 0 : o * 6}deg) scale(${1 - Math.min(Math.abs(o), 1) * 0.08})`,
                  visibility: far ? 'hidden' : 'visible',
                  pointerEvents: Math.abs(o) < 1.5 ? 'auto' : 'none',
                }}
              >
                <img
                  src={e.poster}
                  alt=""
                  width={800}
                  height={1000}
                  draggable={false}
                  loading={Math.abs(o) < 3 ? 'eager' : 'lazy'}
                  className="block aspect-[4/5] w-full object-cover shadow-[0_24px_60px_-20px_rgb(0_0_0/.45)] transition-[scale] duration-500 ease-expo group-hover:scale-[1.03]"
                  style={{ viewTransitionName: open === null && isActive ? 'event-poster' : undefined }}
                />
              </button>
            );
          })}
        </div>

        {/* Titles roll past in a column, each in its poster's own face. */}
        <div aria-hidden="true" className="pointer-events-none absolute top-[10%] left-[69%] h-[80%] w-[26%] overflow-hidden max-md:top-[64%] max-md:left-5 max-md:h-[22%] max-md:w-[calc(100%-40px)]">
          {events.map((e, i) => {
            const o = offsetFor(i);
            return (
              <article
                key={e.id}
                className="absolute top-1/2 left-0 w-full will-change-transform max-md:text-center"
                style={{
                  transform: `translateY(calc(-50% + ${o * (mobile ? 120 : 190)}px))`,
                  opacity: reduced ? Number(i === active) : Math.max(0, 1 - Math.abs(o) * 0.75),
                  visibility: Math.abs(o) > 2.2 || (mobile && Math.abs(o) > 0.6) ? 'hidden' : 'visible',
                }}
              >
                <p className="mb-2 text-small opacity-70">{e.format}</p>
                <h3 className={`text-[clamp(34px,3.6vw,60px)] leading-[.95] font-normal max-md:text-[34px] ${e.face}`}>{e.name}</h3>
                <p className="mt-3 text-small md:hidden">{e.date}{e.time && ` · ${e.time}`} · {e.place}</p>
              </article>
            );
          })}
        </div>

        {/* Rolling counter */}
        <div className="absolute bottom-[7%] left-[13%] flex items-start gap-3 max-md:bottom-5 max-md:left-5" aria-hidden="true">
          <span className="pt-3 text-small opacity-70 max-md:hidden">Event</span>
          <ScrollNumber count={count} progress={progress} className="text-[clamp(64px,10vw,150px)] font-light tracking-[-0.05em] max-md:text-[56px]" />
          <span className="pt-3 text-small">/{String(count).padStart(2, '0')}</span>
        </div>
        <p className="sr-only" aria-live="polite">Event {active + 1} of {count}: {current.name}</p>

        {/* Previous / next */}
        <div className="absolute right-[3.5vw] bottom-7 z-30 flex items-center gap-6 text-small max-md:right-5 max-md:bottom-5 max-md:gap-4">
          <span className="opacity-70 max-md:hidden">Click the poster for details</span>
          <button type="button" disabled={!canPrevious} onClick={previous} className="min-h-11 cursor-pointer disabled:opacity-30">← <span className="max-md:sr-only">Previous</span></button>
          <button type="button" disabled={!canNext} onClick={next} className="min-h-11 cursor-pointer disabled:opacity-30"><span className="max-md:sr-only">Next</span> →</button>
        </div>
      </div>

      <EventSheet
        event={sheetEvent}
        open={open !== null}
        dialogRef={dialog}
        onDismiss={hide}
        onClosed={() => setOpen(null)}
      />
    </section>
  );
}
