import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'
import Logo from '@components/Logo'
import { Button, ButtonAnchorTag } from '@components/Button'
import { GitHub, Dribbble, Codepen, Send } from 'react-feather'

const IconLink = styled.a`
  align-items: center;
  background: transparent;
  border: none;
  border-radius: ${designTokens.space[2]};
  cursor: pointer;
  display: inline-flex;
  height: calc(${designTokens.space[5]} + ${designTokens.space[1]});
  justify-content: center;
  padding: 0;
  transition: background-color .2s ease;
  width: calc(${designTokens.space[5]} + ${designTokens.space[1]});
  svg {
    transition: all 120ms ease-out 60ms;
  }
  &:hover, &:focus {
    background-color: var(--primaryTransparent);
    color: var(--primaryDark);
    svg {
      transform: scale(1.2);
    }
  }
`

const IconBar = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${designTokens.space[3]};
  a {
    margin-left: ${designTokens.space[2]};
  }
`

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
`

const FooterWide = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  margin-top: ${designTokens.space[5]};
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
            width: designTokens.space[5],
            marginRight: designTokens.space[2]
          }}>
            <Logo/>
          </div>
          <strong>Ryan's Notes</strong>
        </FooterLogo>
      </a>
    </Link>
  )
}

const DescriptionSection = () => {

  const clearStorage = () => {
    localStorage.removeItem('ryansNotesNewTheme')
    localStorage.removeItem('customThemes')
    window.location.reload()
  }

  const social = [
    {
      name: 'CodePen',
      href: 'https://codepen.io/ryanparag',
      outbound: true,
      icon: <Codepen size={'16'}/>
    },{
      name: 'GitHub',
      href: 'https://github.com/ryan-parag',
      outbound: true,
      icon: <GitHub size={'16'}/>
    },{
      name: 'Dribbble',
      href: 'https://dribbble.com/ryanparag',
      outbound: true,
      icon: <Dribbble size={'16'}/>
    },{
      name: 'Email',
      href: 'mailto:parag.ryam@gmail.com?subject=Hey Ryan!',
      outbound: true,
      icon: <Send size={'16'}/>
    }
  ]

  return(
    <FooterWide>
      <LogoLink/>
      <IconBar>
        <Button small onClick={clearStorage}>Reset Theme</Button>
        {
          social.map(item => (
            <IconLink key={item.name} aria-label={item.name} href={item.href}>
              {item.icon}
            </IconLink>
          ))
        }
      </IconBar>
      <div style={{ marginTop: designTokens.space[3], marginBottom: designTokens.space[3], fontSize: designTokens.fontSizes[1] }}>
        <small>Made with Next.js and Styled Components</small>
      </div>
    </FooterWide>
  )
}

export default function Footer() {

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
      name: 'Create a Theme',
      href: '/create-theme',
      outbound: false
    }
  ]

  const list2 = [
    {
      name: 'Recent Listens',
      href: '/listening',
      outbound: false
    },{
      name: 'Worksheets',
      href: '/worksheets',
      outbound: false
    },{
      name: 'RSS',
      href: '/rss',
      outbound: false
    }
  ]

  const list3 = [
    {
      name: 'Portfolio/Work',
      href: 'https://ryanparag.com',
      outbound: true
    },{
      name: 'About',
      href: '/about',
      outbound: false
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
        <FooterList>
          {
            list3.map((item,i) => (
              <FooterLink key={i} link={item}/>
            ))
          }
        </FooterList>
        <DescriptionSection/>
      </FooterInner>
    </FooterContainer>
  )
}