import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'

const ListItem = styled.li`
  background: ${({ theme }) => theme.grey100};
  padding: ${designTokens.space[4]} ${designTokens.space[3]};
  border-radius: ${designTokens.space[1]};
  cursor: pointer;
  margin-bottom: ${designTokens.space[3]};
  transition: all 120ms ease-out 0s;
  &:hover {
    background: ${({ theme }) => theme.grey200};
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
                      <small>{post.frontmatter.date}: {` `}</small>
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
