import type { RefObject } from 'react';
import type { ClubEvent } from '@/lib/data';

// The detail sheet for one event: the full poster on one side (it shares a view-transition name with
// the poster in the reel, so it grows out of it), and the facts, recap photos and Instagram link on
// the other, in the event's own colours.
type Props = {
  event: ClubEvent;
  open: boolean;
  dialogRef: RefObject<HTMLDialogElement | null>;
  onDismiss: () => void;   // close with the transition (Close button, backdrop click)
  onClosed: () => void;    // the dialog closed itself (Esc)
};

export function EventSheet({ event, open, dialogRef, onDismiss, onClosed }: Props) {
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="event-sheet-h"
      onClose={onClosed}
      onClick={e => { if (e.target === e.currentTarget) onDismiss(); }}
      className="m-auto max-h-[92svh] w-[min(1120px,94vw)] overflow-hidden p-0 backdrop:bg-ink/75 max-md:h-svh max-md:max-h-svh max-md:w-full max-md:max-w-none"
      style={{ backgroundColor: event.ground, color: event.ink }}
    >
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
          <div className="sheet-in max-h-[92svh] overflow-y-auto p-[clamp(24px,4vw,56px)] max-md:max-h-none">
            <p className="text-small opacity-70">{event.format}</p>
            <h3 id="event-sheet-h" className={`mt-2 text-[clamp(40px,4.2vw,64px)] leading-[.95] font-normal ${event.face}`}>{event.name}</h3>

            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-body">
              <dt className="opacity-60">When</dt>
              <dd>{event.date}{event.time && ` · ${event.time}`}</dd>
              <dt className="opacity-60">Where</dt>
              <dd>{event.place}</dd>
            </dl>

            <div className="mt-6 grid max-w-[52ch] gap-3">
              {event.details.map(t => <p key={t}>{t}</p>)}
            </div>

            {event.photos.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-small opacity-70">From the night</p>
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
                See it on Instagram ↗
              </a>
              <button type="button" onClick={onDismiss} autoFocus className="min-h-11 cursor-pointer text-small underline underline-offset-4">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
