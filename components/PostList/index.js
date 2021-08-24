import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'
import List, { ListItem } from '@components/List'
import { truncateString } from '@utils/text'
import { HoverImage, NewProjectStyles } from '@components/Projects'

const NewPostContainer = styled.div`
  a {
    ${NewProjectStyles}
    p {
      color: var(--grey600);
      @media screen and (max-width: ${designTokens.breakpoints[4]}) {
        font-size: ${designTokens.fontSizes[0]};
      }
    }
  }
`

const Content = styled.div`
  color: ${props => props.subtle ? 'var(--grey400)' : 'inherit'};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    padding-right: ${designTokens.space[7]};
  }
`

const NewContent = styled.div`
  flex: 1 1 0%;
`

const Label = styled.div`
  font-size: ${designTokens.fontSizes[0]};
  opacity: 50%;
  margin-bottom: ${designTokens.space[1]};
`

export default function PostList({ posts }) {
  if (posts === 'undefined') return null

  const getDate = (el) => {
    const date = new Date(el).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    return date
  }
  
  return (
    <>
      <div>
        {!posts && <div>No posts!</div>}
        <List>
          {
            posts && posts.map((post,i) => (
              <ListItem key={i}>
                <NewPostContainer>
                  <Link href={`/notes/${post.slug}`}>
                    <a>
                      <NewContent>
                        <Content>
                          <h4 style={{ marginTop: '0', marginBottom: designTokens.space[2]}}>
                            {post?.frontmatter?.title}
                          </h4>
                          <p style={{ marginBottom: designTokens.space[0] }}>
                            {truncateString(post.frontmatter.description, 72)}
                          </p>
                          <Label>{getDate(post.frontmatter.date)}</Label>
                        </Content>
                      </NewContent>
                      <HoverImage
                        src={post.frontmatter.hero_image}
                        alt={post.frontmatter?.title}
                      />
                    </a>
                  </Link>
                </NewPostContainer>
              </ListItem>
            ))
          }
        </List>
      </div>
    </>
  )
}