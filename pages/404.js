import React, { useEffect } from 'react'
import { designTokens } from '@components/Theme/designTokens'
import Layout, { Wrapper } from '@components/Layout/'
import { Search } from 'react-feather'
import { ButtonLink } from '@components/Button'
import Link from 'next/link'
import styled from 'styled-components'
import Memoji from '@components/Memoji'

const Container = styled.div`
  text-align: center;
  padding: ${designTokens.space[6]} 0;
`

const Listening = ({title, description, ...props}) => {

  return (
    <Layout pageTitle={title} description={description} ogImage="/social-media.png">
      <Wrapper>
       <Container>
        <Memoji/>
        <h3>Hmm... this page doesn't exist</h3>
          <p>Try a different starting point by heading back to the main page</p>
          <ButtonLink>
            <Link href="/work/">
              <a>
                Go back home
              </a>
            </Link>
          </ButtonLink>
       </Container>
      </Wrapper>
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