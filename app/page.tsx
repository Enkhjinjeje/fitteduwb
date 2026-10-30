import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { Effects } from '@/components/site/effects';
import { RingHero } from '@/components/hero/ring-hero';
import { Events } from '@/components/events/events';

// The whole site is one page: the clothing ring, then the events, then the footer.
export default function Home() {
  return (
    <>
      <a href="#events" className="fixed -top-20 left-4 z-[90] bg-ink px-4 py-3 text-chalk focus:top-4">Skip to events</a>
      <Header />
      <RingHero />
      <main>
        <Events />
      </main>
      <Footer />
      <Effects />
    </>
  );
}
