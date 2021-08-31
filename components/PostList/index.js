import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'
import List, { ListItem } from '@components/List'
import { truncateString } from '@utils/text'
import { HoverImage, NewProjectStyles } from '@components/Projects'
import { Label, Body, ItemTitle} from '@components/Typography'

const NewPostContainer = styled.div`
  a {
    ${NewProjectStyles}
    p {
      color: var(--grey600);
      @media screen and (max-width: ${designTokens.breakpoints[4]}) {
        font-size: ${designTokens.sizing._sm};
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
                          <ItemTitle>
                            {post?.frontmatter?.title}
                          </ItemTitle>
                          <Body>
                            {truncateString(post.frontmatter.description, 72)}
                          </Body>
                          <Label mt={2}>{getDate(post.frontmatter.date)}</Label>
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