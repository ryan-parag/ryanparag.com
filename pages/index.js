import Link from 'next/link'
import Layout from '@components/Layout/'
import PostList from '@components/PostList/'

import getPosts from '@utils/getPosts'

const Index = ({ posts, title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={title} description={description}>
        <img src="/notes-logo.svg" alt="Ryan Parag" width="64" style={{ borderRadius: '8px' }}/> 
        <h1>Notes</h1>
        <p className="lead">Hello, I'm Ryan - these are my notes about designing in the open and building thoughtful products.</p>
        <p>
          <Link href="/about">More about me &rarr;</Link>
          <br/>
          <a href="https://ryanparag.com">View my portfolio &rarr;</a>
        </p>
        <main>
          <PostList posts={posts} />
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
  })(require.context('../posts', true, /\.md$/))

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
