import { getNowPlaying } from '@utils/spotify';

export default async (_, res) => {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400 || response.status === 500) {
    return res.status(200).json({ currently_playing: { isPlaying: false, playing: null } });
  }

  const playing = await response.json();

  const currently_playing = {
    isPlaying: true,
    playing: playing.currently_playing_type === 'track' ? 'track' : 'episode',
    title: playing.currently_playing_type === 'track' ? playing.item.name : '',
    artist: playing.currently_playing_type === 'track' ?  playing.item.artists.map((_artist) => _artist.name).join(', ') : '',
    album: playing.currently_playing_type === 'track' ? playing.item.album.name : '',
    albumImageUrl: playing.currently_playing_type === 'track' ? playing.item.album.images[0].url : '',
    songUrl: playing.currently_playing_type === 'track' ? playing.item.external_urls.spotify : '',
    explicit: playing.currently_playing_type === 'track' ? playing.item.explicit : ''
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({
    currently_playing
    });
};