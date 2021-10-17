import { useRouter } from "next/router";
import Layout, { Wrapper } from '@components/Layout/'
import Title from '@components/Title'
import { ListeningMusic, ListeningPodcasts, ListeningPlaylists} from '@components/Listening'
import TabNav from '@components/Listening/TabNav'
import { SpotifyCurrentlyPlaying } from '@components/Spotify'
import { ButtonAnchorTag } from '@components/Button'
import { designTokens } from '@components/Theme/designTokens'
import { ListensIcon } from '@components/Logo'
import Link from 'next/link'
import Card from '@components/Card'

const ListenType = ({title, description}) => {
  const router = useRouter();
  const { listenType } = router.query;

  const categories = ['Music', 'Podcasts', 'Playlists']

  const displayContent = (type) => {
    switch (type) {
      case 'music':
        return <ListeningMusic/>
        break;
      case 'podcasts':
        return <ListeningPodcasts/>
        break;
      case 'playlists':
        return <ListeningPlaylists/>
        break;
      default:
        return null
    }
  }

  return (
    <>
      <Layout pageTitle={`${title} | Recent Listens`} description={description} ogImage="/listens-social-media.png">
        <Wrapper>
          <Title>
            <div style={{ width: '64px', marginBottom: designTokens.space[4] }}>
              <ListensIcon/>
            </div>
            <Link href="/work">
              <a className="link">←{' '}Projects</a>
            </Link>
            <h1>Recent Listens</h1>
            <p className="lead">Take a peek at what I've been listening to!</p>
            <SpotifyCurrentlyPlaying playing/>
          </Title>
          <TabNav
            items={categories}
            active={listenType}
          />
          {displayContent(listenType)}
          <hr/>
          <Card>
            <h5 style={{ marginTop: 0 }}>About</h5>
            <p>
              I <Link href="/notes/showing-my-listening-activity"><a className="link">wrote</a></Link> about how and why I wanted to create this list, using <a className="link" href="https://leerob.io/blog/spotify-api-nextjs" target="_blank">Lee Robinson's</a> extremely helpful Spotify/Next.js tutorial.
            </p>
            <div
              style={{
                paddingTop: designTokens.space[4]
              }}
            >
              <ButtonAnchorTag href={`mailto:hello@ryanparag.com?Subject=I have ${listenType === 'music' || listenType === 'playlists' ? 'dope music' : 'a podcast rec'}`}>
                <img
                  src="/static/email.svg"
                  width="32"
                  className="buttonIcon"
                />
                Have a recommendation?
              </ButtonAnchorTag>
            </div>
          </Card>
        </Wrapper>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const categories = ['music', 'podcasts', 'playlists']
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