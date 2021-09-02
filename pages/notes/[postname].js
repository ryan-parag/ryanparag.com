import React, { useState, useEffect } from 'react'
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
import { Copy, Check } from 'react-feather'
import { useRouter } from 'next/router'

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
  height: calc(${designTokens.space[9]} * 2.5);
  margin-bottom: ${designTokens.space[4]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    height: calc(${designTokens.space[9]} + ${designTokens.space[5]});
  }
`

const BlankButton = styled.button`
 padding: ${designTokens.space[1]} ${designTokens.space[2]};
 border-radius: 999px;
 background: transparent;
 border:0;
 font-size: ${designTokens.sizing._xs};
 display: inline-flex;
 color: var(--grey700);
 align-items: center;
 cursor: pointer;
 line-height: 1;
 &:hover, &:focus {
   box-shadow: 0px 0px 0px 1px var(--grey300);
 }
 &[disabled] {
   cursot: not-allowed;
 }
`

const CopyButton = () => {

  const [copy, setCopy] = useState(false)

  const router = useRouter()
  const url = `https://ryanparag.com${router.asPath}`

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const copyLink = () => {
    copyTextToClipboard(url)
    .then(() => {
      setCopy(true)
    })
  }

  useEffect(() => {
    setTimeout(() => {
      setCopy(false)
    }, 3000)
  },[copy])

  return(
    <BlankButton onClick={() => copyLink()} disabled={copy}>
      <input style={{ opacity: '0', width: '0', height: '0', position: 'fixed', top: '-9999px', left: '-9999px' }}type="text" value={url} readOnly />
      {
        copy ? (
          <Check size={'12'} style={{ marginRight: designTokens.space[2], color: 'var(--primary)' }} />
        )
        :
        (
          <Copy size={'12'} style={{ marginRight: designTokens.space[2] }} />
        )
      }
      { copy ? 'Copied!' : 'Copy Link'}
    </BlankButton>
  )
}

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
          <Link href="/notes">
            <a className="link">←{' '}Back to Notes</a>
          </Link>
          </div>
          <article>
            <h1 style={{ fontSize: designTokens.sizing._4xl }}>{frontmatter.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: designTokens.space[3] }}>
              <Chip mr={designTokens.space[2]} ghost>
                {date}
              </Chip>
              <CopyButton/>
            </div>
            {frontmatter.hero_image && (
              <HeroImage>
                <Image
                  src={frontmatter.hero_image}
                  layout={'fill'}
                  priority
                  alt={frontmatter.title}
                  objectFit={'cover'}
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