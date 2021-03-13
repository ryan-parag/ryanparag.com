import Layout, { Wrapper } from '@components/Layout/'
import Link from 'next/link'
import { ProjectItem } from '@components/Projects'
import Subscribe from '@components/Subscribe'
import { designTokens } from '@components/Theme/designTokens'
import Title from '@components/Title'

const Page = ({ title, description, ...props }) => {

  return (
    <>
      <Layout pageTitle={`${title} | RSS`} description={description} ogImage="/notes-social-media.png">
        <Wrapper>
          <Title>
            <h1>Now</h1>
            <p className="lead">Things I'm currently focused on and doing.</p>
            <p>Last updated October 3, 2021</p>
          </Title>
          <h3>Working</h3>
          <h3>Building</h3>
          <h3>Listening</h3>
          <h3>Playing</h3>
          <h3>Reading</h3>
          <hr/>
          <Subscribe/>
          <p>Need an RSS reader? Here's what I use:</p>
        </Wrapper>
      </Layout>
    </>
  )
}

export default Page

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
