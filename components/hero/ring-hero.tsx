'use client';

import { useEffect, useRef, useState } from 'react';
import { pieces, type Piece } from '@/lib/pieces';
import { SIDES, useRing, type View } from './use-ring';

// The first screen: a ring of clothing around the logo. Every few seconds the pieces at the far left
// and far right fly up to the side panels with a note on how to wear them. All motion is in use-ring.ts.
export function RingHero() {
  const { refs, api, view, pair, paused, reducedMotion } = useRing();
  const [selected, setSelected] = useState<Piece | null>(null);
  const detail = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (selected) detail.current?.focus({ preventScroll: false });
  }, [selected]);

  return (
    <>
    <header
      ref={refs.root}
      id="top"
      tabIndex={0}
      data-view={view}
      aria-label="A spinning ring of clothing pieces. Arrow keys turn it, G switches to a grid."
      className="group/rg relative h-svh min-h-[680px] overflow-hidden bg-chalk focus-visible:outline-offset-[-4px] select-none max-md:min-h-[780px]"
    >
      <p className="absolute left-5 right-5 top-20 z-[710] max-w-[34ch] text-[16px] leading-snug md:hidden">UW Bothell’s student fashion club. Swaps, DIY nights and outfit hikes.</p>
      <div ref={refs.stage} className="absolute inset-0">
        {/* The ring: the logo in the middle, one positioned wrapper per piece. */}
        <div ref={refs.carousel} className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 [perspective:4000px]">
          <img
            data-logo
            src="/brand/logo-purple.png"
            alt="Fitted, UW Bothell"
            width={796}
            height={288}
            className="pointer-events-none absolute top-1/2 left-1/2 z-[500] w-[min(25vw,360px)] -translate-x-1/2 -translate-y-1/2 group-data-[view=grid]/rg:invisible max-md:w-[40vw]"
          />
          {pieces.map((p, i) => (
            <div key={p.id} ref={n => { if (n) refs.items.current[i] = n; }} className="absolute top-0 left-0 will-change-transform">
              <button
                ref={n => { if (n) refs.cards.current[i] = n; }}
                type="button"
                aria-label={`${p.name}, ${p.style}. Show how to wear it.`}
                onClick={e => {
                  trigger.current = e.currentTarget;
                  api.current?.setPaused(true);
                  setSelected(p);
                }}
                className="block h-[calc(var(--rg-card-w)*1.08)] w-(--rg-card-w)"
              >
                <img ref={n => { if (n) refs.imgs.current[i] = n; }} src={p.src} alt={p.alt} draggable={false} className="pointer-events-none size-full object-contain" />
              </button>
            </div>
          ))}
        </div>

        {/* Grid view: empty cells the cards move into. */}
        <div className="pointer-events-none absolute inset-0 mx-auto grid max-w-[calc((100svh-15.5rem)*2.6+7rem)] grid-cols-9 content-center gap-[clamp(.4rem,1vw,1rem)] p-[clamp(1rem,4vw,3.5rem)] pt-24 pb-[clamp(9rem,13vw,12rem)] opacity-0 group-data-[view=grid]/rg:pointer-events-auto group-data-[view=grid]/rg:opacity-100 max-md:max-w-none max-md:grid-cols-5 max-md:pb-40">
          {pieces.map((p, i) => (
            <div key={p.id} ref={n => { if (n) refs.slots.current[i] = n; }} className="relative aspect-[1/1.08] [&>*]:!size-full" />
          ))}
        </div>
      </div>

      {SIDES.map(side => (
        <aside
          key={side}
          ref={n => { refs.panels.current[side] = n; }}
          aria-label={side === 'left' ? 'First picked piece' : 'Second picked piece'}
          className={`pointer-events-none absolute top-[max(104px,12svh)] z-[600] w-[min(clamp(200px,18vw,300px),34svh)] group-data-[view=grid]/rg:hidden max-md:w-[43vw] ${side === 'left' ? 'left-[3.5vw] max-md:left-5' : 'right-[3.5vw] max-md:right-5'}`}
        >
          <div ref={n => { refs.spots.current[side] = n; }} className="relative aspect-[1/1.08] w-full max-md:w-[62%]">
            <img ref={n => { refs.spotImgs.current[side] = n; }} src={pieces[0].src} alt="" draggable={false} className="invisible absolute inset-0 size-full origin-top-left object-contain will-change-transform" />
          </div>
          <PieceNote
            piece={pair[side] === null ? null : pieces[pair[side]!]}
            noteRef={n => { refs.notes.current[side] = n; }}
          />
        </aside>
      ))}

      {/* Bottom bar: the name, the front piece's number and name, and the ring/grid switch. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[700] flex items-end justify-between gap-4 px-[3.5vw] pb-7 max-md:flex-wrap max-md:px-5 max-md:pb-5">
        <div data-hud>
          <h1 className="text-[clamp(44px,4.2vw,68px)] leading-none font-normal tracking-[-0.04em]">Fitted UWB</h1>
          <p className="mt-3 max-w-[34ch] text-[max(18px,1.25vw)] leading-snug max-md:hidden">UW Bothell&apos;s student fashion club. Swaps, bleached tees, DIY nights and outfit hikes.</p>
        </div>

        <div data-hud aria-hidden="true" className="flex items-baseline gap-3 max-md:hidden">
          <span className="inline-flex text-[24px] leading-none tracking-[-0.02em] tabular-nums">
            {[0, 1].map(d => (
              <span key={d} className="block h-[1em] overflow-hidden">
                <span ref={n => { if (n) refs.digits.current[d] = n; }} className="block will-change-transform">
                  {[...Array(10).keys()].map(n => <span key={n} className="block h-[1em] text-center">{n}</span>)}
                </span>
              </span>
            ))}
          </span>
          <span className="h-[1.2em] overflow-hidden text-small text-stone">
            <span ref={refs.names} className="block will-change-transform">
              {pieces.map(p => <span key={p.id} className="block h-[1.2em] leading-[1.2] whitespace-nowrap">{p.name}</span>)}
            </span>
          </span>
        </div>

        <div className="pointer-events-auto flex flex-col items-end gap-3">
          <button type="button" aria-pressed={paused} disabled={reducedMotion} onClick={() => api.current?.setPaused(!paused)} className="min-h-11 rounded-full bg-chalk px-3 text-small underline underline-offset-4">
            {reducedMotion ? 'Motion reduced' : paused ? 'Resume motion' : 'Pause motion'}
          </button>
          <ViewSwitch view={view} onChange={v => api.current?.setView(v)} />
        </div>
      </div>
    </header>
    {selected && (
      <section ref={detail} tabIndex={-1} aria-labelledby="piece-title" className="scroll-mt-24 bg-chalk px-5 py-12 focus-visible:outline-offset-[-4px] md:px-[3.5vw]">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-[180px_1fr]">
          <img src={selected.src} alt={selected.alt} width={180} height={200} className="h-48 w-44 object-contain" />
          <div>
            <h2 id="piece-title" className="text-3xl">{selected.name}</h2>
            <p className="mt-2 text-stone">{selected.style}</p>
            <p className="mt-4 max-w-[60ch]">{selected.summary}</p>
            <p className="mt-3 max-w-[60ch]"><strong>How to wear it: </strong>{selected.wear}</p>
            <p className="mt-5 text-small text-stone">Image adapted from a Pinterest flat-lay. Original photographer and source link have not been verified.</p>
            <button type="button" className="mt-5 min-h-11 underline underline-offset-4" onClick={() => { setSelected(null); trigger.current?.focus(); }}>Back to clothing</button>
          </div>
        </div>
      </section>
    )}
    </>
  );
}

// What a picked piece is and how to wear it. Filled in when the piece lands (see use-ring.ts).
function PieceNote({ piece, noteRef }: { piece: Piece | null; noteRef: (n: HTMLDivElement | null) => void }) {
  return (
    <div ref={noteRef} className="mt-5 grid gap-2 max-md:mt-3 max-md:gap-1">
      {piece && <>
        <p className="text-lead leading-tight font-medium max-md:text-[17px]">{piece.name}</p>
        <p className="text-small text-stone">{piece.style}</p>
        <p className="max-md:hidden [@media(max-height:780px)]:hidden">{piece.summary}</p>
        <p className="max-md:line-clamp-4 max-md:text-[14px] max-md:leading-snug">
          <span className="text-stone">How to wear it: </span>{piece.wear}
        </p>
      </>}
    </div>
  );
}

const ICONS: Record<View, React.ReactNode> = {
  carousel: <><rect x="5.333" width="5.333" height="5.333" /><rect x="5.333" y="10.667" width="5.333" height="5.333" /><rect x="10.667" y="5.333" width="5.333" height="5.333" /><rect y="5.333" width="5.333" height="5.333" /></>,
  grid: <><rect x="0.25" y="0.75" width="5.333" height="5.333" /><rect x="10.583" y="0.75" width="5.333" height="5.333" /><rect x="0.25" y="10" width="5.333" height="5.333" /><rect x="10.583" y="10" width="5.333" height="5.333" /></>,
};

function ViewSwitch({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  return (
    <div data-hud role="group" aria-label="View" className="pointer-events-auto inline-flex gap-1 rounded-full bg-ink/8 p-1">
      {(['carousel', 'grid'] as View[]).map(v => (
        <button
          key={v}
          type="button"
          aria-label={v === 'carousel' ? 'Ring view' : 'Grid view'}
          aria-pressed={view === v}
          onClick={() => onChange(v)}
          className="grid size-10 place-items-center rounded-full text-ink/60 transition-[background-color,color,scale] duration-200 hover:text-ink active:scale-95 aria-pressed:bg-chalk aria-pressed:text-ink"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 fill-current">{ICONS[v]}</svg>
        </button>
      ))}
    </div>
  );
}

