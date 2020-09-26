import Layout from '@components/Layout/'
import PostList from '@components/PostList'
import getPosts from '@utils/getPosts'

const Notes = ({ posts, title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={`${title} | Notes`} description={description} ogImage="/notes-social-media.png">
        <h1>Notes</h1>
        <p>I wanted to begin designing in the open and sharing what/how I design digital products. These are my collection of notes and ideas - thanks for reading!</p>
        <PostList posts={posts} />
        <p>
          <small
            style={{
              color: 'var(--grey400)'
            }}
          >
            You've made it to the end
          </small>
        </p>
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
