import { getPlayer } from '@utils/spotify';

export default async (_, res) => {
  const response = await getPlayer();

  if (response.status === 204 || response.status > 400 || response.status === 500) {
    return res.status(200).json({ isPlaying: false });
  }

  const playing = await response.json();

  if(playing.currently_playing_type === "episode") {
    return res.status(200).json({ playing });
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({
    playing
    });
};