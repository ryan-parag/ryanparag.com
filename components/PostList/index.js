import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'
import { format } from 'timeago.js'
import { BoxBaseLink } from '@components/Box'
import { DefaultChip } from '@components/Chip'

const ListItem = styled.li`
  a {
    ${BoxBaseLink}
  }
`

const PostContainer = styled.div`
  display: flex;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    flex-direction: column;
  }
`

const ContentContainer = styled.div`
  flex: 1 1 0%;
`

const PostHero = styled.div`
  width: ${designTokens.space[7]};
  height: ${designTokens.space[7]};
  margin-right: ${designTokens.space[3]};
  border-radius: 50%;
  border: 2px solid var(--grey0);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => props.bg});
  box-shadow: 0px 2px 4px rgba(0,0,0, 0.12);
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    margin-bottom: ${designTokens.space[3]};
  }
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
                <Link href={ `/notes/${post.slug}` }>
                  <a>
                    <PostContainer>
                      <PostHero
                        bg={post.frontmatter.hero_image}
                      />
                      <ContentContainer>
                        <h4 style={{ marginTop: '0', marginBottom: designTokens.space[2]}}>
                          {post?.frontmatter?.title}
                        </h4>
                        <p style={{ marginBottom: designTokens.space[2] }}>{post.frontmatter.description}</p>
                        <div
                          style={{ lineHeight: designTokens.lineHeights.bigHeading }}
                        >
                          <DefaultChip>
                            Updated {format(post.frontmatter.date)}
                          </DefaultChip>
                        </div>
                      </ContentContainer>
                    </PostContainer>
                  </a>
                </Link>
              </ListItem>
            )
          })}
      </ul>
    </div>
  )
}
