import { SpotifyTrack, SpotifyPodcast } from '@components/Spotify'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import List, { ListItem } from '@components/List'
import { Box } from '@components/Box'

const Tracks = ({tracks}) => {

  return tracks.map((track, index) => (
    <ListItem key={index}>
      <SpotifyTrack track={track} mb={0} />
    </ListItem>
  ));
}

const Subscriptions = ({podcasts}) => {

  return podcasts.map((podcast, index) => (
    <ListItem key={index}>
      <SpotifyPodcast podcast={podcast} mb={0} />
    </ListItem>
  ));
}


export const ListeningMusic = () => {

  const { data } = useSWR('/api/top-tracks', fetcher);

  if (!data) {
    return (
      <Box center>
        Something went wrong
      </Box>
    )
  }

  return(
    <>
      <h3>Recent Top Listens</h3>
      <List>
        <Tracks tracks={data.tracks}/>
      </List>
    </>
  )
}

export const ListeningPodcasts = () => {

  const { data } = useSWR('/api/podcast-subscriptions', fetcher);

  if (!data) {
    return (
      <Box center>
        Something went wrong
      </Box>
    )
  }
  return(
    <>
      <h3>Podcast Subscriptions</h3>
      <List>
        <Subscriptions podcasts={data.podcasts}/>
      </List>
    </>
  )
}