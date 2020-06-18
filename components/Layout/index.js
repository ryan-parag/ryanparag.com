import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Header from '../Header/'
import { GlobalStyles } from '../GlobalStyles/'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../Theme/'
import { designTokens } from '../Theme/designTokens'

const LayoutContainer = styled.div`
  width: 100%;
  max-width: 640px;
  margin: auto;
`

const Main = styled.main`
  padding: ${designTokens.space[9]} ${designTokens.space[3]};
`

export default function Layout({ children, pageTitle, description, ...props }) {

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const localTheme = localStorage.getItem('theme');
      return localTheme === null || localTheme === 'light' ? 'light' : 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="Description" content={description}></meta>
          <title>{pageTitle}</title>
        </Head>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;800;900&display=swap');
        `}</style>
        <GlobalStyles/>
        <section>
          <Header />
          <button onClick={toggleTheme}>Theme</button>
          <Main>
            <LayoutContainer>{children}</LayoutContainer>
          </Main>
        </section>
        <footer>
          Built with <img src="/netliheart.svg" alt="Netlify Heart" /> for you
        </footer>
      </ThemeProvider>
    </>
  )
}
