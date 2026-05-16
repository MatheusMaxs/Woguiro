const variantFiles = import.meta.glob<string>(
  '/assets/images-optimized/**/*.{webp,avif}',
  { eager: true, query: '?url', import: 'default' },
);

const videoVariantFiles = import.meta.glob<string>(
  '/assets/images-optimized/**/*.mp4',
  { eager: true, query: '?url', import: 'default' },
);

interface VariantData { webp: string; avif: string }
interface VideoVariants { '480p': string | undefined; '720p': string | undefined }

const slugSrcSetMap = new Map<string, VariantData>();
const videoSrcMap = new Map<string, VideoVariants>();

for (const [filePath, url] of Object.entries(variantFiles)) {
  const name = filePath.replace('/assets/images-optimized/', '');
  const ext = name.endsWith('.avif') ? 'avif' : 'webp';
  const noExt = name.replace(/\.(webp|avif)$/, '');
  const widthMatch = noExt.match(/-(\d+)w$/);
  if (!widthMatch) continue;
  const slug = noExt.slice(0, -(widthMatch[0].length));
  const width = widthMatch[1];
  if (!slugSrcSetMap.has(slug)) slugSrcSetMap.set(slug, { webp: '', avif: '' });
  const entry = slugSrcSetMap.get(slug)!;
  entry[ext] += (entry[ext] ? ', ' : '') + `${url} ${width}w`;
}

for (const [filePath, url] of Object.entries(videoVariantFiles)) {
  const name = filePath.replace('/assets/images-optimized/', '');
  const noExt = name.replace(/\.mp4$/, '');
  const resMatch = noExt.match(/-(\d+p)$/);
  const slug = resMatch ? noExt.slice(0, -(resMatch[0].length)) : noExt;
  if (!resMatch) continue;
  const resolution = resMatch[1] as '480p' | '720p';
  if (!videoSrcMap.has(slug)) videoSrcMap.set(slug, { '480p': undefined, '720p': undefined });
  const entry = videoSrcMap.get(slug)!;
  entry[resolution] = url;
}

export function getImageSrcSet(slug: string): VariantData | undefined {
  const data = slugSrcSetMap.get(slug);
  if (!data || (!data.webp && !data.avif)) return undefined;
  return { webp: data.webp || '', avif: data.avif || '' };
}

export function getVideoSources(slug: string): VideoVariants | undefined {
  return videoSrcMap.get(slug);
}
