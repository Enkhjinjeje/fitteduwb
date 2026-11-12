'use client';

import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';
import { pieces } from '@/lib/pieces';

gsap.registerPlugin(Flip, CustomEase, useGSAP);

// Everything that moves in the hero: the ring turning, the two picked pieces flying out to the side
// panels, and the switch to a grid. The ring is adapted from a GSAP Flip carousel study.

export type View = 'carousel' | 'grid';
export type Side = 'left' | 'right';
export type Pair = Record<Side, number | null>;
export const SIDES: Side[] = ['left', 'right'];

const N = pieces.length;
const SLICE = 360 / N;          // degrees between neighbouring pieces
const PHASE = 180;              // piece 0 starts at the bottom of the ring
const DEG = Math.PI / 180;
const DRIFT = 4;                // resting spin, degrees per second
const KEY_WEIGHT = 8;           // how quickly an arrow-key turn settles
const MOMENTUM_DECAY = 1.3;
const FLY_DUR = 0.9;            // a picked piece flying to or from its panel
const FLIP_DUR = 1.4;           // ring ⇄ grid
const DIGIT_DAMP = 8;           // the odometer's roll
const SPOT_EVERY = 7;           // seconds between picks
const SPOT_HOLD = 5;            // seconds a pick stays out

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const mod = (i: number, n: number) => ((i % n) + n) % n;
const damp = (cur: number, target: number, lambda: number, dt: number) => cur + (target - cur) * (1 - Math.exp(-lambda * dt));
const sideRecord = <T,>(v: T): Record<Side, T> => ({ left: v, right: v });

export function useRing() {
  const refs = {
    root: useRef<HTMLElement>(null),
    stage: useRef<HTMLDivElement>(null),
    carousel: useRef<HTMLDivElement>(null),
    items: useRef<HTMLDivElement[]>([]),           // positioned wrappers on the ring
    cards: useRef<HTMLButtonElement[]>([]),         // the buttons that move between ring and grid
    imgs: useRef<HTMLImageElement[]>([]),
    slots: useRef<HTMLDivElement[]>([]),            // grid cells
    panels: useRef(sideRecord<HTMLElement | null>(null)),
    spots: useRef(sideRecord<HTMLDivElement | null>(null)),
    spotImgs: useRef(sideRecord<HTMLImageElement | null>(null)),
    notes: useRef(sideRecord<HTMLDivElement | null>(null)),
    digits: useRef<HTMLSpanElement[]>([]),
    names: useRef<HTMLSpanElement>(null),
  };
  const api = useRef<{ setView: (v: View) => void; showPair: (picked?: number) => void; setPaused: (paused: boolean) => void }>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPausedState] = useState(false);
  const [view, setViewState] = useState<View>('carousel');
  const [pair, setPair] = useState<Pair>(sideRecord(null));

  useGSAP(() => {
    const el = refs.root.current!;
    const stage = refs.stage.current!;
    const carousel = refs.carousel.current!;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = media.matches;
    let paused = reduced;
    setPausedState(paused);
    setReducedMotion(reduced);
    const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const imgEase = CustomEase.create('ringImg', 'M0,0 C0.16,1 0.3,1 1,1');

    /* ── Sizing ─────────────────────────────────────────────────────────── */

    let center = 300, radius = 250, depth = 300;
    const measure = () => {
      const w = stage.clientWidth, h = stage.clientHeight;
      const phone = w < 768;
      const side = Math.min(w, h);
      center = side / 2;
      let card = phone ? 40 : 72;

      if (phone) {
        // A column: header, ring, the two picked pieces with their notes, then the title.
        const header = 150, title = 130, gap = 14;
        const below = Math.min(w * 0.43 * 0.62, 120) * 1.08 + 172;   // picked piece + up to 7 lines of notes
        const room = h - header - title - below - gap * 2;
        for (let k = 0; k < 2; k++) {
          radius = Math.max(Math.min(w / 2 - 20, room / 2) - card / 2, 100);
          card = clamp(((2 * Math.PI * radius) / N) * 1.05, 32, 64);
        }
        const cy = header + card / 2 + radius;
        carousel.style.top = `${cy}px`;
        SIDES.forEach(s => { const p = refs.panels.current[s]; if (p) p.style.top = `${cy + radius + card / 2 + gap}px`; });
      } else {
        // The biggest circle between the two side panels, with neighbours side by side.
        const panel = Math.min(clamp(w * 0.18, 200, 300), h * 0.34);
        for (let k = 0; k < 2; k++) {
          const across = w / 2 - w * 0.035 - panel - 28;
          const down = Math.min(h * 0.45 - 96, h * 0.55 - 168);
          radius = Math.max(Math.min(across, down) - card / 2, 180);
          card = clamp(((2 * Math.PI * radius) / N) * 1.05, 56, 110);
        }
        carousel.style.top = '';
        SIDES.forEach(s => { const p = refs.panels.current[s]; if (p) p.style.top = ''; });
      }

      depth = radius * 1.2;
      el.style.setProperty('--rg-card-w', `${card}px`);
      carousel.style.width = carousel.style.height = `${side}px`;
    };

    /* ── The ring ───────────────────────────────────────────────────────── */

    let angle = 0, target = 0, momentum = DRIFT, dir = 1;
    let steering = false, flipping = false, view: View = 'carousel';
    let activeIdx = -1, hoverIdx = -1, dirty = true;
    const digitY = [0, 0];

    const layout = () => {
      for (let i = 0; i < N; i++) {
        const a = (i * SLICE + angle + PHASE) * DEG;
        const x = center + radius * Math.sin(a);
        const y = center - radius * Math.cos(a);
        const z = -depth * Math.cos(a);
        refs.items.current[i].style.transform = `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%)`;
        refs.items.current[i].style.zIndex = String(Math.round(500 - Math.cos(a) * 100));
      }
    };
    // The front piece (or the hovered one) is a little bigger, and its number and name show in the HUD.
    const shownIdx = () => (hoverIdx >= 0 ? hoverIdx : activeIdx);
    const highlight = () => {
      const active = shownIdx();
      refs.imgs.current.forEach((img, i) => gsap.to(img, { scale: i === active ? 1.08 : 1, duration: reduced ? 0 : 1, ease: imgEase, overwrite: true }));
    };
    const setMeta = (idx: number) => {
      const n = idx + 1;
      digitY[0] = -Math.floor(n / 10);
      digitY[1] = -(n % 10);
      if (refs.names.current) refs.names.current.style.transform = `translateY(${-idx * 1.2}em)`;
    };

    /* ── Spotlight: two pieces fly out to the side panels ───────────────── */
    // A copy flies, not the ring's own card, and it chases the card's live position every frame,
    // so it never jumps while the ring keeps turning. The notes appear once it has landed.

    const out = new Set<number>();
    let current: Pair = sideRecord(null);
    let spotTimer: gsap.core.Tween | null = null;
    const schedule = (sec: number, fn: () => void) => { spotTimer?.kill(); spotTimer = gsap.delayedCall(sec, fn); };

    const flight = sideRecord<{ tw: gsap.core.Tween; end: () => void } | null>(null);
    const land = (side: Side) => {
      const f = flight[side];
      flight[side] = null;
      if (f) { f.tw.kill(); f.end(); }
    };
    const fly = (side: Side, i: number, from: number, to: number, ease: string, end: () => void) => {
      land(side);
      const img = refs.spotImgs.current[side]!, slot = refs.spots.current[side]!, card = refs.cards.current[i];
      const p = { t: from };
      const draw = () => {
        const r = card.getBoundingClientRect(), s = slot.getBoundingClientRect();
        const k = (r.width + (s.width - r.width) * p.t) / s.width;
        img.style.transform = `translate(${(r.left - s.left) * (1 - p.t)}px, ${(r.top - s.top) * (1 - p.t)}px) scale(${k})`;
      };
      if (reduced || paused) { p.t = to; draw(); end(); return; }
      draw();
      const tw = gsap.to(p, {
        t: to, duration: reduced ? 0 : FLY_DUR, ease, onUpdate: draw,
        onComplete: () => { if (flight[side]?.tw === tw) land(side); },
      });
      flight[side] = { tw, end };
    };

    const noteIn = (side: Side) => {
      const n = refs.notes.current[side];
      if (!n) return;
      gsap.set(n, { opacity: 1 });
      gsap.fromTo(n.children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: reduced ? 0 : 0.8, stagger: 0.07, ease: 'expo.out' });
    };

    const returnPair = (instant = false) => {
      SIDES.forEach(side => {
        const i = current[side];
        if (i === null) return;
        const n = refs.notes.current[side];
        if (n) { gsap.killTweensOf(n.children); gsap.to(n, { opacity: 0, duration: instant || reduced ? 0 : 0.3, overwrite: true }); }
        const home = () => {
          refs.spotImgs.current[side]!.style.visibility = '';
          refs.cards.current[i].style.visibility = '';
          out.delete(i);
        };
        if (instant || reduced) { land(side); home(); } else fly(side, i, 1, 0, 'power3.inOut', home);
      });
      current = sideRecord(null);
    };

    // Horizontal position of each piece on the ring, -1 (far left) to 1 (far right).
    const across = (i: number) => Math.sin((i * SLICE + angle + PHASE) * DEG);
    const extremes = () => {
      let l = 0, r = 0;
      for (let i = 1; i < N; i++) {
        if (across(i) < across(l)) l = i;
        if (across(i) > across(r)) r = i;
      }
      return { l, r };
    };

    const showPair = (picked?: number) => {
      if (view !== 'carousel' || paused) return;
      returnPair(true);
      const { l, r } = extremes();
      current = { left: l, right: r };
      if (picked !== undefined) current[across(picked) < 0 ? 'left' : 'right'] = picked;
      flushSync(() => setPair(current));

      SIDES.forEach(side => {
        const i = current[side]!;
        const n = refs.notes.current[side];
        if (n) gsap.set(n, { opacity: 0 });
        const img = refs.spotImgs.current[side]!;
        img.src = pieces[i].src;
        img.alt = pieces[i].alt;
        img.style.visibility = 'visible';
        refs.cards.current[i].style.visibility = 'hidden';
        out.add(i);
        fly(side, i, 0, 1, 'power3.out', () => noteIn(side));
      });
      schedule(FLY_DUR + SPOT_HOLD, () => {
        returnPair();
        schedule(SPOT_EVERY - SPOT_HOLD + FLY_DUR, () => showPair());
      });
    };

    /* ── Ring ⇄ grid ────────────────────────────────────────────────────── */

    const setView = (next: View) => {
      if (next === view) return;
      spotTimer?.kill();
      returnPair(true);
      view = next;
      el.dataset.view = next;
      setViewState(next);

      const lead = shownIdx();
      if (next === 'carousel') {
        // Come back with the piece that led into the grid at the front.
        const want = -lead * SLICE;
        angle += ((((want - angle) % 360) + 540) % 360) - 180;
        target = angle;
        momentum = DRIFT * dir;
        layout();
      }

      const cards = refs.cards.current;
      const move = () => cards.forEach((c, i) => (next === 'grid' ? refs.slots.current[i] : refs.items.current[i]).appendChild(c));
      if (reduced) { move(); flipping = false; return; }

      Flip.killFlipsOf(cards);
      flipping = true;
      const state = Flip.getState(cards);
      move();
      const cols = innerWidth < 768 ? 5 : 9;
      Flip.from(state, {
        duration: FLIP_DUR, ease: 'back.inOut(2.2)', absolute: true, nested: true, scale: true, prune: true,
        // Ripple outward from the lead piece.
        stagger: i => (next === 'grid'
          ? Math.max(Math.abs((i % cols) - (lead % cols)), Math.abs(Math.floor(i / cols) - Math.floor(lead / cols))) * 0.015
          : Math.min(mod(i - lead, N), mod(lead - i, N)) * 0.02),
        onComplete: () => {
          flipping = false;
          if (next === 'carousel' && !reduced && !paused) schedule(2.5, () => showPair());
        },
      });
    };
    const setPaused = (value: boolean) => {
      paused = value || reduced;
      setPausedState(paused);
      spotTimer?.kill();
      if (paused) SIDES.forEach(land);
      else if (view === 'carousel') schedule(2.5, () => showPair());
    };
    const onMotionChange = () => {
      reduced = media.matches;
      setReducedMotion(reduced);
      if (reduced) {
        setPaused(true);
        Flip.killFlipsOf(refs.cards.current);
        flipping = false;
        gsap.killTweensOf(refs.imgs.current);
      }
    };
    media.addEventListener('change', onMotionChange);
    api.current = { setView, showPair, setPaused };

    /* ── Input ──────────────────────────────────────────────────────────── */

    if (canHover) {
      refs.cards.current.forEach((c, i) => {
        c.addEventListener('pointerenter', () => { if (out.has(i)) return; hoverIdx = i; highlight(); setMeta(i); });
        c.addEventListener('pointerleave', () => { if (hoverIdx !== i) return; hoverIdx = -1; highlight(); setMeta(activeIdx); });
      });
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        target = angle + (e.key === 'ArrowLeft' ? -SLICE : SLICE);
        steering = true;
        setTimeout(() => { steering = false; }, 260);
      } else if (e.key === 'g' || e.key === 'G') {
        setView(view === 'grid' ? 'carousel' : 'grid');
      }
    };

    /* ── Frame loop ─────────────────────────────────────────────────────── */

    const tick = (_t: number, dtMs: number) => {
      const dt = Math.min(dtMs, 64) / 1000 || 0.016;
      if (view === 'carousel' && !flipping) {
        if (steering) { angle = damp(angle, target, KEY_WEIGHT, dt); dirty = true; }
        else if (!reduced && !paused) { momentum = damp(momentum, DRIFT * dir, MOMENTUM_DECAY, dt); angle += momentum * dt; dirty = true; }
        const idx = mod(Math.round(-angle / SLICE), N);
        if (idx !== activeIdx) {
          activeIdx = idx;
          if (hoverIdx < 0) { highlight(); setMeta(idx); }
        }
      }
      refs.digits.current.forEach((s, d) => {
        const cur = Number(s.dataset.y ?? '0');
        const next = reduced ? digitY[d] : damp(cur, digitY[d], DIGIT_DAMP, 1 / 60);
        if (Math.abs(next - cur) > 2e-4) { s.dataset.y = String(next); s.style.transform = `translateY(${next}em)`; }
      });
      if (view === 'carousel' && dirty) { dirty = false; layout(); }
    };

    /* ── Start ──────────────────────────────────────────────────────────── */

    el.addEventListener('keydown', onKey);
    measure();
    activeIdx = mod(Math.round(-angle / SLICE), N);
    setMeta(activeIdx);
    highlight();
    layout();
    const ro = new ResizeObserver(() => { measure(); dirty = true; });
    ro.observe(stage);
    gsap.ticker.add(tick);

    if (!reduced) {
      gsap.set(refs.cards.current, { clipPath: 'inset(100%)' });
      gsap.timeline({ delay: 0.1 })
        .to(refs.cards.current, { clipPath: 'inset(0%)', duration: 1.5, stagger: 0.07, ease: 'expo.out', clearProps: 'clipPath' })
        .from('[data-hud]', { opacity: 0, y: 26, duration: 1.1, stagger: 0.12, ease: 'expo.out' }, '<0.1')
        .from('[data-logo]', { opacity: 0, scale: 0.85, duration: 1.4, ease: 'expo.out' }, 0.2);
      schedule(3.2, () => showPair());
    }

    return () => {
      spotTimer?.kill();
      SIDES.forEach(land);
      gsap.ticker.remove(tick);
      ro.disconnect();
      el.removeEventListener('keydown', onKey);
      media.removeEventListener('change', onMotionChange);
    };
  }, { scope: refs.root });

  return { refs, api, view, pair, paused, reducedMotion };
}
