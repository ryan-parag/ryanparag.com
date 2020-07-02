import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'

const FooterContainer = styled.footer`
  width: 100%;
  padding: ${designTokens.space[6]} ${designTokens.space[3]};
  border-top: 1px solid var(--grey100);
  color: var(--grey600);
`

const FooterInner = styled.div`
  width: 100%;
  max-width: ${designTokens.layoutWidth};
  margin: auto;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    text-align: center;
  }
`

const FooterList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    justify-content: center;
    padding: 0 ${designTokens.space[3]};
  }
`

const FooterListItem = styled.li`
  margin-bottom: ${designTokens.space[3]};
  margin-right: ${designTokens.space[3]};
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
const FooterButton = styled.button`
  padding: ${designTokens.space[2]};
  border: 1px solid var(--grey200);
  border-radius: ${designTokens.space[1]};
  margin-top: ${designTokens.space[3]};
  display: inline-block;
  font-family: inherit;
  font-size: ${designTokens.fontSizes[0]};
  cursor: pointer;
  background: transparent;
  transition: all 120ms ease-out 0s;
  &:hover, &:focus {
    background: var(--grey100);
  }
`

export default function Footer() {
  const clearStorage = () => {
    localStorage.removeItem('theme')
    window.location.reload()
  }

  return(
    <FooterContainer>
      <FooterInner>
        <FooterList>
          <FooterListItem>
            <Link href="/">
              Notes
            </Link>
          </FooterListItem>
          <FooterListItem>
            <Link href="/about">
              About
            </Link>
          </FooterListItem>
          <FooterListItem>
            <a href="https://ryanparag.com">
              Portfolio
            </a>
          </FooterListItem>
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
        <small>Made with Next.js and Styled Components</small>
        <br/>
        <FooterButton onClick={clearStorage}>Clear Storage</FooterButton>
      </FooterInner>
    </FooterContainer>
  )
}