import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { events, type ClubEvent, type Photo } from '@/lib/data';
import { EventReel } from './event-reel';

// Recap photos: anything saved in public/events/<event id>/ joins that event's photos, in file-name order.
function recapPhotos(ev: ClubEvent): Photo[] {
  let files: string[] = [];
  try { files = readdirSync(join(process.cwd(), 'public', 'events', ev.id)); } catch { return []; }
  return files
    .filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .sort()
    .map((f, n) => ({ src: `/events/${ev.id}/${f}`, alt: `${ev.name} recap, photo ${n + 1}`, href: ev.post }));
}

export function Events() {
  return <EventReel events={events.map(ev => ({ ...ev, photos: [...ev.photos, ...recapPhotos(ev)] }))} />;
}
