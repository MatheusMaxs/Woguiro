const YOUTUBE_HANDLE = '@WodavLyrics';
const YOUTUBE_CHANNEL_ID = 'UC-ZkiwvMCbkw17MUaAxEQlw';
const YOUTUBE_ABOUT_URLS = [
  `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}/about?hl=en`,
  `https://www.youtube.com/${YOUTUBE_HANDLE}/about?hl=en`,
];
const CACHE_SECONDS = 12 * 60 * 60;
const STALE_SECONDS = 24 * 60 * 60;

const parseViewCount = (text) => {
  const normalized = text.replace(/\\u0026/g, '&').replace(/&quot;/g, '"');
  const match = normalized.match(/([\d,.]+)\s*(K|M|B)?\s+views/i);

  if (!match) {
    return null;
  }

  const base = Number(match[1].replace(/,/g, ''));

  if (!Number.isFinite(base)) {
    return null;
  }

  const multiplier = { K: 1_000, M: 1_000_000, B: 1_000_000_000 }[match[2]?.toUpperCase()] || 1;
  return Math.round(base * multiplier);
};

const extractViewCount = (html) => {
  const patterns = [
    /"viewCountText":"([^"]+)"/i,
    /"viewCountText":\{"simpleText":"([^"]+)"/i,
    /"viewCountText":\{"runs":\[\{"text":"([^"]+)"/i,
    /([\d,.]+\s*(?:K|M|B)?\s+views)/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    const viewCount = match ? parseViewCount(match[1]) : null;

    if (viewCount !== null) {
      return viewCount;
    }
  }

  return null;
};

const fetchChannelPage = async (url) => {
  const response = await fetch(url, {
    headers: {
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
    },
  });

  if (!response.ok) {
    throw new Error(`YouTube returned ${response.status}`);
  }

  return response.text();
};

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    for (const url of YOUTUBE_ABOUT_URLS) {
      const html = await fetchChannelPage(url);
      const viewCount = extractViewCount(html);

      if (Number.isFinite(viewCount)) {
        response.setHeader('Cache-Control', `s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${STALE_SECONDS}`);
        response.status(200).json({
          channel: YOUTUBE_HANDLE,
          channelId: YOUTUBE_CHANNEL_ID,
          source: url,
          updatedAt: new Date().toISOString(),
          viewCount,
        });
        return;
      }
    }

    response.status(502).json({ error: 'YouTube view count unavailable' });
  } catch {
    response.status(502).json({ error: 'Unable to fetch YouTube stats' });
  }
}
