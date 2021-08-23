import Link from 'next/link'
import styled from 'styled-components'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import { designTokens } from '@components/Theme/designTokens'
import ContactForm from '@components/ContactForm'
import ImgZoom from '@components/ImgZoom'
import { Button, ButtonLink } from '@components/Button'
import FAQ from '@components/FAQ'
import Chip from '@components/Chip'
import 'react-medium-image-zoom/dist/styles.css'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypePrism from 'rehype-prism-plus'
import Layout, { Wrapper } from '@components/Layout'
import getSlugs from '@utils/getSlugs'
import Image from 'next/image'

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

const HeroImage = styled.div`
  width: 100%;
  position: relative;
  height: 412px;
  margin-bottom: ${designTokens.space[4]};
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

  const date = new Date(frontmatter.date).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <Layout pageTitle={`${frontmatter.title} | ${siteTitle}`} description={frontmatter.description} ogImage={frontmatter.hero_image}>
        <Wrapper>
          <div style={{ marginBottom: designTokens.space[6]}}>
            <ButtonLink>
              <Link href="/notes">
                <a>←{' '}Back to Notes</a>
              </Link>
            </ButtonLink>
          </div>
          <article>
            <Chip ghost>
                {date}
            </Chip>
            <h1>{frontmatter.title}</h1>
            {frontmatter.hero_image && (
              <HeroImage>
                <Image
                  src={frontmatter.hero_image}
                  layout={'fill'}
                  priority
                  alt={frontmatter.title}
                  objectFit={'cover'}
                  blur
                />
              </HeroImage>
            )}
            <div>
              <ReactMarkdown
                children={markdownBody}
                components={{
                  img: ImgZoom
                }}
                rehypePlugins={[
                  rehypeSlug,
                  [
                    rehypeAutolinkHeadings,
                    {
                      properties: {
                        className: ['anchor']
                      }
                    }
                  ],
                  rehypePrism
                ]}
              />
            </div>
          </article>
          <hr/>
          <ContactForm/>
          <LinkContainer>
            <ButtonLink>
              <Link href="/notes/">
                <a>
                  <img
                    src="/static/note.svg"
                    width="32"
                    className="buttonIcon"
                  />
                  Read more notes
                </a>
              </Link>
            </ButtonLink>
          </LinkContainer>
          <hr/>
        </Wrapper>
        <FAQ/>
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