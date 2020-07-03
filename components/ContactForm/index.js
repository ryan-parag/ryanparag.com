import React from 'react'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'
import { useForm, ValidationError } from '@statickit/react';

const FormButton = styled.button`
  font-family: inherit;
  border: 1px solid var(--primary);
  background: var(--primaryTransparent);
  color: var(--primaryDark);
  display: block;
  width: 100%;
  padding: ${designTokens.space[3]};
  border-radius: ${designTokens.space[1]};
  margin-top: ${designTokens.space[4]};
  cursor: pointer;
  transition: all 120ms ease-out 0s;
  &:hover, &:focus {
    border-color: var(--primaryTransparent);
  }
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
      <FormButton type="submit" disabled={state.submitting}>
        Send Message
      </FormButton>
    </form>
  )
}