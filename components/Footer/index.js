import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'
import Logo from '@components/Logo'
import { Button } from '@components/Button'
import { SpotifyCurrentlyPlaying } from '@components/Spotify'

const FooterContainer = styled.footer`
  width: 100%;
  padding: ${designTokens.space[6]} ${designTokens.space[3]};
  border-top: 1px solid var(--grey100);
  color: var(--grey600);
`

const FooterInner = styled.div`
  width: 100%;
  max-width: ${designTokens.layoutWidth.sm};
  margin: auto;
  @media screen and (min-width: ${designTokens.breakpoints[0]}) {
    max-width: ${designTokens.layoutWidth.lg};
  }
`

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: ${designTokens.space[3]};
  margin-bottom: ${designTokens.space[4]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const FooterList = styled.ul`
  list-style-type: none;
  margin: 0 0 ${designTokens.space[3]};
  padding: 0;
`

const FooterListItem = styled.li`
  margin-bottom: ${designTokens.space[2]};
  a {
    font-size: ${designTokens.fontSizes[1]};
    color: var(--grey600);
    transition: all 120ms ease-out 0s;
    &:hover, &:focus {
      color: var(--primaryDark);
      background: var(--primaryTransparent);
      box-shadow: 0 0 0 ${designTokens.space[2]} var(--primaryTransparent);
    }
  }
`

const FooterBottom = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100%;
  margin-top: ${designTokens.space[6]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    justify-content: space-between;
  }
`

const FooterLogo = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: ${designTokens.space[4]};
`

export default function Footer() {
  const clearStorage = () => {
    localStorage.removeItem('ryansNotesNewTheme')
    localStorage.removeItem('customThemes')
    window.location.reload()
  }

  return(
    <FooterContainer>
      <FooterInner>
        <FooterGrid>
          <FooterList>
            <FooterListItem>
              <Link href="/">
                <a>Home</a>
              </Link>
            </FooterListItem>
            <FooterListItem>
              <Link href="/notes">
                <a>Notes/Writing</a>
              </Link>
            </FooterListItem>
            <FooterListItem>
              <Link href="/about">
                <a>About</a>
              </Link>
            </FooterListItem>
            <FooterListItem>
              <Link href="/recent-listens">
                <a>Recent Listens</a>
              </Link>
            </FooterListItem>
          </FooterList>
          <FooterList>
            <FooterListItem>
              <a href="https://ryanparag.com">
                Portfolio/Work
              </a>
            </FooterListItem>
            <FooterListItem>
              <Link href="/create-theme">
                <a>Create a Theme</a>
              </Link>
            </FooterListItem>
            <FooterListItem>
              <Link href="/worksheets">
                <a>Worksheets</a>
              </Link>
            </FooterListItem>
            <FooterListItem>
              <Link href="/rss">
                <a>RSS</a>
              </Link>
            </FooterListItem>
          </FooterList>
          <FooterList>
            <FooterListItem>
              <a href="https://codepen.io/ryanparag">
                CodePen
              </a>
            </FooterListItem>
            <FooterListItem>
              <a href="https://github.com/ryan-parag">
                GitHub
              </a>
            </FooterListItem>
            <FooterListItem>
              <a href="https://dribbble.com/ryanparag">
                Dribbble
              </a>
            </FooterListItem>
          </FooterList>
        </FooterGrid>
        <SpotifyCurrentlyPlaying/>
        <FooterBottom>
          <Link href="/">
            <a>
              <FooterLogo>
                <div style={{
                  width: '32px',
                  marginRight: designTokens.space[2],
                }}>
                  <Logo/>
                </div>
                <strong>Ryan's Notes</strong>
              </FooterLogo>
            </a>
          </Link>
          <Button small onClick={clearStorage}>Reset Theme</Button>
        </FooterBottom>
        <div style={{ marginTop: designTokens.space[3], marginBottom: designTokens.space[3] }}>
          <small>Made with Next.js and Styled Components</small>
        </div>
      </FooterInner>
    </FooterContainer>
  )
}