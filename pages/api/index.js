import Layout from '@components/Layout/'
import Link from 'next/link'
import { designTokens } from '@components/Theme/designTokens'

const API = ({ title, description, ...props }) => {

  return (
    <>
      <Layout pageTitle={`${title} | RSS`} description={description} ogImage="/notes-social-media.png">
        <h1>API</h1>
        <p className="lead">Links to this site's data and API</p>
        <hr/>
        <h4>Spotify</h4>
        <ul>
          <li>
            <Link href="/api/last-played">
              <a>Last Played</a>
            </Link>
          </li>
          <li>
            <Link href="/api/now-playing">
              <a>Now Playing</a>
            </Link>
          </li>
          <li>
            <Link href="/api/top-tracks">
              <a>Top Tracks</a>
            </Link>
          </li>
        </ul>
      </Layout>
    </>
  )
}

export default API

export async function getStaticProps() {
  const configData = await import(`../../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
