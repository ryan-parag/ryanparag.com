import React from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import { Send } from 'react-feather'

const ContactContainer = styled.a`
  padding-top: ${designTokens.space[5]};
  display: flex;
  flex-direction: column;
  align-items: start;
  border: 1px solid var(--grey200);
  border-radius: ${designTokens.space[2]};
  margin-bottom: ${designTokens.space[6]};
  position: relative;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.12);
  transition: all 120ms ease-out 0s;
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

const ContactTitle = styled.h3`
  margin-top: 0;
  margin-bottom: ${designTokens.space[2]};
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
  font-size: ${designTokens.fontSizes[1]};
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

export default function ContactBox() {
  return(
    <ContactContainer href="mailto:parag.ryan@gmail.com">
      <ImgContainer>
        <img src="/static/thanks.png"/>
      </ImgContainer>
      <ContactContent>
        <ContactTitle>
          Hey, I'm Ryan!
        </ContactTitle>
        <p>
          I'm a product designer - currently based in Tampa, FL. If you're looking for help or would like to chat, reach out!
        </p>
      </ContactContent>
      <ContentFooter>
        <Send size="20"/>
        Send me an email!
      </ContentFooter>
    </ContactContainer>
  )
}