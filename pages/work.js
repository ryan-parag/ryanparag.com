import Layout, { Wrapper } from '@components/Layout/'
import { ButtonPrimaryAnchorTag } from '@components/Button'
import Title from '@components/Title'
import { WorkLogo } from '@components/Logo'
import Projects from '@components/Projects'
import FAQ from '@components/FAQ'

const Work = ({ title, description}) => {

  return (
    <>
      <Layout pageTitle={`${title} | Work`} description={description} ogImage="/notes-social-media.png">
        <Wrapper>
          <Title>
            <div style={{ width: '72px'}}>
              <WorkLogo/>
            </div>
            <h1>Work</h1>
            <p className="lead">Oops - I'm slowly moving my work to this site, but you can find my current work using the link below</p>
            <ButtonPrimaryAnchorTag href="https://work.ryanparag.com">
              View my case studies!
            </ButtonPrimaryAnchorTag>
          </Title>
        </Wrapper>
        <Wrapper>
          <h3>... or check out some side projects</h3>
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
