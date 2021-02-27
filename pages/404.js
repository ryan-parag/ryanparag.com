import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingBox from '@components/LoadingBox'
import Layout from '@components/Layout/'

const Listening = ({title, description, ...props}) => {

  const router = useRouter()

  useEffect(() => {
    router.push('/')
  },[])

  return (
    <Layout pageTitle={title} description={description} ogImage="/listens-social-media.png">
      <LoadingBox
        title={`Hmm... this page doesn't exist`}
        description={`Taking you back to the homepage`}
      />
    </Layout>
  )
}

export default Listening

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description
    },
  }
}