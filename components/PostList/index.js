import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'
import { format } from 'timeago.js'

const ListItem = styled.li`
  a {
    display: block;
    background: var(--grey100);
    border: 1px solid var(--grey200);
    padding: ${designTokens.space[4]} ${designTokens.space[3]};
    border-radius: ${designTokens.space[1]};
    cursor: pointer;
    margin-bottom: ${designTokens.space[3]};
    box-shadow: none;
    transition: all 120ms ease-out 0s;
    &:hover, &:focus {
      background: var(--grey200);
      text-decoration: none;
      transform: scale(1.03);
      box-shadow: 0px 1px 2px var(--grey200), 0px 4px 8px var(--grey100), 0px 8px 16px var(--grey100);
    }
  }
`
const ListLink = styled(Link)`
  display: block;
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
                <ListLink href={ `/notes/${post.slug}` }>
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
                </ListLink>
              </ListItem>
            )
          })}
      </ul>
    </div>
  )
}
