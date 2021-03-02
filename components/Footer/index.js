import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'
import Logo from '@components/Logo'
import { Button, ButtonAnchorTag } from '@components/Button'

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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: ${designTokens.space[4]};
  @media screen and (min-width: ${designTokens.breakpoints[0]}) {
    max-width: ${designTokens.layoutWidth.lg};
  }
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

const FooterLogo = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: ${designTokens.space[4]};
`

const FooterWide = styled.div`
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    grid-column-start: 1;
    grid-column-end: 3;
  }
`

const FooterLink = ({link}) => {
  return(
    <>
      {
        link.outbound ? (
          <FooterListItem>
            <a href={link.href}>
              {link.name}
            </a>
          </FooterListItem>
        )
        :
        (
          <FooterListItem>
            <Link href={link.href}>
              <a>{link.name}</a>
            </Link>
          </FooterListItem>
        )
      }
    </>
  )
}

const LogoLink = () => {
  return(
    <Link href="/">
      <a>
        <FooterLogo>
          <div style={{
            width: '32px',
          }}>
            <Logo/>
          </div>
          <strong>Ryan's Notes</strong>
        </FooterLogo>
      </a>
    </Link>
  )
}

const DescriptionSection = ({children}) => {
  return(
    <FooterWide>
      <LogoLink/>
      {children}
      <div style={{ marginTop: designTokens.space[3], marginBottom: designTokens.space[3], fontSize: designTokens.fontSizes[1] }}>
        <small>Made with Next.js and Styled Components</small>
      </div>
    </FooterWide>
  )
}

export default function Footer() {

  const clearStorage = () => {
    localStorage.removeItem('ryansNotesNewTheme')
    localStorage.removeItem('customThemes')
    window.location.reload()
  }

  const list1 = [
    {
      name: 'Home',
      href: '/',
      outbound: false
    },{
      name: 'Notes/Writing',
      href: '/notes',
      outbound: false
    },{
      name: 'Recent Listens',
      href: '/listening',
      outbound: false
    },{
      name: 'Create a Theme',
      href: '/create-theme',
      outbound: false
    },{
      name: 'Worksheets',
      href: '/worksheets',
      outbound: false
    },{
      name: 'About',
      href: '/about',
      outbound: false
    }
  ]

  const list2 = [
    {
      name: 'Portfolio/Work',
      href: 'htts://ryanparag.com',
      outbound: true
    },{
      name: 'RSS',
      href: '/rss',
      outbound: false
    },{
      name: 'CodePen',
      href: 'https://codepen.io/ryanparag',
      outbound: true
    },{
      name: 'GitHub',
      href: 'https://github.com/ryan-parag',
      outbound: true
    },{
      name: 'Dribbble',
      href: 'https://dribbble.com/ryanparag',
      outbound: true
    }
  ]

  return(
    <FooterContainer>
      <FooterInner>
        <FooterList>
          {
            list1.map((item, i) => (
              <FooterLink key={i} link={item}/>
            ))
          }
        </FooterList>
        <FooterList>
          {
            list2.map((item,i) => (
              <FooterLink key={i} link={item}/>
            ))
          }
        </FooterList>
        <DescriptionSection>
          <div
            style={{
              marginTop: designTokens.space[3],
              marginBottom: designTokens.space[3],
              }}
            >
            <Button small onClick={clearStorage}>Reset Theme</Button>
          </div>
          <div
            style={{
              marginTop: designTokens.space[3],
              marginBottom: designTokens.space[3],
              }}
            >
            <ButtonAnchorTag small target="_blank" href="https://github.com/ryan-parag/notes.ryanparag.com">View on GitHub</ButtonAnchorTag>
          </div>
        </DescriptionSection>
      </FooterInner>
    </FooterContainer>
  )
}