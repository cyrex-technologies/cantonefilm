import type { PortfolioItem } from '@/types/interface';

export interface HomePortfolioItem {
  title: string;
  category: string;
  coverImage: string;
  excerpt: string;
  featured?: boolean;
  badge?: string;
  href?: string;
  meta?: Array<{
    label: string;
    value: string;
  }>;
}

export const homePortfolio: HomePortfolioItem[] = [
  {
    title: 'Mvamizi',
    category: 'Feature Film · Cover Story',
    coverImage: '/img/portfolio/mvamizithumbnail.webp',
    excerpt:
      'Our award-winning feature film recognised at the Zanzibar International Film Festival. A powerful narrative that blends cinematic craft with deeply human storytelling, bringing Tanzanian voices to international audiences.',
    featured: true,
    badge: 'Award Winner · ZIFF',
    href: 'https://youtu.be/BbUsjVHT3W8?si=yAHvnp3pH4fxvTCB',
    meta: [
      { label: 'Format', value: 'Feature Film' },
      { label: 'Recognition', value: 'ZIFF Award' },
      { label: 'Year', value: '2022' },
    ],
  },
  {
    title: 'Teachers Training',
    category: 'Institutional',
    coverImage: '/img/portfolio/teachertrainingthumbnail.webp',
    excerpt: 'Institutional storytelling focused on teacher development.',
    href: 'https://vimeo.com/1128669390?fl=ip&fe=ec',
  },
  {
    title: 'Fisheries in Bangladesh',
    category: 'Institutional',
    coverImage:
      '/img/portfolio/fisheriesinbangladesh.webp',
    excerpt: 'Institutional work documenting fisheries impact in Bangladesh.',
    href: 'https://vimeo.com/1066148172',
  },
  {
    title: 'Data Collection Workshop',
    category: 'Event Coverage',
    coverImage: '/img/portfolio/datacollectionworkshop.webp',
    excerpt: 'Event coverage documenting field activity and participation.',
    href: 'https://vimeo.com/1127547984?fl=ip&fe=ec',
  },
] as const;

export const portfolio: PortfolioItem[] = [
  {
    title: 'Asia–Africa BlueTech Superhighway (AABS) – Multi-Country Video Series',
    slug: 'aabs-bluetech-superhighway',
    category: 'Documentary',
    coverImage: '/img/portfolio/fisheriesinbangladesh.webp',
    excerpt:
      'A multi-country documentary series on the Asia–Africa BlueTech Superhighway (AABS), highlighting how small-scale fishing and aquaculture communities are being supported through data systems, climate-smart technologies, value addition, and inclusive fisheries management.',
    featured: true,

    description:
      'This project documents the early progress of the Asia–Africa BlueTech Superhighway (AABS) across five countries in Africa and Asia led by WorldFish. Through a series of country-focused videos, the project highlights how small-scale fishing and aquaculture communities are being supported through improved data systems, climate-smart technologies, value addition, and more inclusive fisheries management, working closely with national institutions and local partners.',

    goal:
      'The goal of the project is to showcase how AABS is strengthening aquatic food systems across different contexts by improving productivity, resilience, and gender-inclusive participation within small-scale fisheries and aquaculture.',

    approach:
      'We adopted a documentary-style approach, collaborating with WorldFish and in-country partners to capture real activities, voices, and experiences on the ground. By combining interviews, field footage, and contextual visuals, the videos translate complex research and development efforts into clear, accessible stories tailored to each country’s realities.',

    results:
      'The project delivered a coordinated series of five videos—one from each participating country—providing a clear overview of AABS’s early progress, partnerships, and direction. The videos serve as communication and knowledge-sharing tools for partners, donors, and wider audiences, supporting engagement and understanding across regions.',

    links: [
      { label: 'Bangladesh', url: 'https://vimeo.com/1066148172' },
      { label: 'Nigeria', url: 'https://vimeo.com/1064781589' },
      { label: 'Tanzania', url: 'https://vimeo.com/1065895890' },
      { label: 'Kenya', url: 'https://vimeo.com/1064263847' },
      { label: 'Mozambique', url: 'https://vimeo.com/1141071077' },
    ],
  },

  {
    title: 'Tenda Teachers – Teacher Professional Development Video',
    slug: 'tenda-teachers',
    category: 'Impact Stories',
    coverImage: '/img/portfolio/teachertrainingthumbnail.webp',
    excerpt:
      'A documentary highlighting how the Tenda Teachers program strengthens teaching practices and creates more engaging classroom environments for primary school teachers in Tanzania.',
    vimeoId: '1128669390',

    description:
      'This project was commissioned by Project Zawadi to document the Tenda Teachers program, which supports primary school teachers in Tanzania to adopt improved teaching techniques through demonstration videos and targeted training. The film highlights how these resources help teachers create more engaging and effective classroom environments.',

    goal:
      'The goal of the project was to showcase how the Tenda Teachers program is strengthening teaching practices and improving learning outcomes for pupils in primary schools.',

    approach:
      'We used a documentary-style approach, capturing classroom demonstrations, training activities, and teacher perspectives. Working closely with Project Zawadi, we focused on real classroom experiences to clearly communicate the program’s methods and impact.',

    results:
      'The final video provides a concise overview of the Tenda Teachers program and serves as a communication and advocacy tool for partners and donors supporting education initiatives in Tanzania.',

    links: [
      {
        label: 'Watch Video',
        url: 'https://vimeo.com/1128669390',
      },
    ],
  },
];
