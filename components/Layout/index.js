import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Header from '../Header/'
import { GlobalStyles } from '../GlobalStyles/'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { notionLight, notionDark, darkTheme, lightTheme, hyrule, zora, gerudo, hebra, eldin, sheikah, korok } from '../Theme/'
import { designTokens } from '../Theme/designTokens'
import Footer from '../Footer'

const LayoutContainer = styled.div`
  width: 100%;
  max-width: ${designTokens.layoutWidth};
  margin: auto;
`

const Main = styled.main`
  padding: calc(${designTokens.space[9]} + ${designTokens.space[7]}) ${designTokens.space[3]} ${designTokens.space[6]};
`

const Sidebar = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
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
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="Description" content={description}></meta>
          <meta property="og:url" content="https://notes.ryanparag.com"></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:title" content={pageTitle}></meta>
          <meta property="og:description" content={description}></meta>
          <meta property="og:image" content="/notes-social-media.png"></meta>
          <link rel="mask-icon" href="/notes-favicon.svg" color="#00d1b2"></link>
          <link rel="icon" href="/notes-favicon.svg"></link>
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
      </ThemeProvider>
    </>

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>
  }

  return body
}
