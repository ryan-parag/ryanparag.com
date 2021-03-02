import { useRouter } from "next/router";
import Layout from '@components/Layout/'
import Title, { TitleIcon } from '@components/Title'
import { ListeningMusic, ListeningPodcasts} from '@components/Listening'
import TabNav from '@components/Listening/TabNav'
import { SpotifyCurrentlyPlaying } from '@components/Spotify'

const ListenType = ({title, description}) => {
  const router = useRouter();
  const { listenType } = router.query;

  const categories = ['Music', 'Podcasts']

  return (
    <>
      <Layout pageTitle={`${title} | Recent Listens`} description={description} ogImage="/listens-social-media.png">
        <Title>
          <TitleIcon>
            <img src="/static/projects/icon-listens.png" alt={'Recent Listens'}/>
          </TitleIcon>
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