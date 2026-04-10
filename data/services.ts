// /data/services.ts

export const services = [
  {
    id: 'feature-films',
    title: 'Feature Films',
    backgroundTitle: 'FILMS',
    description:
      'Original narrative films driven by strong storytelling and refined visual craft - from development through final cut.',
    image: '/img/portfolio/documentary-banner.png',
    features: [
      'Narrative Development',
      'Production Planning',
      'Cinematic Direction',
      'Final Cut Delivery',
    ],
    cta: {
      label: 'Discuss a Film Project',
      href: '/#contact',
    },
  },

  {
    id: 'documentaries',
    title: 'Documentaries',
    backgroundTitle: 'DOCS',
    description:
      'Non-fiction projects that capture real stories with cinematic depth - local, regional, and international subjects.',
    image: '/img/portfolio/left-documentary-banner.png',
    features: [
      'Real-World Stories',
      'Field Production',
      'Documentary Interviews',
      'Cinematic Storytelling',
    ],
    cta: {
      label: 'Plan a Documentary',
      href: '/#contact',
    },
  },

  {
    id: 'tv-content',
    title: 'TV Content',
    backgroundTitle: 'TV',
    description:
      'Television productions that engage and entertain across fiction and non-fiction formats for broadcast and streaming.',
    image: '/img/portfolio/documentary-banner.png',
    features: [
      'Broadcast Formats',
      'Series Production',
      'Entertainment Content',
      'Streaming-Ready Delivery',
    ],
    cta: {
      label: 'Develop TV Content',
      href: '/#contact',
    },
  },

  {
    id: 'institutional',
    title: 'Institutional',
    backgroundTitle: 'IMPACT',
    description:
      'Communication projects for organisations and partners - helping ideas, impact, and vision reach their audience effectively.',
    image: '/img/portfolio/left-documentary-banner.png',
    features: [
      'NGO Communication',
      'Institutional Films',
      'Impact Storytelling',
      'Audience-Focused Delivery',
    ],
    cta: {
      label: 'Start an Institutional Project',
      href: '/#contact',
    },
  },
] as const;

export type ServiceId = typeof services[number]['id'];
