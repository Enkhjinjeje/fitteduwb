import type { RefObject } from 'react';
import { INSTAGRAM, type ClubEvent } from '@/lib/data';

// A native dialog with poster, readable facts, recap photos and source links.
type Props = {
  event: ClubEvent;
  open: boolean;
  dialogRef: RefObject<HTMLDialogElement | null>;
  onDismiss: () => void;   // Close button or backdrop
  onClosed: () => void;    // Escape requests dismissal
};

export function EventSheet({ event, open, dialogRef, onDismiss, onClosed }: Props) {
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="event-sheet-h"
      onCancel={e => { e.preventDefault(); onClosed(); }}
      onClick={e => { if (e.target === e.currentTarget) onDismiss(); }}
      className="m-auto max-h-[92svh] w-[min(1120px,94vw)] overflow-hidden p-0 backdrop:bg-ink/75 max-md:h-svh max-md:max-h-svh max-md:w-full max-md:max-w-none"
      style={{ backgroundColor: event.ground, color: event.ink }}
    >
      {open && <button type="button" autoFocus onClick={onDismiss} aria-label="Close event details" className="absolute right-3 top-3 z-20 min-h-11 rounded-full border border-current px-4" style={{ backgroundColor: event.ground, color: event.ink }}>Close</button>}
      {open && (
        <div className="grid max-h-[92svh] grid-cols-[minmax(0,5fr)_minmax(0,6fr)] max-md:block max-md:h-svh max-md:max-h-none max-md:overflow-y-auto">
          {/* Poster */}
          <div className="grid place-items-center bg-black/10 p-[clamp(16px,3vw,40px)]">
            <img
              src={event.poster}
              alt={`${event.name} poster`}
              width={800}
              height={1000}
              className="max-h-[82svh] w-auto max-w-full object-contain shadow-[0_24px_60px_-20px_rgb(0_0_0/.5)] max-md:max-h-[60svh]"
              style={{ viewTransitionName: 'event-poster' }}
            />
          </div>

          {/* Facts, rising in one after another (.sheet-in in globals.css) */}
          <div className="sheet-in max-h-[92svh] overflow-y-auto p-[clamp(24px,4vw,56px)] pt-16 max-md:max-h-none">
            <p className="text-small opacity-100">{event.format}</p>
            <h3 id="event-sheet-h" className={`mt-2 text-[clamp(40px,4.2vw,64px)] leading-[.95] font-normal ${event.face}`}>{event.name}</h3>

            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-body">
              <dt className="opacity-100">When</dt>
              <dd>{event.date}{event.time && ` · ${event.time}`}</dd>
              <dt className="opacity-100">Where</dt>
              <dd>{event.place}</dd>
            </dl>

            <div className="mt-6 grid max-w-[52ch] gap-3">
              {event.details.map(t => <p key={t}>{t}</p>)}
            </div>

            {event.photos.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-small opacity-100">From the night</p>
                <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2">
                  {event.photos.map(p => (
                    <a key={p.src} href={p.href ?? event.post} className="block overflow-hidden">
                      <img src={p.src} alt={p.alt} width={512} height={640} loading="lazy" className="aspect-[4/5] w-full object-cover transition-[scale] duration-500 ease-expo hover:scale-105" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a href={event.post} className="rounded-full px-5 py-3 text-small font-medium" style={{ backgroundColor: event.ink, color: event.ground }}>
                {event.post === INSTAGRAM ? 'Visit the club’s Instagram ↗' : 'See the original post ↗'}
              </a>
              <a href={`#event=${encodeURIComponent(event.id)}`} className="min-h-11 py-3 text-small underline underline-offset-4">Link to this event</a>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
