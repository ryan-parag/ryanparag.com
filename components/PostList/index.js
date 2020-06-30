import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'
import { format } from 'timeago.js'

const ListItem = styled.li`
  background: var(--grey100);
  border: 1px solid var(--grey200);
  padding: ${designTokens.space[4]} ${designTokens.space[3]};
  border-radius: ${designTokens.space[1]};
  cursor: pointer;
  margin-bottom: ${designTokens.space[3]};
  transition: all 120ms ease-out 0s;
  &:hover {
    background: var(--grey200);
  }
`
const ListLink = styled(Link)`
  display: block;
`

export default function PostList({ posts }) {
  if (posts === 'undefined') return null

  return (
    <div>
      {!posts && <div>No posts!</div>}
      <ul style={{ listStyleType: 'none', padding: '0', margin: '0'}}>
        {posts &&
          posts.map((post) => {
            return (
              <ListItem key={post.slug}>
                <ListLink href={{ pathname: `/post/${post.slug}` }}>
                  <div>
                    <h4 style={{ marginTop: '0', marginBottom: designTokens.space[2]}}>
                      {post?.frontmatter?.title}
                    </h4>
                    <p style={{ marginBottom: designTokens.space[2] }}>{post?.frontmatter.description}</p>
                    <div>
                      <small>Updated {format(post.frontmatter.date)}</small>
                    </div>
                  </div>
                </ListLink>
              </ListItem>
            )
          })}
      </ul>
    </div>
  )
}
