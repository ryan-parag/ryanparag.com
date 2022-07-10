import React, { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'
import { LogoWithLabel } from '@components/Logo'
import { Button, ButtonAnchorTag } from '@components/Button'
import { GitHub, Dribbble, Codepen, Send, Linkedin } from 'react-feather'
import { Wrapper } from '@components/Layout/'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { LoadingSmall } from '@components/LoadingBox'
import { format } from 'timeago.js' 

export const IconLink = styled.a`
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
  margin: ${designTokens.space[3]} 0;
  a {
    margin-right: ${designTokens.space[2]};
  }
`

const FooterContainer = styled.footer`
  width: 100%;
  padding: ${designTokens.space[6]} 0 ${designTokens.space[7]};
  border-top: 1px solid var(--grey100);
  color: var(--grey600);
`

const FooterInner = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: ${designTokens.space[4]};
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
  margin-bottom: calc(${designTokens.space[2]} + ${designTokens.space[1]});
  a {
    font-size: ${designTokens.sizing._sm};
    color: var(--grey600);
    padding: ${designTokens.space[1]} ${designTokens.space[1]} ${designTokens.space[1]} 0;
    transition: all 120ms ease-out 0s;
    &:hover, &:focus {
      background: var(--grey100);
      padding-left: ${designTokens.space[3]};
      box-shadow: inset ${designTokens.space[1]} 0px 0px var(--primary);
    }
  }
`

const FooterWide = styled.div`
  margin-top: ${designTokens.space[5]};
`

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const BottomColumn = styled.div`
  padding: ${designTokens.space[2]} 0;
  display: inline-flex;
  align-items: center;
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

const Repo = () => {

  const { data, error } = useSWR('/api/site', fetcher);

  if(error) {
    return null
  }

  return (
    <>
      {
        data ? (
          <div>
            <small>
              <a
                className="link"
                href={data.repo.link}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  marginRight: designTokens.space[2]
                }}
              >
                View Source
              </a>
            </small>
            <small style={{ color: 'var(--grey700)'}}>
              Last Updated {format(data.repo.updated)}
            </small>
          </div>
        )
        :
        (
          <LoadingSmall/>
        )
      }
    </>
  )
}

const DescriptionSection = ({debug,debugGrid}) => {

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
      name: 'Linkedin',
      href: 'https://linkedin.com/in/ryan-parag',
      outbound: true,
      icon: <Linkedin size={'16'}/>
    },{
      name: 'Email',
      href: 'mailto:parag.ryan@gmail.com?subject=Hey Ryan!',
      outbound: true,
      icon: <Send size={'16'}/>
    }
  ]

  return(
    <FooterWide>
      <LogoWithLabel logo/>
      <IconBar>
          {
            social.map(item => (
              <IconLink key={item.name} aria-label={item.name} href={item.href}>
                {item.icon}
              </IconLink>
            ))
          }
      </IconBar>
      <BottomContainer>
      <BottomColumn>
        <Repo/>
      </BottomColumn>
      <BottomColumn>
        <Button small onClick={clearStorage}>Reset Theme</Button>
      </BottomColumn>
      </BottomContainer>
    </FooterWide>
  )
}

export default function Footer({debug, debugGrid}) {

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
      name: 'Portfolio/Work',
      href: '/work',
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
      name: 'Create a Theme',
      href: '/create-theme',
      outbound: false
    }
  ]

  const list3 = [
    {
      name: 'About',
      href: '/about',
      outbound: false
    },{
      name: 'RSS',
      href: '/rss',
      outbound: false
    },{
      name: 'Now',
      href: '/now',
      outbound: false
    }
  ]

  return(
    <>
      <FooterContainer>
        <Wrapper>
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
          </FooterInner>
          <DescriptionSection debug={debug} debugGrid={debugGrid} />
        </Wrapper>
      </FooterContainer>
    </>
  )
}