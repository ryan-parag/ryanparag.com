import { SpotifyTrack, SpotifyCurrentlyPlaying } from '@components/Spotify'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import List, { ListItem } from '@components/List'

const Tracks = () => {
  const { data } = useSWR('/api/top-tracks', fetcher);

  if (!data) {
    return null;
  }

  return data.tracks.map((track, index) => (
    <ListItem key={index}>
      <SpotifyTrack track={track} mb={0} />
    </ListItem>
  ));
}


export const ListeningMusic = () => {
  return(
    <>
      <h3>Last Played</h3>
        <SpotifyCurrentlyPlaying/>
        <hr/>
        <h3>Recent Top Listens</h3>
        <List>
          <Tracks/>
        </List>
    </>
  )
}