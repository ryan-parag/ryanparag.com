import { getLastPlayedPodcast } from '@utils/spotify';

export default async (_, res) => {
  const response = await getLastPlayedPodcast();

  const { items } = await response.json();

  const lastPlayed = items[0];

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({
    lastPlayed
  });
};