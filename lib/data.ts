export const LINKTREE = 'https://linktr.ee/FittedUWB';
export const INSTAGRAM = 'https://www.instagram.com/fitted.uwb/';

export type Photo = { src: string; alt: string; href?: string };

export type ClubEvent = {
  id: string;
  name: string;
  format: string;
  date: string;
  time?: string;
  place: string;
  poster: string;
  post: string;
  details: string[];
  // Pictures from the night itself. More are picked up from public/events/<id>/ at build time.
  photos: Photo[];
  // The poster's own look: its background, text colour and the face its title is set in.
  ground: string;
  ink: string;
  face: string;
};

// Oldest first, so scrolling down walks through the club's year. Every fact is read off the club's
// own posters and captions.
export const events: ClubEvent[] = [
  {
    id: 'first-post',
    name: 'Fitted UWB starts',
    format: 'First post',
    date: 'Thu May 15, 2025',
    place: 'Instagram',
    poster: '/posters/fitted-debut-2025.jpg',
    post: 'https://www.instagram.com/fitted.uwb/p/DJsTScVyn_p/',
    details: ["The club's first post on @fitted.uwb."],
    photos: [],
    ground: '#4b2d83', ink: '#f3eefb', face: 'font-sans font-light',
  },
  {
    id: 'first-general-meeting',
    name: 'First General Meeting',
    format: 'Halloween meeting',
    date: 'Tue Oct 28, 2025',
    time: '5:45–7:45 PM',
    place: 'DISC 252',
    poster: '/posters/first-general-meeting.jpg',
    post: INSTAGRAM,
    details: ['Candy, costumes, bingo and more.', 'Theme: dark colors and costumes, encouraged but not required.'],
    photos: [],
    ground: '#1d2238', ink: '#f3ead2', face: 'font-grunge',
  },
  {
    id: 'christmas-party',
    name: 'Christmas Party',
    format: 'Holiday party',
    date: 'Tue Dec 2, 2025',
    time: '5:45 PM',
    place: 'DISC 162',
    poster: '/posters/christmas-party.jpg',
    post: INSTAGRAM,
    details: ['Gingerbread cookie decorating, movie watching and more.', 'Food and drinks available.', 'Theme: PJs and cozy knitwear.'],
    photos: [],
    ground: '#f7f1e8', ink: '#a3302c', face: 'font-script',
  },
  {
    id: 'discover-hidden-gems',
    name: 'Discover Hidden Gems',
    format: 'Winter general meeting',
    date: 'Thu Jan 29, 2026',
    time: '5:45–7:45 PM',
    place: 'DISC 162',
    poster: '/posters/discover-hidden-gems.jpg',
    post: INSTAGRAM,
    details: ['The first general meeting of winter quarter.', 'Learn about thrifting, with tips for before and after you thrift, and come hang out.'],
    photos: [],
    ground: '#1c1a17', ink: '#ece8f2', face: 'font-nitya italic',
  },
  {
    id: 'bin-there-done-that',
    name: 'Bin There, Done That',
    format: 'Thrift trip',
    date: 'Sat Feb 7, 2026',
    time: '1 PM',
    place: 'Goodwill Bins, 2208 W Casino Rd, Everett',
    poster: '/posters/bin-there-done-that.jpg',
    post: INSTAGRAM,
    details: ['Thrift the Goodwill Bins with fellow members.'],
    photos: [],
    ground: '#ece7dd', ink: '#3a3733', face: 'font-trail',
  },
  {
    id: 'lunar-new-year',
    name: 'Lunar New Year',
    format: 'Celebration',
    date: 'Thu Feb 26, 2026',
    time: '5:45–7:45 PM',
    place: 'DISC 252',
    poster: '/posters/lunar-new-year.jpg',
    post: INSTAGRAM,
    details: ['Homemade dumplings, and make your own Pan Chang knot to elevate your look.', 'Food provided; RSVP so we know how much to make.'],
    photos: [],
    ground: '#b3261e', ink: '#fbe9cf', face: 'font-swap',
  },
  {
    id: 'own-the-stage',
    name: 'Own the Stage',
    format: 'MNSA runway sign-up',
    date: 'Fri Mar 6, 2026',
    time: '5–7 PM',
    place: 'Denny Hall 303',
    poster: '/posters/own-the-stage.jpg',
    post: INSTAGRAM,
    details: ["MNSA's runway: show off your traditional clothing, like the Mongolian deel, and compete for prizes.", 'Represent the culture.'],
    photos: [],
    ground: '#151515', ink: '#f2f2f2', face: 'font-sans font-light uppercase tracking-[.04em]',
  },
  {
    id: 'spring-swap',
    name: 'Spring Swap',
    format: 'Clothing swap',
    date: 'Tue Apr 7, 2026',
    time: '5:45–7:45 PM',
    place: 'DISC 162',
    poster: '/posters/spring-swap.jpg',
    post: 'https://www.instagram.com/fitted.uwb/p/DWmtdFbErf0/',
    details: [
      "UWB's first ever swap meet.",
      "Bring clean, gently used clothes to trade, or donate them to Fitted UWB's clothing drive.",
      'Dress code: colorful. Food and drinks provided.',
    ],
    photos: [],
    ground: '#fde4ef', ink: '#126292', face: 'font-swap',
  },
  {
    id: 'nitya',
    name: 'Fitted × Nitya',
    format: 'Indian fashion',
    date: 'Thu Apr 16, 2026',
    time: '6–8 PM',
    place: 'DISC 252',
    poster: '/posters/nitya-collab.jpg',
    post: 'https://www.instagram.com/fitted.uwb/p/DXHjXRileGC/',
    details: [
      "Fitted UWB's first collab with Nitya.",
      'The many layers of Indian fashion, and how to bring traditional garments into everyday outfits.',
      'Theme: traditional wear, fitted tops.',
    ],
    photos: [],
    ground: '#9b2557', ink: '#fbe8d4', face: 'font-script',
  },
  {
    id: 'hiking',
    name: 'Hues, Halter & Hiking',
    format: 'Outfit hike',
    date: 'Sun May 3, 2026',
    time: '10 AM',
    place: 'Rattlesnake Ridge',
    poster: '/posters/hues-halter-hiking.jpg',
    post: 'https://www.instagram.com/fitted.uwb/p/DXZ2Dn3Feui/',
    details: [
      'A hike with a color hunt to match your outfit. Bring your best hiking fit.',
      'Carpooling available. Bring water and snacks.',
      'The route: 5.6 miles out and back, 1,440 ft of climbing, about three hours.',
    ],
    photos: [{ src: '/posters/hiking-recap.jpg', alt: 'The view from Rattlesnake Ridge on the hike recap', href: 'https://www.instagram.com/fitted.uwb/p/DYQAnisAQqb/' }],
    ground: '#ecdcc0', ink: '#4a5532', face: 'font-trail',
  },
  {
    id: 'bleached-tees',
    name: 'Bleached Tees',
    format: 'Bleach a shirt',
    date: 'Wed May 6, 2026',
    time: 'From 5:45 PM',
    place: 'ResLife Quad',
    poster: '/posters/bleached-tees.jpg',
    post: 'https://www.instagram.com/fitted.uwb/p/DXr3pMTFbN3/',
    details: ['Bleaching T-shirts on the quad.', 'Materials provided, and anything of your own you wanted to bleach was welcome too.'],
    photos: [{ src: '/posters/bleached-tees-recap.jpg', alt: 'A black tee bleached with a jellyfish on the quad', href: 'https://www.instagram.com/fitted.uwb/p/DYpgfSTFeMv/' }],
    ground: '#141414', ink: '#f5c518', face: 'font-grunge',
  },
  {
    id: 'diy-meet',
    name: 'DIY Meet × Stitched',
    format: 'Ties, bandanas, totes',
    date: 'Tue May 19, 2026',
    time: '5:45–8:15 PM',
    place: 'DISC 252',
    poster: '/posters/diy-meet.jpg',
    post: 'https://www.instagram.com/fitted.uwb/p/DYVEGJMjagE/',
    details: ['Decorate your own ties, bandanas and tote bags, with Stitched.', 'Food provided. Everyone left having learned a little sewing.'],
    photos: [{ src: '/posters/diy-meet-recap.jpg', alt: 'Sewing supplies from the DIY Meet recap', href: 'https://www.instagram.com/fitted.uwb/p/DYxO0l_AeLh/' }],
    ground: '#f6f4ee', ink: '#2d2a26', face: 'font-ransom',
  },
];
