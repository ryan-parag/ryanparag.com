import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout, { Wrapper } from '@components/Layout/'
import LoadingBox from '@components/LoadingBox'

const Listening = ({title, description, ...props}) => {

  const router = useRouter()

  useEffect(() => {
    router.push('/listening/music', undefined, { shallow: true })
  },[])

  return (
    <Layout pageTitle={title} description={description} ogImage="/listens-social-media.png">
      <Wrapper>
        <LoadingBox/>
      </Wrapper>
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