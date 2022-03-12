import React, { useEffect } from 'react'
import { useRouter } from "next/router";
import Layout, { Wrapper } from '@components/Layout/'
import Title from '@components/Title'
import styled from 'styled-components'
import { Button, ButtonAnchorTag } from '@components/Button'
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
            <p className="lead">Take a look at my Wordle results!</p>
            <p>
              <small>Wordle is a daily word game where players have six attempts to guess a five letter word. Feedback for each guess is given in the form of colored tiles to indicate if letters match the correct position.</small>
            </p>
            <p>
              <ButtonAnchorTag href="https://www.nytimes.com/games/wordle/index.html" target="_blank">
                <svg style={{ marginRight: designTokens.space[2] }} width="20" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26.7564 1.604H26.1621V24.1742H26.7564V1.604Z" fill="var(--grey900)"/>
                  <path d="M20.0592 15.5907C19.6907 16.6342 19.106 17.5881 18.3434 18.3899C17.5807 19.1918 16.6573 19.8235 15.6336 20.2438V15.5907L18.1625 13.2958L15.6336 11.0324V7.8334C16.6781 7.8121 17.6733 7.38513 18.4085 6.64288C19.1437 5.90063 19.5611 4.90139 19.5724 3.85674C19.5724 1.11292 16.955 0.139299 15.4693 0.139299C15.0671 0.126929 14.6651 0.169469 14.2744 0.265742V0.398508C14.4704 0.398508 14.7612 0.366897 14.856 0.366897C15.8865 0.366897 16.6642 0.853705 16.6642 1.78939C16.658 1.99132 16.6108 2.18987 16.5253 2.37292C16.4398 2.55596 16.3179 2.71965 16.167 2.85398C16.0161 2.9883 15.8394 3.09044 15.6477 3.15416C15.456 3.21787 15.2533 3.24181 15.052 3.22453C12.5231 3.22453 9.49476 1.15717 6.23251 1.15717C3.32431 1.14453 1.33914 3.31304 1.33914 5.50683C1.33914 7.70063 2.60358 8.38343 3.92492 8.86391L3.95653 8.73747C3.71919 8.58749 3.52687 8.37607 3.39998 8.12563C3.27309 7.87518 3.21635 7.59506 3.2358 7.31498C3.25106 7.06517 3.31562 6.82084 3.42574 6.59609C3.53587 6.37135 3.68939 6.17062 3.87745 6.00547C4.06551 5.84033 4.2844 5.71404 4.52149 5.63389C4.75859 5.55373 5.00921 5.52129 5.2589 5.53845C8.00272 5.53845 12.4283 7.8334 15.1784 7.8334H15.4377V11.064L12.9088 13.2958L15.4377 15.5907V20.2944C14.3806 20.6702 13.2656 20.8564 12.1438 20.8444C7.87628 20.8444 5.18935 18.2587 5.18935 13.9659C5.18073 12.9499 5.32131 11.9381 5.60662 10.9629L7.73719 10.0272V19.5105L12.0679 17.6138V7.89662L5.68248 10.7416C5.98037 9.87179 6.44776 9.06968 7.05764 8.38167C7.66751 7.69366 8.40776 7.13342 9.23555 6.73334L9.20394 6.63851C4.93647 7.57419 0.801758 10.8111 0.801758 15.6539C0.801758 21.2427 5.51811 25.1372 11.0121 25.1372C16.8285 25.1372 20.1224 21.2617 20.154 15.6097L20.0592 15.5907Z" fill="var(--grey900)"/>
                </svg>
                Play Wordle
                <span className="icon">&rarr;</span>
              </ButtonAnchorTag>
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
