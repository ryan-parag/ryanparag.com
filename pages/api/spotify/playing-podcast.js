import { getPodcastPlaying } from '@utils/spotify';

export default async (_, res) => {
  const response = await getPodcastPlaying();

  if (response.status === 204 || response.status > 400 || response.status === 500) {
    return res.status(200).json({ currently_playing: { isPlaying: false, playing: null } });
  }

  const playing = await response.json();

  const currently_playing = {
    isPlaying: true,
    playing: playing.currently_playing_type === 'episode' ? 'episode' : 'track',
    episodeTitle: playing.currently_playing_type === 'episode' ? playing.item.name : null,
    episodeDescription: playing.currently_playing_type === 'episode' ? playing.item.description : null,
    podcastName: playing.currently_playing_type === 'episode' ? playing.item.show.name : null,
    publisher: playing.currently_playing_type === 'episode' ? playing.item.show.publisher : null,
    podcastImgUrl: playing.currently_playing_type === 'episode' ? playing.item.show.images[0].url : null,
    podcastUrl: playing.currently_playing_type === 'episode' ? playing.item.external_urls.spotify : null,
    explicit: playing.currently_playing_type === 'episode' ? playing.item.explicit : null
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({
    currently_playing
    });
};