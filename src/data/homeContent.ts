import aboutPortrait from '../../assets/images/guiro-hero.webp';
import animalsBorderCollie from '../../assets/images-e-videos/port-2026-web/animals-border-collie-2.jpg';
import animalsCockerSpaniel from '../../assets/images-e-videos/port-2026-web/animals-cocker-spaniel.jpg';
import animalsGato from '../../assets/images-e-videos/port-2026-web/animals-gato.jpg';
import animalsPoodle from '../../assets/images-e-videos/port-2026-web/animals-poodle.jpg';
import animalsPorco from '../../assets/images-e-videos/port-2026-web/animals-porco.jpg';
import exportacaoFrancesinha from '../../assets/images-e-videos/port-2026-web/exportacao-sem-titulo-ash3580.jpg';
import francesinhaShelf from '../../assets/images-e-videos/port-2026-web/francesinha-ash3354.jpg';
import francesinhaTable from '../../assets/images-e-videos/port-2026-web/francesinha-ash3364.jpg';
import francesinhaTop from '../../assets/images-e-videos/port-2026-web/francesinha-ash3367.jpg';
import francesinhaPlate from '../../assets/images-e-videos/port-2026-web/francesinha-ash3540.jpg';
import francesinhaService from '../../assets/images-e-videos/port-2026-web/francesinha-ash3580.jpg';
import plantaWhiteFlowers from '../../assets/images-e-videos/port-2026-web/planta-ash03271.jpg';
import plantaPrimavera from '../../assets/images-e-videos/port-2026-web/planta-primavera.jpg';
import plantaPrunus from '../../assets/images-e-videos/port-2026-web/planta-prunus-serrulata.jpg';
import ponteDeLimaBridge from '../../assets/images-e-videos/port-2026-web/ponte-de-lima-ash01205.jpg';
import ponteDeLimaFlag from '../../assets/images-e-videos/port-2026-web/ponte-de-lima-ash01344.jpg';
import ponteDeLimaAlameda from '../../assets/images-e-videos/port-2026-web/ponte-de-lima-dsc00258.jpg';
import streetPonteDeLima from '../../assets/images-e-videos/port-2026-web/street-ash02611.jpg';

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
    slug: 'street-ponte-de-lima',
    title: 'Ponte de Lima Street Frame',
    subtitle: 'A quiet public moment held in warm afternoon light.',
    description:
      'Observed street photography from Ponte de Lima, built around gesture, distance and sun-washed architecture. The frame keeps the conversation intimate without losing the public texture around it.',
    year: '2026',
    location: 'Ponte de Lima',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.photography',
    filters: ['photography', 'artists'],
    image: streetPonteDeLima,
    objectPosition: 'center 58%',
    tags: ['Street', 'Ponte de Lima', 'Candid'],
    focusPoints: ['Observed human gesture', 'Warm daylight atmosphere', 'Editorial crop from a public scene'],
  },
  {
    slug: 'francesinha-service',
    title: 'Francesinha Service',
    subtitle: 'Food texture, table movement and cinematic shadow.',
    description:
      'A close food frame centered on the hands, sauce and ritual of the table. The image keeps the appetite tactile while using darkness and crop to make the scene feel intentional.',
    year: '2026',
    location: 'Portugal',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.brands',
    filters: ['photography', 'brands'],
    image: exportacaoFrancesinha,
    objectPosition: 'center 43%',
    tags: ['Food', 'Restaurant', 'Detail'],
    focusPoints: ['Hands and service as narrative', 'Low-key commercial mood', 'Texture-led food direction'],
  },
  {
    slug: 'ponte-de-lima-bridge',
    title: 'Ponte de Lima Bridge',
    subtitle: 'Stone arches, river calm and landscape scale.',
    description:
      'A landscape frame that treats the bridge as both structure and rhythm. Water, mountains and stone arches hold a calm visual tempo for tourism, editorial or place-led storytelling.',
    year: '2026',
    location: 'Ponte de Lima',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.photography',
    filters: ['photography'],
    image: ponteDeLimaBridge,
    objectPosition: 'center center',
    tags: ['Landscape', 'Architecture', 'River'],
    focusPoints: ['Place-led composition', 'Clean river and mountain layers', 'Tourism-ready atmosphere'],
  },
  {
    slug: 'animals-porco',
    title: 'Porco',
    subtitle: 'Rural animal study with direct daylight texture.',
    description:
      'A clean animal frame focused on scale, behavior and daylight. The composition keeps the subject grounded in its environment without over-staging the moment.',
    year: '2026',
    location: 'Portugal',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.photography',
    filters: ['photography'],
    image: animalsPorco,
    objectPosition: 'center 45%',
    tags: ['Animals', 'Rural', 'Daylight'],
    focusPoints: ['Natural behavior', 'Environmental context', 'Neutral documentary framing'],
  },
  {
    slug: 'animals-poodle',
    title: 'Poodle',
    subtitle: 'Pet portrait with character, leash tension and clean contrast.',
    description:
      'A vertical pet portrait that keeps the dog expressive and graphic. The crop uses the leash and concrete ground as simple structure around the subject.',
    year: '2026',
    location: 'Portugal',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.photography',
    filters: ['photography'],
    image: animalsPoodle,
    objectPosition: 'center 38%',
    tags: ['Animals', 'Pet', 'Portrait'],
    focusPoints: ['Subject-first pet framing', 'Simple background control', 'Character-led crop'],
  },
  {
    slug: 'animals-cocker-spaniel',
    title: 'Cocker Spaniel',
    subtitle: 'Soft expression and warm texture in a close animal portrait.',
    description:
      'A close animal portrait with attention on expression, coat texture and soft light. The frame keeps the tone gentle without losing definition in the subject.',
    year: '2026',
    location: 'Portugal',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.photography',
    filters: ['photography'],
    image: animalsCockerSpaniel,
    objectPosition: 'center 42%',
    tags: ['Animals', 'Dog', 'Portrait'],
    focusPoints: ['Warm portrait mood', 'Coat and eye detail', 'Quiet subject presence'],
  },
  {
    slug: 'animals-border-collie',
    title: 'Border Collie',
    subtitle: 'Fast profile energy caught in hard daylight.',
    description:
      'A dog portrait shaped by movement, profile and crisp contrast. The image keeps the animal alert and alive while retaining a clean editorial crop.',
    year: '2026',
    location: 'Portugal',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.photography',
    filters: ['photography'],
    image: animalsBorderCollie,
    objectPosition: 'center 44%',
    tags: ['Animals', 'Dog', 'Action'],
    focusPoints: ['Profile-driven composition', 'Crisp outdoor contrast', 'Energy without visual clutter'],
  },
  {
    slug: 'animals-gato',
    title: 'Gato',
    subtitle: 'A hidden feline frame inside dense green shadow.',
    description:
      'An animal study built around discovery. Leaves and shadow create a layered frame, letting the cat emerge quietly instead of being forced into a staged portrait.',
    year: '2026',
    location: 'Portugal',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.photography',
    filters: ['photography'],
    image: animalsGato,
    objectPosition: 'center 45%',
    tags: ['Animals', 'Cat', 'Shadow'],
    focusPoints: ['Layered natural framing', 'Subject hidden in environment', 'Documentary animal mood'],
  },
  {
    slug: 'francesinha-shelf-detail',
    title: 'Restaurant Shelf Detail',
    subtitle: 'Commercial still life with cans, gold and low light.',
    description:
      'A restaurant detail frame that turns small table culture into visual identity. Product shapes, gold accents and dark shelving create a compact commercial still life.',
    year: '2026',
    location: 'Portugal',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.brands',
    filters: ['photography', 'brands'],
    image: francesinhaShelf,
    objectPosition: 'center 45%',
    tags: ['Food', 'Brand Detail', 'Interior'],
    focusPoints: ['Atmospheric restaurant detail', 'Product and object rhythm', 'Compact identity frame'],
  },
  {
    slug: 'francesinha-table-study',
    title: 'Francesinha Table Study',
    subtitle: 'A wider food composition around sauce and table context.',
    description:
      'A plated food study with enough surrounding context to feel lived-in. The frame balances appetite, table rhythm and warm restaurant light.',
    year: '2026',
    location: 'Portugal',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.brands',
    filters: ['photography', 'brands'],
    image: francesinhaTable,
    objectPosition: 'center 48%',
    tags: ['Food', 'Restaurant', 'Table'],
    focusPoints: ['Commercial food clarity', 'Warm table atmosphere', 'Context without distraction'],
  },
  {
    slug: 'francesinha-top-frame',
    title: 'Francesinha Top Frame',
    subtitle: 'Graphic plate geometry and sauce color from above.',
    description:
      'A top-oriented food frame with strong plate shape and sauce color. The crop makes the dish immediately readable for menus, social posts or restaurant identity.',
    year: '2026',
    location: 'Portugal',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.brands',
    filters: ['photography', 'brands'],
    image: francesinhaTop,
    objectPosition: 'center 46%',
    tags: ['Food', 'Menu', 'Graphic'],
    focusPoints: ['Dish-first readability', 'Graphic overhead structure', 'Warm sauce and plate contrast'],
  },
  {
    slug: 'francesinha-plate-close',
    title: 'Francesinha Plate Close',
    subtitle: 'A dense crop built around sauce, shadow and appetite.',
    description:
      'A close commercial food image that leans into density. The plate, shadow and sauce carry the frame without needing extra styling noise.',
    year: '2026',
    location: 'Portugal',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.brands',
    filters: ['photography', 'brands'],
    image: francesinhaPlate,
    objectPosition: 'center 45%',
    tags: ['Food', 'Close-up', 'Texture'],
    focusPoints: ['Appetite-led close crop', 'Dark restaurant atmosphere', 'Texture and shape control'],
  },
  {
    slug: 'francesinha-hand-cut',
    title: 'Francesinha Hand Cut',
    subtitle: 'Hands enter the food frame and turn service into story.',
    description:
      'A second service angle where the human action becomes the commercial hook. The hands, utensils and plate create a more narrative food image.',
    year: '2026',
    location: 'Portugal',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.brands',
    filters: ['photography', 'brands'],
    image: francesinhaService,
    objectPosition: 'center 42%',
    tags: ['Food', 'Hands', 'Service'],
    focusPoints: ['Human action inside food work', 'Service-led storytelling', 'Close crop for social cuts'],
  },
  {
    slug: 'planta-white-flowers',
    title: 'White Flowers',
    subtitle: 'Small white blooms suspended over deep violet texture.',
    description:
      'A botanical frame built from repetition, contrast and negative rhythm. The small flowers stay delicate while the darker ground gives the image graphic weight.',
    year: '2026',
    location: 'Portugal',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.photography',
    filters: ['photography'],
    image: plantaWhiteFlowers,
    objectPosition: 'center center',
    tags: ['Botanical', 'Flowers', 'Texture'],
    focusPoints: ['Graphic botanical repetition', 'High contrast flower detail', 'Quiet natural pattern'],
  },
  {
    slug: 'planta-primavera',
    title: 'Primavera',
    subtitle: 'Green spring layers seen from above.',
    description:
      'A spring landscape detail shaped by layered greens and distance. The frame works as a softer environmental study inside the 2026 photography archive.',
    year: '2026',
    location: 'Portugal',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.photography',
    filters: ['photography'],
    image: plantaPrimavera,
    objectPosition: 'center center',
    tags: ['Botanical', 'Spring', 'Landscape'],
    focusPoints: ['Layered green texture', 'Soft environmental distance', 'Seasonal atmosphere'],
  },
  {
    slug: 'planta-prunus-serrulata',
    title: 'Prunus Serrulata',
    subtitle: 'Pink blossom canopy against a quiet street background.',
    description:
      'A vertical botanical frame with the blossom canopy carrying most of the image. The background remains present but secondary, giving the flowers a clean editorial emphasis.',
    year: '2026',
    location: 'Portugal',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.photography',
    filters: ['photography'],
    image: plantaPrunus,
    objectPosition: 'center 45%',
    tags: ['Botanical', 'Blossom', 'Street'],
    focusPoints: ['Blossom-led composition', 'Vertical editorial crop', 'Soft urban background'],
  },
  {
    slug: 'ponte-de-lima-flag-line',
    title: 'Ponte de Lima Flag Line',
    subtitle: 'A graphic bridge edge cut against clean blue sky.',
    description:
      'A minimal architecture frame from Ponte de Lima. The diagonal bridge edge, flag and flat blue sky create a graphic place detail with strong negative space.',
    year: '2026',
    location: 'Ponte de Lima',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.photography',
    filters: ['photography'],
    image: ponteDeLimaFlag,
    objectPosition: 'center 42%',
    tags: ['Architecture', 'Minimal', 'Place'],
    focusPoints: ['Graphic negative space', 'Diagonal architectural line', 'Clean tourism detail'],
  },
  {
    slug: 'ponte-de-lima-alameda',
    title: 'Ponte de Lima Alameda',
    subtitle: 'A vertical walking frame under winter trees.',
    description:
      'A tree-lined street frame with depth, rhythm and human scale. The pedestrians and cyclists give the avenue movement without stealing the quiet atmosphere.',
    year: '2026',
    location: 'Ponte de Lima',
    mediumKey: 'nav.photography',
    audienceKey: 'works.filters.photography',
    filters: ['photography'],
    image: ponteDeLimaAlameda,
    objectPosition: 'center 54%',
    tags: ['Street', 'Landscape', 'Ponte de Lima'],
    focusPoints: ['Tree-lined depth', 'Human scale in the landscape', 'Quiet walking rhythm'],
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
