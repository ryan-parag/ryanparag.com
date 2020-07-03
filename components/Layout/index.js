import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Header from '../Header/'
import { GlobalStyles } from '../GlobalStyles/'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { notionLight, notionDark, darkTheme, lightTheme, hyrule, zora, gerudo, hebra, eldin, sheikah, korok, yiga } from '../Theme/'
import { designTokens } from '../Theme/designTokens'
import Footer from '../Footer'
import { StaticKitProvider } from '@statickit/react'

const LayoutContainer = styled.div`
  width: 100%;
  max-width: ${designTokens.layoutWidth};
  margin: auto;
`

const Main = styled.main`
  padding: ${designTokens.space[9]} ${designTokens.space[3]} ${designTokens.space[6]};
`

export default function Layout({ children, pageTitle, description, ...props }) {

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const localTheme = localStorage.getItem('theme');
      return localTheme === null || localTheme === 'Light' ? 'Light' : localTheme
    }
    return 'Light'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = (themeName) => {
    setTheme(themeName)
  }

  const themeList = [
    darkTheme,
    notionLight,
    notionDark,
    hyrule,
    zora,
    gerudo,
    eldin,
    hebra,
    sheikah,
    korok,
    yiga,
    lightTheme
  ]

  const body = 
    <>
      <ThemeProvider theme={
        themeList.find(obj => {
          if(obj.name !== 'undefined') {
            return obj.name === theme
          }
          return lightTheme
        })
      }>
        <StaticKitProvider site="3f3ebc6301b7">
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <meta name="Description" content={description}></meta>
            <meta name="viewport" content="width=device-width, user-scalable=no">
            <meta property="og:url" content="https://notes.ryanparag.com"></meta>
            <meta property="og:type" content="website"></meta>
            <meta property="og:title" content={pageTitle}></meta>
            <meta property="og:description" content={description}></meta>
            <meta property="og:image" content="/notes-social-media.png"></meta>
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
