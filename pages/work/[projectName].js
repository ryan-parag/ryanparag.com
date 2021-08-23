import Link from 'next/link'
import styled from 'styled-components'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '@components/CodeBlock'
import { designTokens } from '@components/Theme/designTokens'
import ImgZoom from '@components/ImgZoom'
import { Button } from '@components/Button'
import FAQ from '@components/FAQ'
import Chip from '@components/Chip'
import Card from '@components/Card'
import Title from '@components/Title'
import { Box, MapPin, User, Calendar, Smartphone } from 'react-feather'
import 'react-medium-image-zoom/dist/styles.css'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypePrism from 'rehype-prism-plus'

import Layout, { Wrapper } from '@components/Layout'
import getSlugs from '@utils/getSlugs'

const ScrolledButton = styled(Button)`
  position: fixed;
  bottom: ${designTokens.space[3]};
  right: ${designTokens.space[3]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    display: none;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: ${designTokens.space[4]};
  width: 100%;
  margin: auto;
  max-width: ${designTokens.breakpoints[2]};
  padding: ${designTokens.space[5]} ${designTokens.space[3]} 0;
  @media screen and (max-width: ${designTokens.breakpoints[1]}) {
    max-width: ${designTokens.layoutWidth.lg};
  }
  @media screen and (max-width: ${designTokens.breakpoints[3]}) {
    max-width: ${designTokens.layoutWidth.sm};
    grid-template-columns: repeat(1, 1fr);
  }
`

const Avatar = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: ${designTokens.space[5]};
  width: ${designTokens.space[5]};
  background: ${props => props.waiting ? 'var(--grey200)' : 'var(--primaryTransparent)'};
  font-size: ${designTokens.fontSizes[0]};
  font-weight: ${designTokens.fontWeights.bold};
  color: ${props => props.waiting ? 'var(--grey600)' : 'var(--primaryDark)'};
`

const Table = styled.table`
  font-size: ${designTokens.fontSizes[0]};
  th {
    text-align: left;
    color: var(--grey600);
    width: calc(${designTokens.space[8]} + ${designTokens.space[2]});
  }
  th, td {
    padding: ${designTokens.space[1]} 0;
  }
`

const Info = ({data}) => {
  return(
    <Table>
      <tbody>
        {
          data.location && (
            <tr>
              <th>
                <MapPin size={'16'} style={{ transform: 'translateY(4px)', marginRight: designTokens.space[2] }}/>
                Location
              </th>
              <td>{data.location}</td>
            </tr>
          )
        }
        {
          data.role && (
            <tr>
              <th>
                <User size={'16'} style={{ transform: 'translateY(4px)', marginRight: designTokens.space[2] }}/>
                Roles
              </th>
              <td>
                {
                  data.role.map((item, i) => (
                    <Chip key={i} ghost mr={designTokens.space[1]}>{item}</Chip>
                  ))
                }
              </td>
            </tr>
          )
        }
        {
          data.date && (
            <tr>
              <th>
                <Calendar size={'16'} style={{ transform: 'translateY(4px)', marginRight: designTokens.space[2] }}/>
                Date
              </th>
              <td>
                <Chip ghost mr={designTokens.space[1]}>{data.date}</Chip>
              </td>
            </tr>
          )
        }
        {
          data.spaces && (
            <tr>
              <th>
                <Box size={'16'} style={{ transform: 'translateY(4px)', marginRight: designTokens.space[2] }}/>
                Spaces
              </th>
              <td>
                {
                  data.spaces.map((item, i) => (
                    <Chip key={i} ghost mr={designTokens.space[1]}>{item}</Chip>
                  ))
                }
              </td>
            </tr>
          )
        }
        {
          data.platforms && (
            <tr>
              <th>
                <Smartphone size={'16'} style={{ transform: 'translateY(4px)', marginRight: designTokens.space[2] }}/>
                Platforms
              </th>
              <td>
                {
                  data.platforms.map((item, i) => (
                    <Chip key={i} ghost mr={designTokens.space[1]}>{item}</Chip>
                  ))
                }
              </td>
            </tr>
          )
        }
      </tbody>
    </Table>
  )
}

export default function Project({ siteTitle, frontmatter, markdownBody }) {
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

  const roleInfo = {
    location: frontmatter.location,
    role: frontmatter.role,
    date: frontmatter.date,
    spaces: frontmatter.spaces,
    platforms: frontmatter.platforms
  }

  return (
    <>
      <Layout pageTitle={`${frontmatter.title} | ${siteTitle}`} description={frontmatter.description}>
        <Wrapper>
          <Title>
            <img
              src={frontmatter.logo}
              width={designTokens.space[7] + designTokens.space[2]}
              style={{ display: 'block', marginBottom: designTokens.space[4], border: '1px solid var(--grey200)', borderRadius: designTokens.space[2] }}
            />
            <Link href="/work">
              <a className="link">←{' '}Back</a>
            </Link>
            <h1>{frontmatter.title}</h1>
            <p className="lead">{frontmatter.description}</p>
            <p>{frontmatter.text}</p>
            <Info data={roleInfo}/>
          </Title>
          <article>
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
          </article>
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
  const { projectName } = ctx.params

  const content = await import(`../../projects/${projectName}.md`)
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
  })(require.context('../../projects', true, /\.md$/))

  const paths = blogSlugs.map((slug) => `/work/${slug}`)

  return {
    paths, // An array of path names, and any params
    fallback: false, // so that 404s properly appear if something's not matching
  }
}