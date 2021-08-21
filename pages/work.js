import Layout, { Wrapper } from '@components/Layout/'
import Title from '@components/Title'
import { WorkLogo } from '@components/Logo'
import Projects, { WorkList } from '@components/Projects'
import FAQ from '@components/FAQ'

const Work = ({ title, description}) => {

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
          <h3>Projects (coming soon)</h3>
          <p>
            I'm in the proceess of moving my work/case studies to this site, but you can <a className="link" href="https://work.ryanparag.com">find my current work here</a> or through one of the links below.
          </p>
          <WorkList/>
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
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
