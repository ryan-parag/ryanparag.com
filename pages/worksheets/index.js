import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@components/Box'
import Layout from '@components/Layout/'

const Worksheets = ({title, description, ...props}) => {

  const router = useRouter()

  useEffect(() => {
    router.push('/worksheets/research')
  },[])

  return (
    <Layout pageTitle={title} description={description} ogImage="/notes-social-media.png">
      <Box>
        Loading
      </Box>
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