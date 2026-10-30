import type { CSSProperties, ReactNode } from 'react';
import { INSTAGRAM, LINKTREE } from '@/lib/data';

const i = (n: number) => ({ '--i': n }) as CSSProperties;
// Read off the posters: most meetings start at 5:45 in one of two DISC rooms.
const facts: [string, ReactNode][] = [
  ['Where', <>University of Washington Bothell<br />18115 Campus Way NE<br />Bothell, WA 98011</>],
  ['Usually', <>5:45 PM in DISC 162 or DISC 252,<br />plus trips off campus</>],
];

// A dark close to the page: the way in (Instagram, Linktree), the facts, and the name set huge.
export function Footer() {
  return (
    <footer className="overflow-hidden bg-ink text-chalk">
      <div className="px-[3.5vw] pt-[max(96px,9vw)] max-md:px-5">
        <h2 data-reveal className="max-w-[12ch] text-[clamp(44px,6.4vw,112px)] leading-[.92] font-light tracking-[-0.045em]">
          See you at the next one.
        </h2>
        <p data-reveal style={i(1)} className="mt-6 max-w-[44ch] text-lead leading-snug text-ink-soft">
          Every event goes up on Instagram first. RSVPs and sign-ups are on the Linktree.
        </p>
        <div data-reveal style={i(2)} className="mt-10 flex flex-wrap gap-3">
          <a href={INSTAGRAM} className="rounded-full bg-tomato px-7 py-4 text-lead leading-none text-ink transition-[background-color,scale] duration-300 hover:bg-chalk active:scale-[.97]">
            @fitted.uwb ↗
          </a>
          <a href={LINKTREE} className="rounded-full px-7 py-4 text-lead leading-none ring-1 ring-chalk/40 ring-inset transition-[background-color,color,scale] duration-300 hover:bg-chalk hover:text-ink active:scale-[.97]">
            Linktree ↗
          </a>
        </div>

        <dl className="mt-[max(80px,8vw)] grid grid-cols-3 gap-x-[3vw] [&>:nth-child(2)]:col-span-2 border-t border-chalk/15 pt-8 max-md:grid-cols-1 max-md:gap-y-7">
          {facts.map(([label, value], n) => (
            <div key={label} data-reveal style={i(n)}>
              <dt className="mb-2 text-small text-ink-soft">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p aria-hidden="true" className="mt-[max(64px,6vw)] flex justify-center text-[18.5vw] leading-[.78] font-medium tracking-[-0.06em] whitespace-pre select-none">
        {'Fitted UWB'.split('').map((ch, n) => (
          <span key={n} data-reveal style={i(n)} className="inline-block">{ch}</span>
        ))}
      </p>

      <div className="flex items-end justify-between gap-8 px-[3.5vw] pt-10 pb-8 text-small text-ink-soft max-md:flex-col max-md:items-start max-md:gap-4 max-md:px-5">
        <p className="max-w-[70ch]">
          © 2026 Fitted UWB, a student fashion club at UW Bothell. The event posters are the club&apos;s own. The pieces in the clothing ring are product photos from flat-lays shared on Pinterest; every brand shown belongs to its owner, and the club isn&apos;t affiliated with any of them.
        </p>
        <a href="#top" className="shrink-0 text-chalk hover:text-tomato">Back to top ↑</a>
      </div>
    </footer>
  );
}
