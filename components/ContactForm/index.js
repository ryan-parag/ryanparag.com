import React from 'react'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'
import { useForm, ValidationError } from '@statickit/react';
import Link from 'next/link'
import { ButtonLink } from '@components/Button'
import ContactBox from '@components/ContactBox'

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

const TextArea = styled.textarea`
  padding: ${designTokens.space[3]} ${designTokens.space[3]};
`

const TextInput = styled.input`
  padding: ${designTokens.space[3]} ${designTokens.space[3]};
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
      <ContactBox/>
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
        <TextArea
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
        <TextInput
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