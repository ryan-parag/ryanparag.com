import Link from 'next/link'
import Layout from '@components/Layout/'
import PostList from '@components/PostList/'
import Logo from '@components/Logo'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

import getPosts from '@utils/getPosts'

const PostsLink = styled.span`
  a {
    padding: ${designTokens.space[2]} ${designTokens.space[3]};
    display: inline-flex;
    align-items:center;
    font-weight: 700;
    font-size: ${designTokens.fontSizes[1]};
    border-radius: ${designTokens.space[2]};
    border: 1px solid var(--grey200);
    background: linear-gradient(to top, var(--grey100), var(--grey0));
    box-shadow: 0px 1px 3px rgba(0,0,0,0.14);
    transition: all 120ms ease-out 0s;
    &:hover {
      border-color: var(--grey300);
      text-decoration: none;
    }
    &:focus {
      box-shadow: 0px 0px 0px ${designTokens.space[1]} var(--primaryTransparent);
    }
  }
`

const Index = ({ posts, title, description, ...props }) => {

  const sortedPosts = posts.slice().sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  const latestPosts = sortedPosts.slice(0, 3)

  return (
    <>
      <Layout pageTitle={title} description={description}>
        <div style={{ width: '64px'}}>
          <Logo/>
        </div>
        <h1>Ryan's Notes</h1>
        <p className="lead">
          Hello, I'm Ryan Parag - these are my notes about designing in the open and building thoughtful products. 
        </p>
        <p>
          ..also my playground for some expiremental UI ideas 🤔
        </p>
        <p>
          <Link href="/about">
            More about me
          </Link>
          <br/>
          <a href="https://ryanparag.com">
            View my portfolio
            <span className="icon">&rarr;</span>
          </a>
        </p>
        <main>
          <h3>Latest Notes</h3>
          <PostList posts={latestPosts} />
          <div
            style={{
              textAlign: 'center',
              padding: designTokens.space[3]
            }}
          >
            <PostsLink>
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
            </PostsLink>
          </div>
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
