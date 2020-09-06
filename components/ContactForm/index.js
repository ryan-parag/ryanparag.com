import React from 'react'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'
import { useForm, ValidationError } from '@statickit/react';
import Link from 'next/link'
import { ButtonLink } from '@components/Button'

const ContactContainer = styled.div`
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

const LinkContainer = styled.div`
  padding: ${designTokens.space[7]} 0 0;
  display: flex;
  justify-content: center;
`

const Button = styled.button`
  font-family: inherit;
  border: 1px solid var(--primaryTransparent);
  color: var(--primaryDark);
  padding: ${designTokens.space[3]};
  margin-top: ${designTokens.space[5]};
  cursor: pointer;
  transition: all 120ms ease-out 0s;
  border-radius: ${designTokens.space[2]};
  background: var(--primaryTransparent);
  box-shadow: 0px 1px 3px rgba(0,0,0,0.14);
  &:hover, &:focus {
    border-color: var(--primary);
  }
`

const ButtonBlock = styled(Button)`
  display: block;
  width: 100%;
`

const EmptyStateIcon = styled.div`
  display: inline-flex;
  background: var(--primaryTransparent);
  color: var(--primary);
  align-items: center;
  justify-content: center;
  width: ${designTokens.space[7]};
  height: ${designTokens.space[7]};
  margin-bottom: ${designTokens.space[2]};
  border-radius: 50%;
`

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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

export default function ContactForm() {
  
  const [state, handleSubmit] = useForm("contactForm");
  if (state.succeeded) {
    return(
      <EmptyState>
        <EmptyStateIcon>
          <svg width="48" height="48" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
            <polyline points='416 128 192 384 96 288' style={{
              fill: 'none',
              stroke: 'currentColor',
              strokeLinecap: 'round',
              strokeLinejoin:'round',
              strokeWidth: '32px'
            }}/>
          </svg>
        </EmptyStateIcon>
        <h4>Message Sent!</h4>
      </EmptyState>
    )
  }

  return(
    <>
      <ContactContainer>
        <ImgContainer>
          <ImgProfile src="/static/thanks.png"/>
        </ImgContainer>
        <ContactContent>
          <ContactTitle>
            Thanks for reading!
          </ContactTitle>
          <p>
            I'm <a href="https://ryanparag.com">Ryan</a> and I'm a designer who codes - currently based in Tampa, FL. If you're looking for help or would like to chat, <a href="mailto:parag.ryan@gmail.com">reach out</a>!
          </p>
        </ContactContent>
      </ContactContainer>
      <LinkContainer>
        <ButtonLink>
          <Link href="/notes/">
            <a>
              <img
                src="/static/note.svg"
                width="32"
                style={{
                  marginRight: designTokens.space[2],
                  transform: 'rotate(10deg) translateX(-4px)'
                }}
              />
              Read more notes
            </a>
          </Link>
        </ButtonLink>
      </LinkContainer>
      <hr/>
      <form onSubmit={handleSubmit}>
        <p>Do you have feedback about this post or want to suggest an idea you'd like to hear about in a future post? Send me a message!</p>
        <label htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="What is your feedback or suggestion?"
        />
        <ValidationError 
          prefix="Message" 
          field="message"
          errors={state.errors}
          style={{
            color: 'var(--secondaryDark)',
            fontSize: designTokens.fontSizes[1],
            marginBottom: designTokens.space[3],
            display: 'block'
          }}
        />
        <label htmlFor="email">
          Email Address (Optional)
        </label>
        <input
          id="email"
          type="email" 
          name="email"
          placeholder="kimi.raikkonen@gmail.com"
        />
        <ButtonBlock type="submit" disabled={state.submitting}>
          Send Message
        </ButtonBlock>
      </form>
    </>
  )
}