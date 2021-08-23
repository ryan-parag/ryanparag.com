import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'
import List, { ListItem } from '@components/List'
import { truncateString } from '@utils/text'
import Image from 'next/image'
import { LoadingSpinner } from '@components/LoadingBox'

const NewImage = styled.div`
  width: ${designTokens.space[7]};
  height: ${designTokens.space[7]};
  border-radius: ${designTokens.space[1]};
  box-shadow: 0px 0px 0px 2px var(--grey200);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  right: ${designTokens.space[1]};
  top: 50%;
  transform: translateY(-50%) scale(1);
  transition: all 120ms ease-out 0ms;
  img {
    border-radius: ${designTokens.space[1]};
  }
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    width: ${designTokens.space[6]};
    height: ${designTokens.space[6]};
  }
`

const NewPostContainer = styled.div`
  a {
    display: flex;
    align-items: center;
    width: 100%;
    padding: ${designTokens.space[3]} 0;
    transition: all 120ms ease-out 0s;
    color: var(--grey900);
    position: relative;
    overflow: hidden;
    &:hover, &:focus {
      padding-left: ${designTokens.space[3]};
      text-decoration: none;
      box-shadow: inset 4px 0px 0px var(--primary);
      background: var(--grey100);
      ${NewImage} {
        transform: translateY(-50%) translateX(-${designTokens.space[6]}) rotate(10deg) scale(3);
        box-shadow: 0px 4px 8px -1px var(--grey300);
        @media screen and (max-width: ${designTokens.breakpoints[4]}) {
          transform: translateY(-50%) translateX(${designTokens.space[3]}) rotate(10deg) scale(1.5);
        }
      }
    }
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
                          <Label>{getDate(post.frontmatter.date)}</Label>
                          <h4 style={{ marginTop: '0', marginBottom: designTokens.space[2]}}>
                            {post?.frontmatter?.title}
                          </h4>
                          <p style={{ marginBottom: designTokens.space[2] }}>
                            {truncateString(post.frontmatter.description, 72)}
                          </p>
                        </Content>
                      </NewContent>
                      <NewImage>
                        <Image
                          src={post.frontmatter.hero_image}
                          layout="fill"
                          objectFit="cover"
                          alt={post.frontmatter?.title}
                        />
                      </NewImage>
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