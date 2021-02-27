import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@components/Box'
import Layout from '@components/Layout/'
import { Loader } from 'react-feather'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const LoadingSpinner = styled(Loader)`
  color: var(--primary);
  animation: rotation 2s infinite linear;
`

const LoaderLabel = styled.div`
  margin-top: ${designTokens.space[3]};
  font-weight: ${designTokens.fontWeights.bold};
`

const Listening = ({title, description, ...props}) => {

  const router = useRouter()

  useEffect(() => {
    router.push('/listening/music')
  },[])

  return (
    <Layout pageTitle={title} description={description} ogImage="/notes-social-media.png">
      <Box center>
        <LoadingSpinner
         size={'40'}
        />
        <LoaderLabel>Loading...</LoaderLabel>
      </Box>
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