import Link from 'next/link'
import styled from 'styled-components'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '@components/CodeBlock'
import { format } from 'timeago.js'
import { designTokens } from '@components/Theme/designTokens'
import ContactForm from '@components/ContactForm'
import ImgZoom from '@components/ImgZoom'
import { Button, ButtonLink } from '@components/Button'
import ContactBox from '@components/ContactBox'
import Subscribe from '@components/Subscribe'
import Chip from '@components/Chip'

import Layout from '@components/Layout'
import getSlugs from '@utils/getSlugs'

const ScrolledButton = styled(Button)`
  position: fixed;
  bottom: ${designTokens.space[3]};
  right: ${designTokens.space[3]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    display: none;
  }
`

const LinkContainer = styled.div`
  padding: ${designTokens.space[6]} 0 0;
  display: flex;
  justify-content: center;
`

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>
  const scrollToTop = () => {
    if(process.browser) {
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });
    }
  }

  return (
    <>
      <Layout pageTitle={`${frontmatter.title} | ${siteTitle}`} description={frontmatter.description} ogImage={frontmatter.hero_image}>
        <div style={{ marginBottom: designTokens.space[6]}}>
          <ButtonLink>
            <Link href="/notes">
              <a>←{' '}Back to Notes</a>
            </Link>
          </ButtonLink>
        </div>
        <article>
          <h2>{frontmatter.title}</h2>
          <div
            style={{
              marginBottom: designTokens.space[3]
            }}
          >
            <Chip>
              Updated {format(frontmatter.date)}
            </Chip>
          </div>
          {frontmatter.hero_image && (
            <img
              src={frontmatter.hero_image}
              style={{
                marginBottom: designTokens.space[3],
                display: 'block',
                width: '100%'
              }}
              alt={frontmatter.title}
            />
          )}
          <div>
            <ReactMarkdown
              source={markdownBody}
              renderers={{
                code: CodeBlock,
                image: ImgZoom
              }}
            />
          </div>
        </article>
        <hr/>
        <ContactBox/>
        <ContactForm/>
        <LinkContainer>
          <ButtonLink>
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
          </ButtonLink>
        </LinkContainer>
        <hr/>
        <Subscribe/>
        <ScrolledButton
          onClick={() => scrollToTop()}
        >
          Scroll to Top
        </ScrolledButton>
      </Layout>
    </>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params

  const content = await import(`../../notes/${postname}.md`)
  const config = await import(`../../siteconfig.json`)
  const data = matter(content.default)

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}

export async function getStaticPaths() {
  const blogSlugs = ((context) => {
    return getSlugs(context)
  })(require.context('../../notes', true, /\.md$/))

  const paths = blogSlugs.map((slug) => `/notes/${slug}`)

  return {
    paths, // An array of path names, and any params
    fallback: false, // so that 404s properly appear if something's not matching
  }
}