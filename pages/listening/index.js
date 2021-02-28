import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@components/Layout/'
import LoadingBox from '@components/LoadingBox'

const Listening = ({title, description, ...props}) => {

  const router = useRouter()

  useEffect(() => {
    router.push('/listening/music')
  },[])

  return (
    <Layout pageTitle={title} description={description} ogImage="/listens-social-media.png">
      <LoadingBox/>
    </Layout>
  )
}

export default Listening

export async function getStaticProps() {
  const configData = await import(`../../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description
    },
  }
}