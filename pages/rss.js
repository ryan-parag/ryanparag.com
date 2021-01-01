import Layout from '@components/Layout/'
import { addPosts } from '@utils/rss'
import Link from 'next/link'
import getPosts from '@utils/getPosts'
import fs from 'fs'
import { ButtonLink } from '@components/Button'
import { ProjectItem } from '@components/Projects'

const Notes = ({ posts, title, description, ...props }) => {

  const feed = addPosts(posts)

  const handleClick = () => {
    console.log(feed)
  }

  const netNewsWire = {
    name: 'NetNewsWire',
    description: 'NetNewsWire is a free and open source RSS reader for Mac, iPhone, and iPad.',
    image: '/static/nnw_icon_256.png',
    link:'https://ranchero.com/netnewswire/',
    outbound: true
  }

  return (
    <>
      <Layout pageTitle={`${title} | RSS`} description={description} ogImage="/notes-social-media.png">
        <h1>Follow with RSS</h1>
        <p className="lead">Want to follow through an RSS feed? Copy the XML link and subscribe in your RSS reader.</p>
        <ButtonLink>
          <Link href="/feed/feed.xml">
            <a>Subscribe to the feed</a>
          </Link>
        </ButtonLink>
        <hr/>
        <p>Need an RSS reader? Here's what I use:</p>
        <ProjectItem project={netNewsWire}/>
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
