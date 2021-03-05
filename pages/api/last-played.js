import { getLastPlayed } from '@utils/spotify';

export default async (_, res) => {
  const response = await getLastPlayed();

  const { items } = await response.json();

  const lastPlayed = items[0];
  const title = lastPlayed.track.name;
  const artist = lastPlayed.track.artists.map((_artist) => _artist.name).join(', ');
  const album = lastPlayed.track.album.name;
  const albumImageUrl = lastPlayed.track.album.images[0].url;
  const songUrl = lastPlayed.track.external_urls.spotify;
  const played = lastPlayed.played_at;
  const explicit = lastPlayed.track.explicit;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({
    title,
    artist,
    album,
    albumImageUrl,
    songUrl,
    played,
    explicit
  });
};