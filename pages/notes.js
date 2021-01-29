import Layout from '@components/Layout/'
import PostList from '@components/PostList'
import getPosts from '@utils/getPosts'
import Subscribe from '@components/Subscribe'

const Notes = ({ posts, title, description, ...props }) => {

  const sortedPosts = posts.slice().sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))

  return (
    <>
      <Layout pageTitle={`${title} | Notes`} description={description} ogImage="/notes-social-media.png">
        <h1>Notes</h1>
        <p className="lead">Designing in the open and sharing what/how I design digital products + other intersting things.</p>
        <p>These are my collection of notes and ideas - thanks for reading!</p>
        <hr/>
        <PostList posts={sortedPosts} />
        <p>
          <small
            style={{
              color: 'var(--grey400)'
            }}
          >
            You've made it to the end
          </small>
        </p>
        <hr/>
        <Subscribe/>
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

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
