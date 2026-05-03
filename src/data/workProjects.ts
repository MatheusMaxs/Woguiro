import { FEATURED_WORKS, type FeaturedWork } from '@/data/homeContent';

export type ProjectFilter = 'all' | 'street' | 'portraits' | 'brands' | 'video' | 'ugc' | 'music';

export interface WorkProject {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  story: string;
  date: string;
  client: string;
  location: string;
  category: string;
  filters: ProjectFilter[];
  highlights: string[];
  images: FeaturedWork[];
  hero: FeaturedWork;
}

export const PROJECT_FILTERS: Array<{ id: ProjectFilter; label: string }> = [
  { id: 'all', label: 'Todos' },
  { id: 'street', label: 'Rua' },
  { id: 'portraits', label: 'Retratos' },
  { id: 'brands', label: 'Marcas' },
  { id: 'video', label: 'Video' },
  { id: 'ugc', label: 'UGC' },
  { id: 'music', label: 'Musica' },
];

const workBySlug = new Map(FEATURED_WORKS.map((work) => [work.slug, work]));

const requireWork = (slug: string) => {
  const work = workBySlug.get(slug);

  if (!work) {
    throw new Error(`Missing work item: ${slug}`);
  }

  return work;
};

export const WORK_PROJECTS: WorkProject[] = [
  {
    slug: 'ponte-de-lima-street-archive',
    title: 'Ponte de Lima Street Archive',
    subtitle: 'Rua, escala humana e arquitetura num arquivo luminoso de lugar.',
    description:
      'Um projeto documental em Ponte de Lima que junta gesto humano, paisagem e detalhes arquitetonicos num ritmo visual calmo e editorial.',
    story:
      'A serie observa Ponte de Lima sem encenar a cidade. O foco passa por conversas discretas na rua, linhas graficas da ponte, textura das arvores e a presenca do rio como pausa visual. Cada imagem segura uma camada diferente do mesmo lugar: movimento humano, memoria arquitetonica e luz natural.',
    date: 'Abril 2026',
    client: 'Arquivo independente',
    location: 'Ponte de Lima, Portugal',
    category: 'Rua / Paisagem',
    filters: ['street'],
    highlights: [
      'Momentos humanos observados sem pose',
      'Arquitetura e paisagem como estrutura narrativa',
      'Cortes verticais e horizontais prontos para portfolio editorial',
    ],
    images: [
      requireWork('street-ponte-de-lima'),
      requireWork('ponte-de-lima-bridge'),
      requireWork('ponte-de-lima-flag-line'),
      requireWork('ponte-de-lima-alameda'),
    ],
    hero: requireWork('street-ponte-de-lima'),
  },
  {
    slug: 'francesinha-restaurant-study',
    title: 'Francesinha Restaurant Study',
    subtitle: 'Comida, mesa e identidade comercial em luz baixa.',
    description:
      'Uma serie de food photography criada para transformar o ritual da francesinha em narrativa visual de restaurante, com textura, maos e atmosfera.',
    story:
      'O projeto trata a comida como experiencia e nao apenas como produto. A mesa, as maos, o molho e os objetos laterais constroem uma leitura mais densa da marca: apetite, proximidade e ambiente. O resultado funciona como banco de imagens para social, menus, campanhas e identidade local.',
    date: 'Marco 2026',
    client: 'Restaurante / Conteudo comercial',
    location: 'Portugal',
    category: 'Marcas / Food',
    filters: ['brands', 'ugc'],
    highlights: [
      'Direcao de comida com textura e acao humana',
      'Frames fechados para social e menus digitais',
      'Detalhes de ambiente para reforcar identidade de marca',
    ],
    images: [
      requireWork('francesinha-service'),
      requireWork('francesinha-hand-cut'),
      requireWork('francesinha-table-study'),
      requireWork('francesinha-top-frame'),
      requireWork('francesinha-plate-close'),
      requireWork('francesinha-shelf-detail'),
    ],
    hero: requireWork('francesinha-service'),
  },
  {
    slug: 'animal-portrait-studies',
    title: 'Animal Portrait Studies',
    subtitle: 'Retratos de animais com personalidade, textura e ambiente.',
    description:
      'Uma colecao de retratos animais que alterna proximidade, comportamento e contexto natural, mantendo cada sujeito com presenca propria.',
    story:
      'A serie foi construida a partir de observacao rapida e cortes limpos. Em vez de forcar poses, cada imagem procura uma expressao ou gesto especifico: o perfil atento, o olhar escondido, a textura do pelo ou a escala rural. O conjunto cria um arquivo versatil para retrato, editorial e comunicacao afetiva.',
    date: '2026',
    client: 'Arquivo independente',
    location: 'Portugal',
    category: 'Retratos / Animais',
    filters: ['portraits'],
    highlights: [
      'Retratos guiados por comportamento real',
      'Mistura de close, perfil e ambiente natural',
      'Selecao com leitura editorial e afetiva',
    ],
    images: [
      requireWork('animals-poodle'),
      requireWork('animals-cocker-spaniel'),
      requireWork('animals-border-collie'),
      requireWork('animals-gato'),
      requireWork('animals-porco'),
    ],
    hero: requireWork('animals-poodle'),
  },
  {
    slug: 'botanical-season-studies',
    title: 'Botanical Season Studies',
    subtitle: 'Flores, primavera e textura natural em composicoes silenciosas.',
    description:
      'Um estudo botanico focado em repeticao, cor e atmosfera sazonal, com imagens preparadas para leitura editorial e detalhe decorativo.',
    story:
      'O projeto reduz a paisagem a detalhes botanicos e ritmo visual. As flores brancas trabalham contraste, a primavera abre camadas verdes e a Prunus Serrulata adiciona uma leitura vertical mais romantica. A serie funciona como respiro dentro do portfolio: leve, grafica e contemplativa.',
    date: 'Primavera 2026',
    client: 'Arquivo independente',
    location: 'Portugal',
    category: 'Natureza / Botanico',
    filters: ['portraits'],
    highlights: [
      'Composicoes botanicas com ritmo grafico',
      'Contraste entre detalhe, cor e espaco natural',
      'Imagens leves para uso editorial e atmosferico',
    ],
    images: [
      requireWork('planta-prunus-serrulata'),
      requireWork('planta-white-flowers'),
      requireWork('planta-primavera'),
    ],
    hero: requireWork('planta-prunus-serrulata'),
  },
];
