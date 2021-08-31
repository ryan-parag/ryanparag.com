import React from 'react'
import styled, { css } from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import { Send } from 'react-feather'
import { ButtonAnchorTag } from '@components/Button'

export const ContainerStyles = css`
  padding-top: ${designTokens.space[5]};
  display: flex;
  flex-direction: column;
  align-items: start;
  border: 1px solid var(--grey200);
  border-radius: ${designTokens.space[2]};
  margin-bottom: ${designTokens.space[4]};
  position: relative;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.12);
  transition: all 120ms ease-out 0s;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    padding-top: ${designTokens.space[6]};
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
  left: ${designTokens.space[3]};
  background: var(--grey0);
  top: -${designTokens.space[6]};
  width: calc(${designTokens.space[8]} + ${designTokens.space[2]});
  height: calc(${designTokens.space[8]} + ${designTokens.space[2]});
  border-radius: 50%;
  padding: ${designTokens.space[2]};
  border: ${designTokens.space[2]} solid var(--grey0);
  z-index: 2;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    width: ${designTokens.space[8]};
    height: ${designTokens.space[8]};
    top: -${designTokens.space[5]};
  }
  img {
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 120ms ease-out 0s;
    width: calc(${designTokens.space[7]} + ${designTokens.space[2]});
    display: block;
  }
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
    background: var(--primaryTransparent);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
`

const ProfileImageFlares = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: transparent;
  user-select: none;
  &:before, &:after {
    content: '';
    position: absolute;
    top: -${designTokens.space[5]};
    right: -${designTokens.space[2]};
    width: ${designTokens.space[4]};
    height: ${designTokens.space[4]};
    display: block;
    background: var(--secondaryTransparent);
    border-radius: 50%;
  }
  &:after {
    top: 0;
    right: -${designTokens.space[4]};
    width: ${designTokens.space[3]};
    height: ${designTokens.space[3]};
    background: var(--tertiaryTransparent);
  }
`
const InlineButton = styled.a`
  display: inline-flex;
  align-items: center;
  color: var(--grey900);
  border-radius: calc(${designTokens.space[1]}/2);
  transition: all 120ms ease-out 0s;
  font-weight: ${designTokens.fontWeights.bold};
  font-size: ${designTokens.sizing._base};
  svg {
    margin-right: ${designTokens.space[3]};
  }
  &:hover, &:focus {
    background: var(--primaryTransparent);
    box-shadow: 0px 0px 0px ${designTokens.space[2]} var(--primaryTransparent);
  }
`

export const EmailButton = () => {
  return(
    <ButtonAnchorTag href="mailto:hello@ryanparag.com?subject=Hey Ryan!">
      <Send size="20" className="buttonIcon" style={{ color: 'var(--primary)' }} />
      Send me an email!
    </ButtonAnchorTag>
  )
}

export const EmailButtonInline = () => {
  return(
    <InlineButton href="mailto:hello@ryanparag.com?subject=Hey Ryan!">
      <Send size="20" className="buttonIcon" style={{ color: 'var(--primary)' }} />
      Send me an email!
    </InlineButton>
  )
}

const ContactBox = () => {
  return(
    <ContactContainerLink href="mailto:hello@ryanparag.com?subject=Hey Ryan!">
      <ImgContainer>
        <img src="/static/thanks.png"/>
      </ImgContainer>
      <ContactContent>
        <ContactH3>
          Hey, I'm Ryan!
        </ContactH3>
        <p>
          I'm a product designer - currently based in Tampa, FL. If you're looking for help or would like to chat, reach out!
        </p>
      </ContactContent>
      <ContentFooter>
        <Send size="20" style={{ color: 'var(--primary)' }}/>
        Send me an email!
      </ContentFooter>
    </ContactContainerLink>
  )
}

export const ContactAbout = ({img, title, children}) => {
  return(
    <ContactContainer>
      {
        img ? (
          <ImgContainer>
            <img src={img}/>
            <ProfileImageFlares/>
          </ImgContainer>
        )
        :
        null
      }
      <ContactContent>
        {
          title ? (
            <ContactH3>
              {title}
            </ContactH3>
          )
          :
          null
        }
        {children}
      </ContactContent>
      <ContentFooter>
       <EmailButtonInline/>
      </ContentFooter>
    </ContactContainer>
  )
}

export default ContactBox