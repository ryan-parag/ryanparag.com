import {LayoutContainer, Wrapper} from '@components/Layout/'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Header from '@components/Header/'
import { GlobalStyles } from '@components/GlobalStyles/'
import { ThemeProvider } from 'styled-components'
import Footer from '@components/Footer'
import { StaticKitProvider } from '@statickit/react'
import { designTokens } from '@components/Theme/designTokens'
import ContactBox from '@components/ContactBox'
import ThemeCreator from '@components/ThemeCreator'
import TestCreator from '@components/ThemeCreator/test'
import ContactForm from '@components/ContactForm'
import { ButtonAnchorTag } from '@components/Button'
import { notionLight, notionDark, darkTheme, lightTheme, hyrule, zora, gerudo, hebra, eldin, sheikah, korok, yiga } from '@components/Theme/'
import ThemeItem from '@components/ThemeItem'
import { format } from 'timeago.js'
import namer from 'color-namer'
import { Box } from '@components/Box'
import Title, {TitleIcon} from '@components/Title'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import ReactGA from 'react-ga'
import CurrentTheme from '@components/Theme/CurrentTheme'

const SubmittedThemeList = ({ toggleTheme }) => {
  const { data } = useSWR('/api/themes/submitted/', fetcher);
  const [active, setActive] = useState()

  if (!data) {
    return null;
  }

  const getName = hex => {
    const names = namer(hex)
    const colorName = names.pantone[0].name
    const capitalized = colorName.charAt(0).toUpperCase() + colorName.slice(1)
    return capitalized
  }

  return data.items.map((item,i) => (
    <li
      key={item.id}
      style={{
        padding: `${designTokens.space[2]} ${designTokens.space[3]}`,
        marginBottom: '0',
        display: 'flex',
        alignItems: 'center',
        borderBottom: `1px solid ${i === data.items.length - 1 ? 'transparent' : 'var(--grey200)'}`
      }}
    >
      <ThemeItem
        theme={item.fields}
        custom
        clickHandle={() => toggleTheme(item.fields)}
      />
      <div style={{ padding: designTokens.space[3] }}>
        <strong>
          {getName(item.fields.primary)} and {getName(item.fields.grey200)}
        </strong>
        <br/>
        <span
          style={{ fontSize: designTokens.fontSizes[0], color: 'var(--grey600)' }}
        >
          Submitted <span style={{ color: 'var(--tertiaryDark)'}}>{format(item.fields.Date)}</span>
        </span>
      </div>
    </li>
  ))
}

const CreateTheme = ({ title, description, ...props }) => {

  if (typeof window !== "undefined") {
    ReactGA.initialize('UA-63443247-5')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  const [mounted, setMounted] = React.useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
  }, [theme]);

  const toggleTheme = (theme) => {
    localStorage.setItem('ryansNotesNewTheme', JSON.stringify(theme))
    setTheme(theme)
  }

  return (
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
            <meta property="og:title" content={title}></meta>
            <meta property="og:description" content={description}></meta>
            <meta property="og:image" content={"/static/designing-for-personalization.png"}></meta>
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
            <title>{title}</title>
          </Head>
          <GlobalStyles/>
          <Header toggleTheme={toggleTheme} theme={theme} />
          <section>
            <LayoutContainer>
              <Wrapper>
                <Title>
                  <TitleIcon>
                    <img src="/static/projects/icon-theme-creator.png" alt="Theme Creator"/>
                  </TitleIcon>
                  <h1>Create a Theme</h1>
                  <p className="lead">Pick a few colors and build a new theme!</p>
                  <p>I like to believe design is a fluid skill and that <strong>everyone is a bit of a designer</strong> 👍 - we all have the ability to feel certain ways about things that are designed. <strong>Feed that curiousity</strong> and play around with creating a new theme for this website!</p>
                </Title>
                <CurrentTheme/>
                <Box center>
                  <h1>🚧</h1>
                  <h4>Under Construction</h4>
                  <p>Sorry! I'm going back under the hood of this feature, but it'll be back soon. Thanks for being patient!</p>
                </Box>
                <div style={{
                  textAlign: 'center',
                  padding: `${designTokens.space[3]} 0 ${designTokens.space[5]}`
                }}>
                  <div style={{
                    marginBottom: designTokens.space[3],
                    color: 'var(--grey400)'
                  }}>
                    <small>Powered by</small>
                  </div>
                  <ButtonAnchorTag
                    href="https://github.com/lyft/coloralgorithm"
                    target="_blank"
                  >
                  <svg width="24px" height="24px" viewBox="0 0 29 29" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient x1="90.5486726%" y1="-18.7679634%" x2="29.4247788%" y2="84.8213047%" id="linearGradient-1">
                        <stop stopColor="#191445" offset="0%"></stop>
                        <stop stopColor="#645EE9" offset="27%"></stop>
                        <stop stopColor="#943FFF" offset="66%"></stop>
                        <stop stopColor="#FF01BE" offset="91%"></stop>
                      </linearGradient>
                    </defs>
                    <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <rect fill="#FFFFFF" x="0" y="0" width="29" height="29"></rect>
                      <g id="Asset-1" transform="translate(1.000000, 1.000000)">
                        <polyline id="Path" stroke="#1A1445" strokeWidth="4.8467498" points="26.3144782 25.8848301 0.562415289 25.8848301 0.562415289 0.410267857"></polyline>
                        <path d="M0.562415289,0.410267857 L26.3235972,0.410267857 L26.3235972,25.8938508 L26.3235972,25.8938508 C12.0960893,25.8938508 0.562415289,14.4844621 0.562415289,0.410267857 L0.562415289,0.410267857 L0.562415289,0.410267857 Z" id="Path" stroke="url(#linearGradient-1)" strokeWidth="6"></path>
                      </g>
                    </g>
                  </svg>
                  <span style={{
                    marginLeft: designTokens.space[2]
                  }}>
                    <strong>ColorBox</strong>{' '}
                    <small>by Lyft Design</small>
                  </span>
                  </ButtonAnchorTag>
                </div>
                <hr/>
                <h3>Recently Created Themes (Last 8)</h3>
                <p>Want to see what others are creating? Take a look below!</p>
                <ul style={{
                  boxShadow: '0px 1px 3px rgba(0,0,0,0.14)',
                  background: 'var(--grey0)',
                  border: '1px solid var(--grey200)',
                  borderRadius: designTokens.space[2],
                  paddingBottom: designTokens.space[2],
                  paddingTop: designTokens.space[2],
                }}>
                <SubmittedThemeList toggleTheme={toggleTheme}/>
                </ul>
                <hr/>
                <ContactBox/>
                <ContactForm/>
              </Wrapper>
            </LayoutContainer>
          </section>
          <Footer/>
        </StaticKitProvider>
      </ThemeProvider>
    </>
  )
}

export default CreateTheme

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description
    },
  }
}