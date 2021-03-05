import { getLastPlayed } from '@utils/spotify';

export default async (_, res) => {
  const response = await getLastPlayed();

  const { items } = await response.json();

  const tracks = items.slice(0, 10).map((item) => ({
    artist: item.track.artists.map((_artist) => _artist.name).join(', '),
    songUrl: item.track.external_urls.spotify,
    title: item.track.name,
    albumImageUrl: item.track.album.images[0].url,
    played: item.played_at,
    explicit: item.track.explicit
  }));

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({ tracks });
};