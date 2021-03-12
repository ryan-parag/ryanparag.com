import Link from 'next/link'
import Layout, { Wrapper } from '@components/Layout/'
import PostList from '@components/PostList/'
import Logo from '@components/Logo'
import { designTokens } from '@components/Theme/designTokens'
import { ButtonLink, ButtonPrimaryAnchorTag } from '@components/Button'
import List from '@components/ProjectScroll/List'
import { SpotifyCurrentlyPlaying } from '@components/Spotify'
import Title from '@components/Title'
import Featured from '@components/Featured'
import Randomizer from '@components/Randomizer'
import FAQ from '@components/FAQ'
import { ArrowRight } from 'react-feather'

import getPosts from '@utils/getPosts'

const Index = ({ posts, title, description, ...props }) => {

  const sortedPosts = posts.slice().sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  const latestPosts = sortedPosts.slice(0, 5)

  return (
    <>
      <Layout pageTitle={title} description={description} ogImage="/notes-social-media.png">
        <Wrapper>
          <Title>
            <div style={{ width: '64px'}}>
              <Logo/>
            </div>
            <h1>Hey, I'm Ryan!</h1>
            <p className="lead">I'm a designer and <Randomizer/>.</p>
            <p><Link href="/about"><a className="link">More about me<span className="icon">&rarr;</span></a></Link></p>
          </Title>
        </Wrapper>
        <main>
          <List/>
          <Wrapper>
            <div
              style={{
                textAlign: 'center',
                padding: designTokens.space[3]
              }}
            >
              <p>More work coming soon, or <a className="link" href="mailto:hello@ryanparag.com?subject=Hey Ryan!">contact me</a> for a closer look</p>
              <ButtonLink>
                <Link href="/work/">
                  <a>
                    <img
                      src="/static/work-icon.svg"
                      width="32"
                      className="buttonIcon"
                    />
                    View more work
                  </a>
                </Link>
              </ButtonLink>
            </div>
            <hr/>
          </Wrapper>
          <Wrapper>
            <h3><Link href="/notes"><a>Recent Writing 📝</a></Link></h3>
            <PostList posts={latestPosts} />
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
                      className="buttonIcon"
                    />
                    Read more notes
                  </a>
                </Link>
              </ButtonLink>
            </div>
            <hr/>
          </Wrapper>
          <Wrapper>
            <h3><Link href="/listening/music"><a>Recent Listens 🎧</a></Link></h3>
            <SpotifyCurrentlyPlaying playing />
            <hr/>
          </Wrapper>
          <Wrapper>
            <h3>Featured 👨‍🏫</h3>
            <Featured/>
            <hr/>
          </Wrapper>
          <FAQ/>
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
