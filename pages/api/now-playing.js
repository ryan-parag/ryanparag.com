import { getNowPlaying } from '@utils/spotify';

export default async (_, res) => {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400 || response.status === 500) {
    return res.status(200).json({ isPlaying: false, playing: null });
  }

  const song = await response.json();

  if(song.context === null) {
    return res.status(200).json({ isPlaying: false, playing: 'podcast' });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title
    });
};