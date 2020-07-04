import Layout from '@components/Layout/'
import PostList from '@components/PostList'
import getPosts from '@utils/getPosts'

const Notes = ({ posts, title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={`${title} | Notes`} description={description}>
        <h1>Notes</h1>
        <PostList posts={posts} />
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
