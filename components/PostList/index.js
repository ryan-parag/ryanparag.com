import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'
import { format } from 'timeago.js'
import { BoxBaseLink } from '@components/Box'

const ListItem = styled.li`
  a {
    ${BoxBaseLink}
  }
`

export default function PostList({ posts }) {
  if (posts === 'undefined') return null

  const sortedPosts = posts.slice().sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))

  return (
    <div>
      {!posts && <div>No posts!</div>}
      <ul style={{ listStyleType: 'none', padding: '0', margin: '0'}}>
        {sortedPosts &&
          sortedPosts.map((post) => {
            return (
              <ListItem key={post.slug}>
                <Link href={ `/notes/${post.slug}` }>
                  <a>
                    <div>
                      <h3 style={{ marginTop: '0', marginBottom: designTokens.space[2]}}>
                        {post?.frontmatter?.title}
                      </h3>
                      <p style={{ marginBottom: designTokens.space[2] }}>{post.frontmatter.description}</p>
                      <div
                        style={{
                          color: 'var(--primaryDark)',
                          
                        }}
                      >
                        <small>
                          Updated {format(post.frontmatter.date)}
                        </small>
                      </div>
                    </div>
                  </a>
                </Link>
              </ListItem>
            )
          })}
      </ul>
    </div>
  )
}
