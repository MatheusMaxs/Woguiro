import aboutPortrait from '../../assets/images/guiro-hero.webp';
import glitchPortrait from '../../assets/images/guiro-glitch-4k.webp';

export type WorkFilter = 'all' | 'photography' | 'videography' | 'brands' | 'artists';

export interface FeaturedWork {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  location: string;
  mediumKey: 'nav.photography' | 'nav.videography';
  audienceKey: 'works.filters.photography' | 'works.filters.videography' | 'works.filters.brands' | 'works.filters.artists';
  filters: WorkFilter[];
  image: string;
  objectPosition?: string;
  tags: string[];
  focusPoints: string[];
}

export interface DisciplineHighlight {
  labelKey:
    | 'nav.photography'
    | 'nav.videography'
    | 'nav.brands'
    | 'nav.artists'
    | 'aboutPreview.disciplineDirection'
    | 'aboutPreview.disciplineMusic';
  description: string;
}

export interface StatHighlight {
  value: string;
  labelKey:
    | 'aboutPreview.stats.views'
    | 'aboutPreview.stats.countries'
    | 'aboutPreview.stats.languages'
    | 'aboutPreview.stats.partnerships';
}

export interface TechHighlight {
  id: string;
  label: string;
  value: string;
}

export interface ContactLink {
  href: string;
  labelKey: 'contact.instagram' | 'contact.youtube' | 'contact.email';
  value: string;
  copyValue: string;
}

export const YOUTUBE_CHANNEL_URL = 'https://youtube.com/@WodavLyrics';
export const EXPERIENCE_START_YEAR = 2021;

export const FEATURED_WORKS: FeaturedWork[] = [
  {
    slug: 'street-narrative',
    title: 'Street Narrative',
    subtitle: 'Light, silence and human texture inside the city.',
    description:
      'A still-image direction built around atmosphere first. The frame stays minimal, but every crop carries tension, movement and premium editorial control.',
    year: '2026',
    location: 'Lisbon / Porto',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.photography',
    filters: ['photography', 'artists'],
    image: glitchPortrait,
    objectPosition: 'center top',
    tags: ['Street', 'Portrait', 'Editorial'],
    focusPoints: ['Independent visual research', 'High-contrast stills', 'Frames prepared for campaign cuts'],
  },
  {
    slug: 'artist-motion-cut',
    title: 'Artist Motion Cut',
    subtitle: 'Visual language for artists who want mood before noise.',
    description:
      'Motion work shaped for music, performance and identity. The pacing is cinematic, the grading stays controlled and the final cut feels intentional instead of overloaded.',
    year: '2026',
    location: 'Portugal / Remote',
    mediumKey: 'nav.videography',
    audienceKey: 'works.filters.artists',
    filters: ['videography', 'artists'],
    image: glitchPortrait,
    objectPosition: 'center 22%',
    tags: ['Music', 'Direction', 'Motion'],
    focusPoints: ['Artist-first pacing', 'Cinematic motion grammar', 'Built for reels, clips and social edits'],
  },
  {
    slug: 'brand-pulse',
    title: 'Brand Pulse',
    subtitle: 'Commercial instinct translated into sharp visual rhythm.',
    description:
      'A cleaner commercial cut for brands and UGC work. Product framing, rhythm and call-to-action spacing are treated with the same care as the image itself.',
    year: '2026',
    location: 'Europe / Remote',
    mediumKey: 'nav.videography',
    audienceKey: 'works.filters.brands',
    filters: ['videography', 'brands'],
    image: aboutPortrait,
    objectPosition: 'center 18%',
    tags: ['UGC', 'Commercial', 'Conversion'],
    focusPoints: ['Brand-ready structure', 'Fast attention capture', 'Cutdowns for paid and organic usage'],
  },
  {
    slug: 'portrait-study',
    title: 'Portrait Study',
    subtitle: 'Stillness, restraint and presence with zero visual waste.',
    description:
      'Portrait sessions tuned to identity and presence. Minimal backgrounds, precise light and a restrained palette let expression do the heavy lifting.',
    year: '2025',
    location: 'Lisbon',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.photography',
    filters: ['photography'],
    image: aboutPortrait,
    objectPosition: 'center top',
    tags: ['Portrait', 'Identity', 'Minimal'],
    focusPoints: ['Controlled portrait language', 'Editorial posture', 'High-end still selection'],
  },
  {
    slug: 'ugc-signal',
    title: 'UGC Signal',
    subtitle: 'Fast, tactile content that still feels authored.',
    description:
      'UGC direction that does not fall into generic content formulas. Framing, rhythm and product proximity are tuned for trust and repeat watching.',
    year: '2026',
    location: 'Europe',
    mediumKey: 'nav.videography',
    audienceKey: 'works.filters.brands',
    filters: ['videography', 'brands'],
    image: glitchPortrait,
    objectPosition: 'center 32%',
    tags: ['UGC', 'Product', 'Social'],
    focusPoints: ['Mobile-native pacing', 'Product-first framing', 'Conversion-oriented cuts'],
  },
];

export const DISCIPLINE_HIGHLIGHTS: DisciplineHighlight[] = [
  {
    labelKey: 'nav.photography',
    description: 'Olhar cinematografico focado em pessoas, retratos e paisagens que contam historias.',
  },
  {
    labelKey: 'nav.videography',
    description: 'Narrativa visual com estetica cinematografica, captando emocoes, momentos e movimento.',
  },
  {
    labelKey: 'aboutPreview.disciplineDirection',
    description: 'Direcao com sensibilidade visual, construindo ritmo e proposito de identidade unica.',
  },
  {
    labelKey: 'nav.brands',
    description: 'Criacao de conteudo para marcas e UGC com um olhar leve, criativo, transformando ideias em conexoes reais.',
  },
  {
    labelKey: 'nav.artists',
    description: 'Criacao de identidades visuais para artistas, capas e conteudos com estetica e intencao.',
  },
  {
    labelKey: 'aboutPreview.disciplineMusic',
    description: 'Producao musical, captacao, mix e masterizacao de audio.',
  },
];

export const STAT_HIGHLIGHTS: StatHighlight[] = [
  { value: '656K+', labelKey: 'aboutPreview.stats.views' },
  { value: '10+', labelKey: 'aboutPreview.stats.countries' },
  { value: '07', labelKey: 'aboutPreview.stats.languages' },
  { value: '42', labelKey: 'aboutPreview.stats.partnerships' },
];

export const TECH_HIGHLIGHTS: TechHighlight[] = [
  { id: 'cpu', label: 'CPU', value: 'Ryzen 9 9950X3D' },
  { id: 'gpu', label: 'GPU', value: 'RTX 5090 OC 32GB' },
  { id: 'motherboard', label: 'Motherboard', value: 'ASUS ROG Crosshair X870E Extreme' },
  { id: 'ram', label: 'RAM', value: '128GB DDR5' },
  { id: 'camera', label: 'Camera', value: 'Sony a6700' },
  { id: 'main-gimbal', label: 'Gimbal', value: 'DJI Ronin RS4 Pro' },
  { id: 'ssd', label: 'SSD', value: '8TB\n(2x Samsung 990 PRO NVMe)' },
  {
    id: 'monitors',
    label: 'Monitors',
    value: '2x ASUS ROG Swift OLED PG32UCDM\n1x Dell Alienware AW3225QF',
  },
  { id: 'microphone', label: 'Microphone', value: 'Rode NT1 Gen5' },
  { id: 'interface', label: 'Interface', value: 'Focusrite Scarlett 2i2 (Blue Limited Edition)' },
  { id: 'phone', label: 'Phone', value: 'iPhone 17 Pro' },
  { id: 'mobile-gimbal', label: 'Gimbal', value: 'ZHIYUN Smooth Q3' },
];

export const WORKING_LANGUAGES = ['ES', 'EN', 'PT', 'IT', 'JP'];

export const CONTACT_EMAIL = 'woguiro@gmail.com';

export const CONTACT_LINKS: ContactLink[] = [
  {
    href: 'mailto:woguiro@gmail.com',
    labelKey: 'contact.email',
    value: 'woguiro@gmail.com',
    copyValue: 'woguiro@gmail.com',
  },
  {
    href: 'https://instagram.com/woguiro',
    labelKey: 'contact.instagram',
    value: '@woguiro',
    copyValue: '@woguiro',
  },
  {
    href: YOUTUBE_CHANNEL_URL,
    labelKey: 'contact.youtube',
    value: 'Wodav Lyrics',
    copyValue: YOUTUBE_CHANNEL_URL,
  },
];

export const ABOUT_PORTRAIT = aboutPortrait;
