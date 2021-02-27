import { SpotifyTrack, SpotifyPodcast } from '@components/Spotify'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import List, { ListItem } from '@components/List'
import { Box } from '@components/Box'
import { designTokens } from '@components/Theme/designTokens'

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

const ListeningTitle = ({title}) => {
  return(
    <p
      style={{
        color: 'var(--grey600)',
        fontSize: designTokens.fontSizes[1],
        marginBottom: designTokens.space[2]
      }}
    >
      {title}
    </p>
  )
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
      <ListeningTitle title={`Recent top tracks I've listened to:`}/>
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
      <ListeningTitle title={`Recent podcasts I've been digging:`}/>
      <List>
        <Subscriptions podcasts={data.podcasts}/>
      </List>
    </>
  )
}