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
          <h1>Ryan's Notes</h1>
          <p className="lead">
            Hey, I'm Ryan and these are my notes about designing in the open and building thoughtful products. 
          </p>
          <p style={{ color: 'var(--grey600)'}}>
            I'm a designer currently based in Tampa and this is my playground for a few expiremental UI ideas 🤔.
          </p>
          <div style={{ marginBottom: designTokens.space[3]} }>
            <ButtonLink
              marginRight={designTokens.space[3]}
            >
              <Link href="/about">
                More about me
              </Link>
            </ButtonLink>
            <ButtonPrimaryAnchorTag href="https://ryanparag.com">
              View my portfolio
              <span className="icon">&rarr;</span>
            </ButtonPrimaryAnchorTag>
          </div>
        </Title>
        <SpotifyCurrentlyPlaying playing />
        <hr/>
        <main>
          <h3>Latest Notes 📝</h3>
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
          <h3>Work & Projects 💯</h3>
          <Projects/>
          <hr/>
          <h3>Featured 👨‍🏫</h3>
          <Featured/>
          <hr/>
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
