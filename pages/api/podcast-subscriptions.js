import { getTopTracks } from '@utils/spotify'

export default async (_, res) => {
  const response = await getTopTracks();
  const { items } = await response.json();

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ items });
};