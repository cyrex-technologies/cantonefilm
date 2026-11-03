export interface Partner {
  name: string;
  type: string;
  url?: string;
  coverImage: string;
}

export const partners: Partner[] = [
  {
    name: 'M-Net',
    type: 'Television Broadcasting',
    coverImage:'/img/partners/televisionbroadcasting.webp'
  },
  {
    name: 'WorldFish',
    type: 'International Research',
    coverImage:'/img/partners/WorldFish_CGIAR_Logo_transparent_hires.webp'
  },
  {
    name: 'Project Zawadi',
    type: 'Education & Development',
    coverImage: '/img/partners/ProjectZawadi_Logo_transparent_hires.webp'
  },
  {
    name: 'Tanzania Institute of Education',
    type: 'Government Institution',
    coverImage: '/img/partners/TET_logo_transparent_hires.webp'
  },
];
