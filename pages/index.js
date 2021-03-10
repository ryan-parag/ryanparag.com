import Link from 'next/link'
import Layout from '@components/Layout/'
import PostList from '@components/PostList/'
import Logo from '@components/Logo'
import { designTokens } from '@components/Theme/designTokens'
import { ButtonLink, ButtonPrimaryAnchorTag } from '@components/Button'
import Projects from '@components/Projects'
import Subscribe from '@components/Subscribe'
import { SpotifyCurrentlyPlaying } from '@components/Spotify'
import Title from '@components/Title'
import Featured from '@components/Featured'
import ContactBox from '@components/ContactBox'
import Randomizer from '@components/Randomizer'

import getPosts from '@utils/getPosts'

const Index = ({ posts, title, description, ...props }) => {

  const sortedPosts = posts.slice().sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  const latestPosts = sortedPosts.slice(0, 5)

  return (
    <>
      <Layout pageTitle={title} description={description} ogImage="/notes-social-media.png">
        <Title>
          <div style={{ width: '64px'}}>
            <Logo/>
          </div>
          <h1>Hey, I'm Ryan!</h1>
          <p className="lead">I'm a designer and <Randomizer/>.</p>
          <p><Link href="/about"><a className="link">More about me<span className="icon">&rarr;</span></a></Link></p>
        </Title>
        <main>
          <SpotifyCurrentlyPlaying playing />
          <hr/>
          <h3>Notes/Writing 📝</h3>
          <PostList posts={latestPosts} />
          <hr/>
          <h3>Other Projects 💯</h3>
          <Projects/>
          <div
            style={{
              textAlign: 'center',
              padding: designTokens.space[3]
            }}
          >
            <ButtonLink>
              <Link href="/notes/">
                <a>
                  <img
                    src="/static/note.svg"
                    width="32"
                    style={{
                      marginRight: designTokens.space[2],
                      transform: 'rotate(10deg) translateX(-4px)'
                    }}
                  />
                  Read more notes
                </a>
              </Link>
            </ButtonLink>
          </div>
          <h3>Featured 👨‍🏫</h3>
          <Featured/>
          <hr/>
          <ContactBox/>
          <Subscribe/>
        </main>
      </Layout>
    </>
  )
}

export default Index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const posts = ((context) => {
    return getPosts(context)
  })(require.context('../notes', true, /\.md$/))

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
