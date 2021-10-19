import { getPlaylists } from '@utils/spotify'

export default async (_, res) => {
  const response = await getPlaylists();
  const { items } = await response.json();

  const playlists = items.filter(playlist => playlist.public).map((playlist) => ({
    playlistUrl: playlist.external_urls.spotify,
    title: playlist.name,
    description: playlist.description,
    collaborative: playlist.collaborative,
    playlistImageUrl: playlist.images[0].url,
    tracks: playlist.tracks.total
  }));

  playlists.sort(function(a, b) {
    const textA = a.title.toUpperCase();
    const textB = b.title.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ playlists });
};