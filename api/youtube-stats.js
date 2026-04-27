const YOUTUBE_HANDLE = '@WodavLyrics';
const YOUTUBE_CHANNEL_ID = 'UC-ZkiwvMCbkw17MUaAxEQlw';
const CACHE_SECONDS = 12 * 60 * 60;
const STALE_SECONDS = 24 * 60 * 60;

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    response.setHeader('Cache-Control', 's-maxage=60');
    response.status(503).json({ error: 'Missing YOUTUBE_API_KEY' });
    return;
  }

  const youtubeUrl = new URL('https://www.googleapis.com/youtube/v3/channels');
  youtubeUrl.searchParams.set('part', 'statistics');
  youtubeUrl.searchParams.set('id', YOUTUBE_CHANNEL_ID);
  youtubeUrl.searchParams.set('key', apiKey);

  try {
    const youtubeResponse = await fetch(youtubeUrl, {
      headers: { Accept: 'application/json' },
    });
    const payload = await youtubeResponse.json();

    if (!youtubeResponse.ok) {
      response.status(youtubeResponse.status).json({ error: payload?.error?.message || 'YouTube request failed' });
      return;
    }

    const viewCount = Number(payload?.items?.[0]?.statistics?.viewCount);

    if (!Number.isFinite(viewCount)) {
      response.status(502).json({ error: 'YouTube view count unavailable' });
      return;
    }

    response.setHeader('Cache-Control', `s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${STALE_SECONDS}`);
    response.status(200).json({
      channel: YOUTUBE_HANDLE,
      channelId: YOUTUBE_CHANNEL_ID,
      updatedAt: new Date().toISOString(),
      viewCount,
    });
  } catch {
    response.status(502).json({ error: 'Unable to fetch YouTube stats' });
  }
}
