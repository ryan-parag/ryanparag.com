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
import { WorkList } from '@components/Projects'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Typography from '@components/Typography'

const Index = ({ posts, work, title, description, ...props }) => {

  const sortedPosts = posts.slice().sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  const latestPosts = sortedPosts.slice(0, 5)

  const sortedWork = work.slice().sort((a, b) => new Date(b.frontmatter.startDate) - new Date(a.frontmatter.startDate))

  return (
    <>
      <Layout pageTitle={title} description={description} ogImage="/social-media.png">
        <Wrapper>
          <Title>
            <div style={{ width: '64px'}}>
              <Logo/>
            </div>
            <Typography variant={'h1'}>Hey, I'm Ryan!</Typography>
            <Typography variant={'lead'}>I'm a designer and <Randomizer/>.</Typography>
            <Typography>
              <Link href="/about">
                <a className="link">
                  More about me
                  <ArrowRight size={'20'} className="icon" style={{ top: designTokens.space[1] }}/>
                </a>
              </Link>
            </Typography>
          </Title>
        </Wrapper>
        <main>
          <Wrapper>
            <Typography variant={'h3'}><Link href="/work"><a>Selected Work 💼</a></Link></Typography>
            <WorkList work={sortedWork}/>
            <Typography>
              <Link href="/work">
                <a className="link">
                  View more work
                  <ArrowRight size={'20'} className="icon" style={{ top: designTokens.space[1] }}/>
                </a>
              </Link>
            </Typography>
            <hr/>
          </Wrapper>
          <Wrapper>
            <Typography variant={'h3'}>
              <Link href="/notes"><a>Recent Writing 📝</a></Link>
            </Typography>
            <PostList posts={latestPosts} />
            <Typography>
              <Link href="/notes">
                <a className="link">
                  Read more notes
                  <ArrowRight size={'20'} className="icon" style={{ top: designTokens.space[1] }}/>
                </a>
              </Link>
            </Typography>
            <hr/>
          </Wrapper>
          <Wrapper>
            <Typography variant={'h3'}>
              <Link href="/listening/music"><a>Recent Listens 🎧</a></Link>
            </Typography>
            <SpotifyCurrentlyPlaying playing />
            <hr/>
          </Wrapper>
          <Wrapper>
            <Typography variant={'h3'}>Featured 👨‍🏫</Typography>
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

  const files = fs.readdirSync(path.join('notes'))

  const posts = files.map(filename => {
    const slug = filename.replace('.md','')
    const markdownWithMeta = fs.readFileSync(path.join('notes', filename), 'utf-8')
    const {data:frontmatter} = matter(markdownWithMeta)
    return {
      slug,
      frontmatter
    }
  })

  const filesWork = fs.readdirSync(path.join('projects'))

  const work = filesWork.map(filename => {
    const slug = filename.replace('.md','')
    const markdownWithMeta = fs.readFileSync(path.join('projects', filename), 'utf-8')
    const {data:frontmatter} = matter(markdownWithMeta)
    return {
      slug,
      frontmatter
    }
  })


  return {
    props: {
      posts,
      work,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
