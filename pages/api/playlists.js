import { getPlaylists } from '@utils/spotify'
import { Filter } from 'react-feather';

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

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ playlists });
};