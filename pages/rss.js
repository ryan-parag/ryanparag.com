import Layout, { Wrapper } from '@components/Layout/'
import { addPosts } from '@utils/rss'
import Link from 'next/link'
import getPosts from '@utils/getPosts'
import fs from 'fs'
import { ButtonLink } from '@components/Button'
import { WorkItem } from '@components/Projects'
import Subscribe from '@components/Subscribe'
import { designTokens } from '@components/Theme/designTokens'
import Title from '@components/Title'

const Notes = ({ posts, title, description, ...props }) => {

  const netNewsWire = {
    name: 'NetNewsWire',
    description: 'NetNewsWire is a free and open source RSS reader for Mac, iPhone, and iPad.',
    image: '/static/icon-nnw.png',
    link:'https://ranchero.com/netnewswire/',
    outbound: true
  }

  return (
    <>
      <Layout pageTitle={`${title} | RSS`} description={description} ogImage="/social-media.png">
        <Wrapper>
          <Title>
            <h1>Follow with RSS</h1>
            <p className="lead">Want to follow through an RSS feed? Copy the XML link and subscribe in your RSS reader.</p>
            <ButtonLink>
              <Link href="/feed/feed.xml">
                <a>
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
                  <span style={{ marginLeft: designTokens.space[2] }}>Subscribe to the feed</span>
                </a>
              </Link>
            </ButtonLink>
          </Title>
          <Subscribe/>
          <p>Need an RSS reader? Here's what I use:</p>
          <WorkItem project={netNewsWire}/>
        </Wrapper>
      </Layout>
    </>
  )
}

export default Notes

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const posts = ((context) => {
    return getPosts(context)
  })(require.context('../notes', true, /\.md$/))

  fs.mkdirSync('./public/feed', { recursive: true });
  fs.writeFileSync('./public/feed/feed.xml', addPosts(posts));

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
