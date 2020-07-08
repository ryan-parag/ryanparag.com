import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './node_modules/@components/CodeBlock'
import { format } from 'timeago.js'
import { designTokens } from './node_modules/@components/Theme/designTokens'
import ContactForm from './node_modules/@components/ContactForm'

import Layout from './node_modules/@components/Layout'
import getSlugs from './node_modules/@utils/getSlugs'

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>

  return (
    <>
      <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
        <div>
          ←{' '}
          <Link href="/">
            <a>Back to Notes</a>
          </Link>
        </div>
        <article>
          <h1>{frontmatter.title}</h1>
          <div
            style={{
              marginBottom: designTokens.space[3]
            }}
          >
            <small>
              Updated {format(frontmatter.date)}
            </small>
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
              renderers={{ code: CodeBlock }}
            />
          </div>
        </article>
        <hr/>
        <ContactForm/>
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
