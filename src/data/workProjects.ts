import { FEATURED_WORKS } from '@/data/homeContent';

import animalsGatito from '../../assets/images-e-videos/port-2026-web/animals-gatito.jpg';
import cocaColaLoop from '../../assets/images-e-videos/port-2026-web/coca-cola-loop.mp4';
import cocaColaLoopPoster from '../../assets/images-e-videos/port-2026-web/coca-cola-loop-poster.jpg';
import compalLoop from '../../assets/images-e-videos/port-2026-web/compal-loop.mp4';
import compalLoopPoster from '../../assets/images-e-videos/port-2026-web/compal-loop-poster.jpg';
import grindsetVideo from '../../assets/images-e-videos/port-2026-web/grindset-2.mp4';
import grindsetPoster from '../../assets/images-e-videos/port-2026-web/grindset-2-poster.jpg';
import livrariaDecoracaoPadre from '../../assets/images-e-videos/port-2026-web/livraria-decoracao-padre.jpg';
import livrariaLivrosPrincipais from '../../assets/images-e-videos/port-2026-web/livraria-livros-principais.jpg';
import livrariaLivrosSecundarios from '../../assets/images-e-videos/port-2026-web/livraria-livros-secundarios.jpg';
import livrariaObra from '../../assets/images-e-videos/port-2026-web/livraria-obra.jpg';
import livrariaRua from '../../assets/images-e-videos/port-2026-web/livraria-rua-da-livrearia.jpg';
import livrariaSessao from '../../assets/images-e-videos/port-2026-web/livraria-sessao.mp4';
import livrariaSessaoPoster from '../../assets/images-e-videos/port-2026-web/livraria-sessao-poster.jpg';
import myIcedAsh02703 from '../../assets/images-e-videos/port-2026-web/my-iced-ash02703.jpg';
import myIcedB2 from '../../assets/images-e-videos/port-2026-web/my-iced-b2.jpg';
import myIcedC2 from '../../assets/images-e-videos/port-2026-web/my-iced-c2.jpg';
import ponteDeLimaAsh01207 from '../../assets/images-e-videos/port-2026-web/ponte-de-lima-ash01207.jpg';
import ruanJogador from '../../assets/images-e-videos/port-2026-web/ruan-jogador.jpg';
import ugcBabesPapesAi1 from '../../assets/images-e-videos/port-2026-web/ugc-babes-papes-ai-1.mp4';
import ugcBabesPapesAi1Poster from '../../assets/images-e-videos/port-2026-web/ugc-babes-papes-ai-1-poster.jpg';
import ugcBabespapes1 from '../../assets/images-e-videos/port-2026-web/ugc-babespapes-1.mp4';
import ugcBabespapes1Poster from '../../assets/images-e-videos/port-2026-web/ugc-babespapes-1-poster.jpg';
import ugcBabespapesAi from '../../assets/images-e-videos/port-2026-web/ugc-babespapes-ai.mp4';
import ugcBabespapesAiPoster from '../../assets/images-e-videos/port-2026-web/ugc-babespapes-ai-poster.jpg';
import ugcMisterTuga from '../../assets/images-e-videos/port-2026-web/ugc-mister-tuga.mp4';
import ugcMisterTugaPoster from '../../assets/images-e-videos/port-2026-web/ugc-mister-tuga-poster.jpg';
import ugcMisterTuga2 from '../../assets/images-e-videos/port-2026-web/ugc-mister-tuga-2.mp4';
import ugcMisterTuga2Poster from '../../assets/images-e-videos/port-2026-web/ugc-mister-tuga-2-poster.jpg';

export type ProjectFilter = 'all' | 'street' | 'portraits' | 'brands' | 'video' | 'ugc' | 'music';

export interface ProjectMedia {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  src: string;
  poster?: string;
  mediaKind: 'image' | 'video';
  objectPosition?: string;
}

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
  images: ProjectMedia[];
  hero: ProjectMedia;
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

const fromWork = (slug: string): ProjectMedia => {
  const work = workBySlug.get(slug);

  if (!work) {
    throw new Error(`Missing work item: ${slug}`);
  }

  return {
    slug: work.slug,
    title: work.title,
    subtitle: work.subtitle,
    description: work.description,
    src: work.image,
    mediaKind: 'image',
    objectPosition: work.objectPosition,
  };
};

const photo = (
  slug: string,
  title: string,
  subtitle: string,
  description: string,
  src: string,
  objectPosition?: string,
): ProjectMedia => ({
  slug,
  title,
  subtitle,
  description,
  src,
  mediaKind: 'image',
  objectPosition,
});

const video = (
  slug: string,
  title: string,
  subtitle: string,
  description: string,
  src: string,
  poster: string,
  objectPosition?: string,
): ProjectMedia => ({
  slug,
  title,
  subtitle,
  description,
  src,
  poster,
  mediaKind: 'video',
  objectPosition,
});

const ponteDeLimaExtra = photo(
  'ponte-de-lima-river-line',
  'Ponte de Lima River Line',
  'A river-facing frame with open water, bridge rhythm and soft distance.',
  'A wider visual pause inside the Ponte de Lima archive, balancing water texture, stone structure and background village scale.',
  ponteDeLimaAsh01207,
  'center center',
);

const gatitoPortrait = photo(
  'animals-gatito',
  'Gatito',
  'A young cat portrait caught with soft outdoor contrast.',
  'A small animal portrait that extends the pet studies with a lighter, more intimate read of expression and scale.',
  animalsGatito,
  'center 45%',
);

const myIcedMedia = [
  photo(
    'my-iced-c2',
    'My Iced C2',
    'Product-led cold drink frame with clean commercial spacing.',
    'A crisp beverage image made for brand detail, social cuts and simple product recognition.',
    myIcedC2,
    'center 48%',
  ),
  photo(
    'my-iced-ash02703',
    'My Iced Pour Study',
    'A brighter drink composition with label, surface and condensation detail.',
    'Commercial product photography focused on cold texture and clear brand readability.',
    myIcedAsh02703,
    'center 48%',
  ),
  photo(
    'my-iced-b2',
    'My Iced Detail B2',
    'A close supporting frame for campaign rhythm and secondary cuts.',
    'A detail-oriented image that completes the My Iced mini-series with texture and product proximity.',
    myIcedB2,
    'center 48%',
  ),
];

const livrariaMedia = [
  photo(
    'livraria-livros-principais',
    'Livros Principais',
    'Main book arrangement with cultural identity and intimate light.',
    'A central image from the Livrearia session, built around books, warmth and independent cultural atmosphere.',
    livrariaLivrosPrincipais,
    'center 45%',
  ),
  photo(
    'livraria-livros-secundarios',
    'Livros Secundarios',
    'Secondary shelves and book rhythm for the visual archive.',
    'A supporting composition that expands the sense of place through repetition, titles and shelf structure.',
    livrariaLivrosSecundarios,
    'center 50%',
  ),
  photo(
    'livraria-obra',
    'Obra',
    'A vertical detail focused on art, object and quiet interior tone.',
    'An interior detail that adds a slower cultural layer to the bookstore project.',
    livrariaObra,
    'center 45%',
  ),
  photo(
    'livraria-rua',
    'Rua da Livrearia',
    'Exterior context connecting the space to Ponte de Lima.',
    'A street-facing frame that situates the independent bookstore inside its local environment.',
    livrariaRua,
    'center 46%',
  ),
  photo(
    'livraria-decoracao-padre',
    'Decoracao Padre',
    'Interior object detail with regional and cultural texture.',
    'A small visual anchor that keeps the series close to the identity of the space.',
    livrariaDecoracaoPadre,
    'center 50%',
  ),
  video(
    'livraria-sessao',
    'Sessao Livrearia',
    'A short motion piece from the bookstore session.',
    'Motion support for the Livrearia project, built to show ambience, movement and discovery inside the space.',
    livrariaSessao,
    livrariaSessaoPoster,
    'center center',
  ),
];

const cocaColaCompalMedia = [
  video(
    'coca-cola-loop',
    'Coca Cola Loop',
    'A branded motion loop with product rhythm and quick visual hook.',
    'Short-form motion designed to carry brand recognition through movement, color and repetition.',
    cocaColaLoop,
    cocaColaLoopPoster,
    'center center',
  ),
  video(
    'compal-loop',
    'Compal Loop',
    'A compact animated drink loop for social usage.',
    'A lightweight conversion from the original GIF workflow, prepared as web video for performance.',
    compalLoop,
    compalLoopPoster,
    'center center',
  ),
];

const ugcMedia = [
  video(
    'ugc-mister-tuga',
    'Mister Tuga',
    'UGC motion piece with direct product and creator pacing.',
    'A mobile-native clip shaped for quick attention, brand trust and repeat viewing.',
    ugcMisterTuga,
    ugcMisterTugaPoster,
    'center center',
  ),
  video(
    'ugc-mister-tuga-2',
    'Mister Tuga 2',
    'Second UGC cut with compact pacing and campaign utility.',
    'A companion clip that extends the Mister Tuga sequence for alternative social edits.',
    ugcMisterTuga2,
    ugcMisterTuga2Poster,
    'center center',
  ),
  video(
    'ugc-babespapes-1',
    'BabesPapes 1',
    'UGC clip with lifestyle framing and mobile-first rhythm.',
    'A short commercial piece made for vertical placement and quick brand context.',
    ugcBabespapes1,
    ugcBabespapes1Poster,
    'center center',
  ),
  video(
    'ugc-babespapes-ai',
    'Babespapes AI',
    'AI-led UGC variation with compact motion language.',
    'A generated/composited variant prepared for campaign testing and fast iteration.',
    ugcBabespapesAi,
    ugcBabespapesAiPoster,
    'center center',
  ),
  video(
    'ugc-babes-papes-ai-1',
    'Babes Papes AI 1',
    'Second AI-led vertical UGC variation.',
    'A companion generated cut that expands the set with another pacing option.',
    ugcBabesPapesAi1,
    ugcBabesPapesAi1Poster,
    'center center',
  ),
];

const grindsetMedia = [
  video(
    'grindset-2',
    'Grindset 2',
    'A square motion edit built around energy, pacing and social impact.',
    'An editing-focused video study that demonstrates rhythm, cut structure and short-form visual intensity.',
    grindsetVideo,
    grindsetPoster,
    'center center',
  ),
];

const ruanFootballMedia = [
  photo(
    'ruan-jogador',
    'Ruan Jogador',
    'A football portrait with athlete presence and direct vertical framing.',
    'A focused portrait of Ruan as football player, shaped for personal brand, sports identity and editorial use.',
    ruanJogador,
    'center 42%',
  ),
];

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
      fromWork('street-ponte-de-lima'),
      fromWork('ponte-de-lima-bridge'),
      ponteDeLimaExtra,
      fromWork('ponte-de-lima-flag-line'),
      fromWork('ponte-de-lima-alameda'),
    ],
    hero: fromWork('street-ponte-de-lima'),
  },
  {
    slug: 'livraria-cultural-session',
    title: 'Livrearia Cultural Session',
    subtitle: 'Livros, arte e rua num espaco independente de Ponte de Lima.',
    description:
      'Sessao fotografica e motion para a Livrearia, valorizando atmosfera intimista, detalhe arquitetonico e identidade cultural.',
    story:
      'O projeto foi realizado na Livrearia, em Ponte de Lima, um espaco independente no Largo da Matriz pensado como ponto de encontro entre livros, arte e cultura. A abordagem visual centrou-se na atmosfera intimista do espaco, na relacao entre arquitetura, detalhe e luz, e na forma como o ambiente convida a descoberta e permanencia.',
    date: '2026',
    client: 'Livrearia',
    location: 'Ponte de Lima, Portugal',
    category: 'Marcas / Cultura',
    filters: ['brands', 'street', 'video'],
    highlights: [
      'Narrativa visual sobria e contemporanea para espaco cultural',
      'Detalhes de livros, arte e interior como identidade de marca',
      'Fotografia e motion reunidos numa pagina de projeto completa',
    ],
    images: livrariaMedia,
    hero: livrariaMedia[0],
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
      fromWork('francesinha-shelf-detail'),
      fromWork('francesinha-hand-cut'),
      fromWork('francesinha-table-study'),
      fromWork('francesinha-top-frame'),
      fromWork('francesinha-plate-close'),
      fromWork('francesinha-service'),
    ],
    hero: fromWork('francesinha-shelf-detail'),
  },
  {
    slug: 'my-iced-product-study',
    title: 'My Iced Product Study',
    subtitle: 'Produto frio, textura e leitura comercial direta.',
    description:
      'Mini-serie comercial para My Iced, focada em clareza de produto, condensacao, superficie e cortes prontos para social.',
    story:
      'A direcao visual coloca o produto como centro do frame e usa textura fria, proximidade e composicao limpa para reforcar desejo e reconhecimento. A serie funciona como material de campanha curta, conteudo organico e detalhe de marca.',
    date: '2026',
    client: 'My Iced',
    location: 'Portugal',
    category: 'Marcas / Produto',
    filters: ['brands', 'ugc'],
    highlights: [
      'Produto legivel em poucos segundos',
      'Detalhes frios e tacteis para social media',
      'Composicoes comerciais leves e reutilizaveis',
    ],
    images: myIcedMedia,
    hero: myIcedMedia[0],
  },
  {
    slug: 'ruan-football-player',
    title: 'Ruan Football Player',
    subtitle: 'Retrato vertical para identidade desportiva e presenca pessoal.',
    description:
      'Um estudo de retrato desportivo com foco em presenca, postura e leitura imediata de atleta.',
    story:
      'O frame posiciona Ruan como personagem central e trabalha uma linguagem direta para portfolio pessoal, perfil de atleta e comunicacao desportiva. A imagem foi pensada para segurar presenca sem excesso de elementos.',
    date: '2026',
    client: 'Ruan',
    location: 'Portugal',
    category: 'Retratos / Desporto',
    filters: ['portraits'],
    highlights: [
      'Retrato vertical com presenca de atleta',
      'Composicao limpa para identidade pessoal',
      'Leitura editorial voltada a desporto e perfil profissional',
    ],
    images: ruanFootballMedia,
    hero: ruanFootballMedia[0],
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
      fromWork('animals-poodle'),
      fromWork('animals-cocker-spaniel'),
      fromWork('animals-border-collie'),
      fromWork('animals-gato'),
      gatitoPortrait,
      fromWork('animals-porco'),
    ],
    hero: fromWork('animals-poodle'),
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
    images: [fromWork('planta-prunus-serrulata'), fromWork('planta-white-flowers'), fromWork('planta-primavera')],
    hero: fromWork('planta-prunus-serrulata'),
  },
  {
    slug: 'coca-cola-compal-motion-loops',
    title: 'Coca Cola & Compal Motion Loops',
    subtitle: 'Loops curtos de produto para impacto rapido em social.',
    description:
      'Projeto de videografia com loops de Coca Cola e Compal, convertido para web video leve sem perder leitura de marca.',
    story:
      'A pasta original tinha GIFs e MP4s pesados. Para o site, o material foi tratado como projeto de motion e convertido para clips web performaticos, mantendo a logica de loop, cor e reconhecimento de produto.',
    date: '2026',
    client: 'Coca Cola / Compal',
    location: 'Portugal',
    category: 'Video / Marcas',
    filters: ['video', 'brands', 'ugc'],
    highlights: [
      'Loops de produto preparados para web e social',
      'Reconhecimento de marca atraves de movimento curto',
      'Conversao otimizada a partir de GIF/MP4 bruto',
    ],
    images: cocaColaCompalMedia,
    hero: cocaColaCompalMedia[0],
  },
  {
    slug: 'ugc-video-pack',
    title: 'UGC Video Pack',
    subtitle: 'Cinco cortes verticais para marcas, testes AI e social proof.',
    description:
      'Conjunto de UGC videos com Mister Tuga e BabesPapes, incluindo variacoes AI e cortes mobile-native.',
    story:
      'O pack junta clips verticais com ritmos diferentes, pensados para marcas que precisam testar hooks, formatos e repeticao de mensagem. Cada video foi comprimido para o site e mantido como peca individual dentro da galeria do projeto.',
    date: '2026',
    client: 'Mister Tuga / BabesPapes',
    location: 'Portugal',
    category: 'UGC / Video',
    filters: ['ugc', 'video', 'brands'],
    highlights: [
      'Cinco cortes verticais reunidos num unico case',
      'Variacoes tradicionais e AI para teste criativo',
      'Formato mobile-first com carregamento otimizado',
    ],
    images: ugcMedia,
    hero: ugcMedia[0],
  },
  {
    slug: 'grindset-editing-study',
    title: 'Grindset Editing Study',
    subtitle: 'Edicao quadrada com energia, ritmo e impacto social.',
    description:
      'Projeto de video editing focado em cortes rapidos, energia visual e estrutura pensada para consumo social.',
    story:
      'Grindset 2 representa a area de edicao dentro do portfolio. O corte original foi otimizado para web e preserva a proposta principal: ritmo forte, leitura imediata e uma estetica direta para conteudo de impacto.',
    date: '2026',
    client: 'Video Editing',
    location: 'Portugal',
    category: 'Video / Edicao',
    filters: ['video'],
    highlights: [
      'Pacing rapido para short-form content',
      'Formato quadrado pronto para social',
      'Estudo de edicao com foco em impacto visual',
    ],
    images: grindsetMedia,
    hero: grindsetMedia[0],
  },
];
