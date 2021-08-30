import Layout from '@components/Layout/'
import ThemeCreatorV2 from '@components/ThemeCreatorV2'
import { lightTheme } from '@components/Theme/'

const Page = ({ work, title, description, ...props }) => {

  return (
    <>
      <Layout pageTitle={`${title} | Create a theme`} description={description} ogImage="/social-media.png">
        <ThemeCreatorV2 defaultTheme={lightTheme} />
      </Layout>
    </>
  )
}

export default Page

export async function getStaticProps() {
  const configData = await import(`../../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}