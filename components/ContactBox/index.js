import React from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const ContactContainer = styled.article`
  padding: ${designTokens.space[4]};
  display: flex;
  align-items: center;
  border: 1px solid var(--grey200);
  border-radius: ${designTokens.space[2]};
`

const ContactTitle = styled.h5`
  font-size: ${designTokens.fontSizes[2]};
  margin-top: 0;
  margin-bottom: ${designTokens.space[2]};
`

const ContactContent = styled.div`
  padding-left: ${designTokens.space[4]};
  width: 100%;
  p {
    font-size: ${designTokens.fontSizes[1]};
    line-height: 150%;
    color: var(--grey700);
    margin-top: 0;
  }
  p:last-of-type {
    margin-bottom: 0;
  }
`

const ImgContainer = styled.div`
  width: calc(${designTokens.space[7]} + ${designTokens.space[1]});
  height: calc(${designTokens.space[7]} + ${designTokens.space[1]});
  display: inline-flex;
  background: var(--primaryTransparent);
  border: 1px solid var(--primaryTransparent);
  align-items: center;
  justify-content: center;
  padding: ${designTokens.space[1]};
  border-radius: 50%;
  flex-shrink: 0;
`

const ImgProfile = styled.img`
  display: block;
  width: 100%;
`

export default function ContactBox() {
  return(
    <ContactContainer>
      <ImgContainer>
        <ImgProfile src="/static/thanks.png"/>
      </ImgContainer>
      <ContactContent>
        <ContactTitle>
          Thanks for reading!
        </ContactTitle>
        <p>
          I'm <a href="https://ryanparag.com">Ryan</a> and I'm a product designer - currently based in Tampa, FL. If you're looking for help or would like to chat, <a href="mailto:parag.ryan@gmail.com">reach out</a>!
        </p>
      </ContactContent>
    </ContactContainer>
  )
}