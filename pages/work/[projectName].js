import Link from 'next/link'
import styled from 'styled-components'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import { designTokens } from '@components/Theme/designTokens'
import ImgZoom from '@components/ImgZoom'
import { Button } from '@components/Button'
import FAQ from '@components/FAQ'
import Chip from '@components/Chip'
import Title from '@components/Title'
import { Box, MapPin, User, Calendar, Smartphone } from 'react-feather'
import 'react-medium-image-zoom/dist/styles.css'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypePrism from 'rehype-prism-plus'
import Image from 'next/image'
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

const LogoContainer = styled.div`
  height: ${designTokens.space[7]};
  width: ${designTokens.space[7]};
  padding: 0;
  display: block;
  border-radius: ${designTokens.space[2]};
  border: 1px solid var(--grey200);
  margin-bottom: ${designTokens.space[4]};
  img {
    border-radius: ${designTokens.space[2]};
  }
`

const Table = styled.table`
  font-size: ${designTokens.fontSizes[0]};
  th {
    text-align: left;
    color: var(--grey600);
    width: calc(${designTokens.space[8]} + ${designTokens.space[2]});
  }
  th, td {
    vertical-align: top;
  }
  th {
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
              <Chip ghost mb={designTokens.space[1]} mt={designTokens.space[1]} mr={designTokens.space[1]}>{data.location}</Chip>
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
                    <Chip key={i} ghost mb={designTokens.space[1]} mt={designTokens.space[1]} mr={designTokens.space[1]}>{item}</Chip>
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
                <Chip ghost mb={designTokens.space[1]} mt={designTokens.space[1]} mr={designTokens.space[1]}>{data.date}</Chip>
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
                    <Chip key={i} mb={designTokens.space[1]} mt={designTokens.space[1]} ghost mr={designTokens.space[1]}>{item}</Chip>
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
            <LogoContainer>
              <Image
                src={frontmatter.logo}
                width={designTokens.space[7]}
                height={designTokens.space[7]}
                objectFit={'cover'}
                alt={frontmatter.title}
              />
            </LogoContainer>
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