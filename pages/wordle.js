import React, { useEffect } from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Layout, { Wrapper } from '@components/Layout/'
import Title from '@components/Title'
import styled from 'styled-components'
import { Button } from '@components/Button'
import { designTokens } from '@components/Theme/designTokens'
import LoadingBox from '@components/LoadingBox'
import Error from '@components/Error'
import Link from 'next/link'
import Wordle, { WordleAnalytics } from '@components/Wordle'
import { WordleIcon } from '@components/Logo'

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

  const { data, error } = useSWR('/api/wordle', fetcher)

  return (
    <>
      <Layout pageTitle={`${title} | Portfolios`} description={description} ogImage="/portfolios-social-media.png">
        <Wrapper>
          <Title>
            <div style={{ width: '64px', marginBottom: designTokens.space[4] }}>
              <WordleIcon/>
            </div>
            <Link href="/work">
              <a className="link">←{' '}Projects</a>
            </Link>
            <h1>Wordle</h1>
            <p className="lead">Take a look at my <a className="link" href="https://www.nytimes.com/games/wordle/index.html">Wordle</a> results!</p>
            <p>
              <small>Wordle is a daily word game where players have six attempts to guess a five letter word. Feedback for each guess is given in the form of colored tiles to indicate if letters match the correct position.</small>
            </p>
          </Title>
          {
              error && (<Error/>)
            }
          {
            data ? (
              <>
                {
                  data.wordles.map(item => (
                    <Wordle
                      key={item.id}
                      wordle={item}
                    />
                  ))
                }
              </>
            )
            :
            (
              <LoadingBox/>
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