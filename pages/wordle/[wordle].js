import React, { useEffect } from 'react'
import { useRouter } from "next/router";
import Layout, { Wrapper } from '@components/Layout/'
import Title from '@components/Title'
import styled from 'styled-components'
import { Button } from '@components/Button'
import { designTokens } from '@components/Theme/designTokens'
import Link from 'next/link'
import TabNav from '@components/Wordle/TabNav'
import Activity from '@components/Wordle/Activity'
import Stats from '@components/Wordle/Stats'
import { WordleIcon } from '@components/Logo'

const ScrolledButton = styled(Button)`
  position: fixed;
  bottom: ${designTokens.space[3]};
  right: ${designTokens.space[3]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    display: none;
  }
`

const Page = ({ title, description, ...props }) => {

  const scrollToTop = () => {
    if(process.browser) {
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });
    }
  }

  const router = useRouter();
  const { wordle } = router.query;

  const categories = ['Activity', 'Statistics']

  const displayContent = (type) => {
    switch (type) {
      case 'activity':
        return <Activity/>
        break;
      case 'statistics':
        return <Stats/>
        break;
      default:
        return null
    }
  }

  return (
    <>
      <Layout pageTitle={`${title} | Wordle`} description={description} ogImage="/wordle-social-media.png">
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
          <TabNav
            items={categories}
            active={wordle}
          />
          {displayContent(wordle)}
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

export async function getStaticPaths() {
  const categories = ['activity', 'statistics']
  const paths = categories.map((wordle) => ({
    params: { wordle }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params: {wordle} }) {
  const configData = await import('../../siteconfig.json')

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
