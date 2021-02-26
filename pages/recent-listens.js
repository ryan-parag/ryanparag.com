import Layout from '@components/Layout/'
import { designTokens } from '@components/Theme/designTokens'
import { SpotifyTrack, SpotifyCurrentlyPlaying } from '@components/Spotify'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import styled from 'styled-components'
import { Box } from '@components/Box'
import Title from '@components/Title'
import List, { ListItem } from '@components/List'

const HeaderIcon = styled.div`
  width: ${designTokens.space[7]};
  position: relative;
  img {
    display: block; width: 100%;
  }
`


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

const RecentListens = ({ title, description, ...props }) => {


  return (
    <>
      <Layout pageTitle={`${title} | Top Tracks`} description={description} ogImage="/notes-social-media.png">
        <Title>
          <HeaderIcon>
            <img src="/spotify.svg"/>
          </HeaderIcon>
          <h1>Recent Listens</h1>
          <p className="lead">Take a peek at what I've been listening to!</p>
          <p>
            I'm planning to write about how and why I wanted to create this list, using <a className="link" href="https://leerob.io/blog/spotify-api-nextjs" target="_blank">Lee Robinson's</a> extremely helpful Spotify/Next.js tutorial.
          </p>
          <Box center bg={'var(--primaryTransparent)'}>
            <p style={{ marginBottom: '0', color: 'var(--primaryDark)' }}>
              Blog post and Podcast data coming soon 🎉
            </p>
          </Box>
        </Title>
        <h3>Last Played</h3>
        <SpotifyCurrentlyPlaying/>
        <hr/>
        <h3>Recent Top Listens</h3>
        <List>
          <Tracks/>
        </List>
      </Layout>
    </>
  )
}

export default RecentListens

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
