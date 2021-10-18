import { getPodcastPlaying } from '@utils/spotify';

export default async (_, res) => {
  const response = await getPodcastPlaying();

  const podcast = await response.json();

  if (response.status === 204 || response.status > 400 || response.status === 500) {
    return res.status(200).json({ isPlaying: false, playing: null });
  }

  if(podcast.currently_playing_type !== 'episode') {
    return res.status(200).json({ isPlaying: false, playing: 'track' });
  }

  const isPlaying = podcast.is_playing;
  const episodeTitle = podcast.item.name;
  const episodeDescription = podcast.item.description;
  const podcastName = podcast.item.show.name;
  const publisher = podcast.item.show.publisher;
  const podcastImgUrl = podcast.item.show.images[0].url;
  const podcastUrl = podcast.item.external_urls.spotify;
  const explicit = podcast.item.explicit;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({
    isPlaying,
    episodeTitle,
    episodeDescription,
    podcastName,
    publisher,
    podcastImgUrl,
    podcastUrl,
    explicit
  });
};