import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Header from '@components/Header/'
import { GlobalStyles } from '@components/GlobalStyles/'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { notionLight, notionDark, darkTheme, lightTheme, hyrule, zora, gerudo, hebra, eldin, sheikah, korok, yiga } from '@components/Theme/'
import { designTokens } from '@components/Theme/designTokens'
import Footer from '@components/Footer'
import { StaticKitProvider } from '@statickit/react'
import ReactGA from 'react-ga'

export const LayoutContainer = styled.div`
  width: 100%;
  max-width: ${designTokens.layoutWidth.sm};
  margin: auto;
  @media screen and (min-width: ${designTokens.breakpoints[0]}) {
    max-width: ${designTokens.layoutWidth.lg};
  }
`

export const Main = styled.main`
  padding: ${designTokens.space[7]} ${designTokens.space[3]} ${designTokens.space[6]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    padding-top: ${designTokens.space[9]};
  }
`

const GradientBox = styled.div`
  height: ${designTokens.space[8]};
  background:linear-gradient(150deg, var(--primary), var(--tertiary), var(--secondary));
  position: absolute;
  top: -${designTokens.space[3]};
  left: 0;
  right: 0;
  width: 100%;
  z-index: -1;
  filter: blur(${designTokens.space[6]});
  opacity: 0.15;
`

export default function Layout({ children, pageTitle, description, ogImage, ...props }) {

  if (typeof window !== "undefined") {
    ReactGA.initialize('UA-63443247-5')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  const [debugOutline, setDebugOutline] = React.useState(false)

  const debugEvents = () => {
    // press ALT-G to toggle grid
    // press ALT-D to toggle debug visualization
    if (typeof window !== 'undefined') {
      document.addEventListener("keypress", ev => {
        if (ev.altKey) {
          if (ev.code == "KeyD") {
            debugOutline ? document.querySelector('html').classList.remove('debug-outline') : document.querySelector('html').classList.add('debug-outline')
            setDebugOutline(!debugOutline)
          }
        }
      })
    }
  }

  const [mounted, setMounted] = useState(false)

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ryansNotesNewTheme', JSON.stringify(theme));
    }
    setMounted(true)
    setDebugOutline(false)
  }, [theme, debugOutline]);

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
            <meta property="og:url" content="https://notes.ryanparag.com"></meta>
            <meta property="og:type" content="website"></meta>
            <meta property="og:title" content={pageTitle}></meta>
            <meta property="og:description" content={description}></meta>
            <meta property="og:image" content={ogImage}></meta>
            <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png"></link>
            <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png"></link>
            <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png"></link>
            <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png"></link>
            <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png"></link>
            <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png"></link>
            <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png"></link>
            <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png"></link>
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png"></link>
            <link rel="icon" type="image/png" sizes="192x192"  href="/favicon/android-icon-192x192.png"></link>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"></link>
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png"></link>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"></link>
            <link rel="manifest" href="/favicon/manifest.json"></link>
            <meta name="msapplication-TileColor" content="#ffffff"></meta>
            <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png"></meta>
            <meta name="theme-color" content="#ffffff"></meta>
            <link rel="mask-icon" href="/favicon/notes-favicon.svg" color="#00d1b2"></link>
            <link rel="icon" href="/favicon/notes-favicon.svg"></link>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;800&display=swap" rel="stylesheet"></link>
            <title>{pageTitle}</title>
          </Head>
          <GlobalStyles/>
          <Header toggleTheme={toggleTheme} theme={theme} />
          <GradientBox/>
          <section>
            <Main>
              <LayoutContainer>{children}</LayoutContainer>
            </Main>
          </section>
          <Footer/>
        </StaticKitProvider>
      </ThemeProvider>
    </>

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>
  }

  return body
}
