import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@components/Layout/'
import LoadingBox from '@components/LoadingBox'

const Worksheets = ({title, description, ...props}) => {

  const router = useRouter()

  useEffect(() => {
    router.push('/worksheets/research')
  },[])

  return (
    <Layout pageTitle={title} description={description} ogImage="/worksheets-social-media.png">
      <LoadingBox/>
    </Layout>
  )
}

export default Worksheets

export async function getStaticProps() {
  const configData = await import(`../../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description
    },
  }
}