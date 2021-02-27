import { useRouter } from "next/router";
import Layout from '@components/Layout/'
import { designTokens } from '@components/Theme/designTokens'
import Title from '@components/Title'
import styled from 'styled-components'
import { ListeningMusic, ListeningPodcasts} from '@components/Listening'
import { capitalize } from '@utils/text'
import TabNav from '@components/Listening/TabNav'
import { SpotifyCurrentlyPlaying } from '@components/Spotify'

const HeaderIcon = styled.div`
  width: ${designTokens.space[7]};
  position: relative;
  img {
    display: block; width: 100%;
  }
`

const ListenType = ({title, description}) => {
  const router = useRouter();
  const { listenType } = router.query;

  const categories = ['Music', 'Podcasts']

  return (
    <>
      <Layout pageTitle={title} description={description} ogImage="/worksheets-social-media.png">
        <Title>
          <HeaderIcon>
            <img src="/listens.svg"/>
          </HeaderIcon>
          <h1>Recent Listens</h1>
          <p className="lead">Take a peek at what I've been listening to!</p>
          <p>
            I'm planning to write about how and why I wanted to create this list, using <a className="link" href="https://leerob.io/blog/spotify-api-nextjs" target="_blank">Lee Robinson's</a> extremely helpful Spotify/Next.js tutorial.
          </p>
          <SpotifyCurrentlyPlaying playing/>
        </Title>
        <TabNav
          items={categories}
          active={listenType}
        />
        {
          listenType === 'music' ? (
            <ListeningMusic/>
          )
          :
          (
            <ListeningPodcasts/>
          )
        }
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const categories = ['music', 'podcasts']
  const paths = categories.map((listenType) => ({
    params: { listenType }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params: {listenType} }) {
  const configData = await import('../../siteconfig.json')

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}


export default ListenType;