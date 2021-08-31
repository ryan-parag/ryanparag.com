import React from 'react'
import styled, { css } from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import { ArrowRight } from 'react-feather'
import Link from 'next/link'

export const ContainerStyles = css`
  padding-top: ${designTokens.space[5]};
  display: flex;
  white-space: initial;
  flex-direction: column;
  align-items: start;
  border: 1px solid var(--grey200);
  border-radius: ${designTokens.space[2]};
  margin-bottom: ${designTokens.space[4]};
  position: relative;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.12);
  transition: all 120ms ease-out 0s;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    padding-top: ${designTokens.space[5]};
  }
`

const ContactContainerLink = styled.a`
  ${ContainerStyles}
  margin-bottom: ${designTokens.space[6]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    padding-top: ${designTokens.space[6]};
  }
  &:hover, &:focus {
    text-decoration: none;
    img {
      opacity: .9;
    }
  }
`

const ContactContainer = styled.div`
  ${ContainerStyles}
  &:hover, &:focus {
    opacity: 0.9;
    box-shadow: 0px 1px 3px rgba(0,0,0,0.12), 0px 5px 12px rgba(0,0,0,0.08);
  }
`

const ContactH3 = styled.h3`
  margin-top: 0;
  margin-bottom: ${designTokens.space[3]};
`

const ContactH2 = styled.h2`
  margin-top: 0;
`

const ContactH1 = styled.h1`
  margin-top: 0;
`

const ContactContent = styled.div`
  width: 100%;
  padding: ${designTokens.space[4]};
  p {
    margin-top: 0;
  }
  p:last-of-type {
    margin-bottom: 0;
  }
`

const ContentFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 1px solid var(--grey200);
  padding: ${designTokens.space[3]} ${designTokens.space[4]};
  font-size: ${designTokens.sizing._sm};
  svg {
    margin-right: ${designTokens.space[3]};
  }
`

const ImgContainer = styled.div`
  position: absolute;
  left: ${designTokens.space[4]};
  background: var(--grey0);
  top: -${designTokens.space[6]};
  width: calc(${designTokens.space[8]} - ${designTokens.space[3]});
  height: calc(${designTokens.space[8]} - ${designTokens.space[3]});
  border-radius: ${designTokens.space[3]};
  box-shadow: 0px 2px 4px rgba(0,0,0,0.12), 0px 5px 12px rgba(0,0,0,0.08);
  overflow: hidden;
  z-index: 2;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    width: ${designTokens.space[7]};
    height: ${designTokens.space[7]};
    top: -${designTokens.space[5]};
  }
  img {
    width: 100%;
    display: block;
  }
`

const Card = ({title, href, image, description}) => {
  return(
    <Link href={href}>
      <a>
        <ContactContainer>
          <ImgContainer>
            <img src={image}/>
          </ImgContainer>
          <ContactContent>
            <ContactH3>
              {title}
            </ContactH3>
            <p>
              {description}
            </p>
          </ContactContent>
          <ContentFooter>
            <ArrowRight size="20" style={{ color: 'var(--primary)' }}/>
            View Project
          </ContentFooter>
        </ContactContainer>
      </a>
    </Link>
  )
}

export default Card