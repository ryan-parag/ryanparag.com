import { getPodcastPlaying } from '@utils/spotify';

export default async (_, res) => {
  const response = await getPodcastPlaying();

  if (response.status === 204 || response.status > 400 || response.status === 500) {
    return res.status(200).json({ isPlaying: false });
  }

  const podcast = await response.json();
  const isPlaying = podcast.is_playing;
  const episodeTitle = podcast.item.name;
  const episodeDescription = podcast.item.description;
  const podcastName = podcast.item.show.name;
  const publisher = podcast.item.show.publisher;
  const podcastImgUrl = podcast.item.show.images[0].url;
  const podcastUrl = podcast.item.external_urls.spotify;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({
    isPlaying,
    publisher,
    podcastName,
    episodeTitle,
    episodeDescription,
    podcastImgUrl,
    podcastUrl
  });
};