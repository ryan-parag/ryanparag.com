import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Header from '@components/Header/'
import { GlobalStyles } from '@components/GlobalStyles/'
import styled, { css } from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { notionLight, notionDark, darkTheme, lightTheme, hyrule, zora, gerudo, hebra, eldin, sheikah, korok, yiga } from '@components/Theme/'
import { designTokens } from '@components/Theme/designTokens'
import Footer from '@components/Footer'
import { StaticKitProvider } from '@statickit/react'
import ReactGA from 'react-ga'
import { motion } from 'framer-motion'
import LiveblocksCursor from '@components/LiveblocksCursor'

export const Wrapper = styled.div`
  width: 100%;
  max-width: ${designTokens.layoutWidth.sm};
  margin: auto;
  padding: 0 ${designTokens.space[3]};
  @media screen and (min-width: ${designTokens.breakpoints[0]}) {
    max-width: ${designTokens.layoutWidth.lg};
  }
`

export const DebugStyles = css`
  background-size: var(--unit) var(--unit);
  background-repeat: repeat;
  background-position: calc(var(--unit)*-0.5) calc(var(--unit)*-0.5);
  background-image: radial-gradient(var(--grey400) calc(var(--pixel)*2),transparent 0);
`

const Debug = styled.div`
  --pixel: ${props => props.debug};
  --unit: 8px;
  ${DebugStyles}
`

export const LayoutContainer = styled.section`
  -webkit-font-smoothing: antialiased;
  padding: ${designTokens.space[8]} 0 ${designTokens.space[6]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    padding-top: ${designTokens.space[9]};
  }
`

const GradientBox = styled(motion.div)`
  height: calc(${designTokens.space[10]} + ${designTokens.space[10]});
  background:linear-gradient(150deg, var(--secondary), var(--tertiary), var(--primary), var(--primary));
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  filter: blur(${designTokens.space[2]});
  z-index: -1;
  opacity: 0.2;
`

const GradientClip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  backdrop-filter: blur(4px) saturate(300%);
  background: linear-gradient(${props => props.slant ? '-12deg, var(--grey0),var(--grey0), transparent' : 'to top, var(--grey0), transparent'});
`

export const GradientContainer = () => {
  return(
    <GradientBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      transition={{ duration: 1.4, delay: 0.2 }}
    >
      <GradientClip slant/>
    </GradientBox>
  )
}

function Demo({ children, pageTitle, description, ogImage, ...props }) {

  if (typeof window !== "undefined") {
    ReactGA.initialize('UA-63443247-5')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  const [mounted, setMounted] = useState(false)
  const [debug, setDebug] = useState(false)
  const [open, setOpen] = useState(false)

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem("ryansNotesNewTheme") !== null) {
        const localTheme = JSON.parse(localStorage.getItem('ryansNotesNewTheme'))
        return localTheme
      }
      return lightTheme
    }
    return lightTheme
  })

  const debugGrid = () => {
    setDebug(!debug)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ryansNotesNewTheme', JSON.stringify(theme));
    }

    setMounted(true)
  }, [theme]);

  const toggleTheme = (theme) => {
    localStorage.setItem('ryansNotesNewTheme', JSON.stringify(theme))
    setTheme(theme)
  }

  const body = 
    <>
      <ThemeProvider theme={theme}>
        <StaticKitProvider site="3f3ebc6301b7">
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <meta name="Description" content={description}></meta>
            <meta name="viewport" content="width=device-width, user-scalable=no"></meta>
            <meta itemProp="name" content={pageTitle}></meta>
            <meta itemProp="description" content={description}></meta>
            <meta itemProp="image" content={`https://ryanparag.com${ogImage}`}></meta>
            <meta property="og:url" content="https://ryanparag.com"></meta>
            <meta property="og:type" content="website"></meta>
            <meta property="og:title" content={pageTitle}></meta>
            <meta property="og:description" content={description}></meta>
            <meta property="og:image" content={`https://ryanparag.com${ogImage}`}></meta>
            <link rel="icon" href="/favicon/favicon.svg"></link>
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"></link>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"></link>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"></link>
            <link rel="manifest" href="/favicon/site.webmanifest"></link>
            <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5"></link>
            <meta name="msapplication-TileColor" content="#000000"></meta>
            <meta name="theme-color" content="#00d1b2"></meta>
            <meta name="twitter:card" content="summary_large_image"></meta>
            <meta name="twitter:title" content={pageTitle}></meta>
            <meta name="twitter:description" content={description}></meta>
            <meta name="twitter:image" content={`https://ryanparag.com${ogImage}`}></meta>
            <title>{pageTitle}</title>
          </Head>
          <GlobalStyles/>
          <Debug debug={debug ? 'var(--debug)' : '0px'}>
            <Header toggleTheme={toggleTheme} theme={theme} />
            <GradientContainer/>
            <main>
              <LayoutContainer>
                {children}
              </LayoutContainer>
            </main>
            <Footer debug={debug} debugGrid={debugGrid} />
          </Debug>
        </StaticKitProvider>
      </ThemeProvider>
    </>

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>
  }

  return body
}

export default function Layout({ children, pageTitle, description, ogImage, ...props }) {

  const router = useRouter()
  const { pathname } = router

  return (
    <LiveblocksCursor room={`${pathname}-v4`}>
      <Demo
        pageTitle={pageTitle}
        description={description}
        ogImage={ogImage}
      >
        {children}
      </Demo>
    </LiveblocksCursor>
);
}