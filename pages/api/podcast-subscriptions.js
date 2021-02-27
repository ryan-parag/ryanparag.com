import { getShows } from '@utils/spotify'

export default async (_, res) => {
  const response = await getShows();
  const { items } = await response.json();

  const podcasts = items.map((podcast) => ({
    name: podcast.show.name,
    description: podcast.show.description,
    showUrl: podcast.show.external_urls.spotify,
    publisher: podcast.show.publisher,
    showImageUrl: podcast.show.images[0].url
  }));

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ podcasts });
};