import React, { useEffect } from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Layout, { Wrapper } from '@components/Layout/'
import Title from '@components/Title'
import Portfolios from '@components/Portfolios'
import { Form } from '@components/Portfolios/Item'
import styled from 'styled-components'
import { Button } from '@components/Button'
import { designTokens } from '@components/Theme/designTokens'
import LoadingBox from '@components/LoadingBox'
import Error from '@components/Error'
import Link from 'next/link'

const ScrolledButton = styled(Button)`
  position: fixed;
  bottom: ${designTokens.space[3]};
  right: ${designTokens.space[3]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    display: none;
  }
`

const Page = ({ token, title, description, ...props }) => {

  const scrollToTop = () => {
    if(process.browser) {
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });
    }
  }

  const { data, error } = useSWR('/api/portfolios/list', fetcher)

  return (
    <>
      <Layout pageTitle={`${title} | Portfolios`} description={description} ogImage="/portfolios-social-media.png">
        <Wrapper>
          <Title>
            <div style={{ width: '64px', fontSize: '64px', lineHeight: '1', marginBottom: designTokens.space[4] }}>
              🤠
            </div>
            <Link href="/work">
              <a className="link">←{' '}Projects</a>
            </Link>
            <h1>Portfolios</h1>
            <p className="lead">A list of portfolios, personal sites, and designers that are dope </p>
            <Form/>
          </Title>
          {
            data ? (
              <Portfolios
                verified={data.portfolios.verified}
                waiting={data.portfolios.waiting}
              />
            )
            :
            (
              <LoadingBox>
                Loading
              </LoadingBox>
            )
          }
          {
            error && (
              <Error/>
            )
          }
        </Wrapper>
      </Layout>
      <ScrolledButton
          onClick={() => scrollToTop()}
        >
          Scroll to Top
        </ScrolledButton>
    </>
  )
}

export default Page

export async function getServerSideProps({ req, res}) {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
      token: req.cookies.token || "",
    },
  }
}