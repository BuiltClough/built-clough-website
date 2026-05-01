/**
 * Site config — the single file to edit when templatizing for a new client.
 * Swap this file + content collection markdown to spin up a new site.
 */

export const site = {
  name: 'Built Clough',
  tagline: 'Built right, the first time.',
  url: 'https://builtclough.com',

  contact: {
    phone: '(618) 956-0808',
    phoneHref: 'tel:+16189560808',
    email: 'hello@builtclough.com',
    address: {
      street: '520 S 14th St',
      city: 'Herrin',
      state: 'IL',
      zip: '62948',
    },
  },

  hours: [
    { days: 'Mon–Fri', hours: '8:00 am – 5:00 pm' },
    { days: 'Saturday', hours: '8:00 am – 12:00 pm' },
    { days: 'Sunday', hours: 'Closed' },
  ],

  services: [
    'Kitchen remodels',
    'Bathroom remodels',
    'Decks & outdoor living',
    'Handyman services',
  ],

  serviceArea: [
    'Marion',
    'Herrin',
    'Carbondale',
    'Makanda',
    'Murphysboro',
    'Carterville',
  ],

  social: {
    facebook: '',
    instagram: '',
  },

  /** Used for JSON-LD LocalBusiness schema */
  schema: {
    type: 'HomeAndConstructionBusiness',
    priceRange: '$$',
    geo: { latitude: 37.7995, longitude: -89.027 },
    areaServed: [
      'Marion, IL',
      'Herrin, IL',
      'Carbondale, IL',
      'Makanda, IL',
      'Murphysboro, IL',
      'Carterville, IL',
    ],
  },
} as const;

export type Site = typeof site;
