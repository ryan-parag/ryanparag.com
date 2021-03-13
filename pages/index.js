import Link from 'next/link'
import Layout, { Wrapper } from '@components/Layout/'
import PostList from '@components/PostList/'
import Logo from '@components/Logo'
import { designTokens } from '@components/Theme/designTokens'
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
            <p className="lead">I'm a designer and <Randomizer/>. Currently, designing early-phase products at <Link href="work"><a>Masonite</a></Link>, based in Tampa, FL.</p>
            <p>
              <Link href="/about">
                <a className="link">
                  More about me
                  <ArrowRight size={'20'} className="icon" style={{ top: designTokens.space[1] }}/>
                </a>
              </Link>
            </p>
          </Title>
        </Wrapper>
        <main>
          <Wrapper>
            <h3><Link href="/notes"><a>Recent Writing 📝</a></Link></h3>
            <PostList posts={latestPosts} />
            <p>
              <Link href="/notes">
                <a className="link">
                  Read more notes
                  <ArrowRight size={'20'} className="icon" style={{ top: designTokens.space[1] }}/>
                </a>
              </Link>
            </p>
            <hr/>
          </Wrapper>
          <Wrapper>
            <h3><Link href="/work"><a>Selected Work 💼</a></Link></h3>
            <p>I'm in the process of moving over my work to this site, but before that happens:</p>
            <ul>
              <li>find my work <a className="link" href="https://work.ryanparag.com">here</a> for now</li>
              <li><a className="link" href="mailto:hello@ryanparag.com?subject=Hey Ryan!">contact me</a> for a closer look</li>
            </ul>
            <br/>
            <p>
              <Link href="/work">
                <a className="link">
                  View more work
                  <ArrowRight size={'20'} className="icon" style={{ top: designTokens.space[1] }}/>
                </a>
              </Link>
            </p>
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
