import Layout, { Wrapper } from '@components/Layout/'
import Title from '@components/Title'
import { WorkLogo } from '@components/Logo'
import Projects, { WorkList } from '@components/Projects'
import FAQ from '@components/FAQ'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const Work = ({ title, description, work}) => {

  const sortedWork = work.slice().sort((a, b) => new Date(b.frontmatter.startDate) - new Date(a.frontmatter.startDate))

  return (
    <>
      <Layout pageTitle={`${title} | Work`} description={description} ogImage="/social-media.png">
        <Wrapper>
          <Title>
            <div style={{ width: '72px'}}>
              <WorkLogo/>
            </div>
            <h1>Work</h1>
          </Title>
        </Wrapper>
        <Wrapper>
          <h3>Projects</h3>
          <p>Below are some case studies and work samples of projects that I’ve been involved with.
          </p>
          <WorkList work={sortedWork} />
          <hr/>
          <h3>... or take a look at a few of my side projects</h3>
          <Projects/>
          <hr/>
        </Wrapper>
        <FAQ/>
      </Layout>
    </>
  )
}

export default Work

export async function getStaticProps() {
  const configData = await import(`../../siteconfig.json`)

  const files = fs.readdirSync(path.join('projects'))

  const work = files.map(filename => {
    const slug = filename.replace('.md','')
    const markdownWithMeta = fs.readFileSync(path.join('projects', filename), 'utf-8')
    const {data:frontmatter} = matter(markdownWithMeta)
    return {
      slug,
      frontmatter
    }
  })

  return {
    props: {
      work,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
