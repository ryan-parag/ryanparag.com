import React from 'react'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'
import { useForm, ValidationError } from '@statickit/react';
import Link from 'next/link'
import { ButtonMain, ButtonBlock } from '@components/Button'

const SendButton = styled.button`
  ${ButtonMain}
  ${ButtonBlock}
`

const FeedbackForm = styled.form`
  padding: ${designTokens.space[4]};
  box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.12);
  background: var(--grey100);
  border-radius: ${designTokens.space[2]};
  margin-bottom: ${designTokens.space[3]};
  margin-top: ${designTokens.space[4]};
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
  margin-bottom: ${designTokens.space[4]};
  background: var(--grey0);
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.2), 0px 4px 12px -2px rgba(0,0,0,0.06);
`

const TextInput = styled.input`
  padding: ${designTokens.space[3]} ${designTokens.space[3]};
  margin-bottom: ${designTokens.space[4]};
  background: var(--grey0);
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.2), 0px 4px 12px -2px rgba(0,0,0,0.06);
  margin-bottom: ${designTokens.space[4]};
`

const ImgAvatar = styled.div`
  width: ${designTokens.space[6]};
  margin-bottom: ${designTokens.space[3]};
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
        <h3 style={{ marginBottom: designTokens.space[2] }}>Thanks for the feedback!</h3>
        <p>I'll do my best to reply quickly 👍.</p>
      </EmptyState>
    )
  }

  return(
    <>
      <FeedbackForm onSubmit={handleSubmit}>
        <ImgAvatar>
          <svg width="43" height="49" viewBox="0 0 43 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
            <g clipPath="url(#clip1)">
            <path d="M18.0997 4.35587C6.87346 6.33536 -0.623114 17.0457 1.3558 28.2686C3.33587 39.4982 14.0423 46.992 25.2686 45.0126C36.4948 43.0331 43.9925 32.3293 42.0125 21.0998C40.0336 9.87681 29.3259 2.37638 18.0997 4.35587ZM24.5748 41.078C15.5146 42.6756 6.88841 36.6381 5.29031 27.5749C3.69329 18.5177 9.73358 9.88789 18.7935 8.29039C27.8503 6.69342 36.4804 12.7336 38.078 21.7935C39.6755 30.8536 33.6381 39.4799 24.5748 41.078ZM29.677 18.6095C30.6461 24.1057 24.7248 25.237 25.0829 27.2681L25.1745 27.7875C25.2703 28.3308 24.9075 28.8488 24.3643 28.9446L20.6227 29.6044C20.0795 29.7002 19.5614 29.3374 19.4656 28.7942L19.3404 28.0844C18.8238 25.1544 20.8386 23.5915 22.3513 22.3543C23.6485 21.2935 24.434 20.5891 24.2455 19.5204C23.9963 18.1067 22.0276 17.4864 20.5697 17.7435C18.669 18.0786 17.9501 19.1331 16.9912 20.9074C16.7326 21.3857 16.1395 21.5706 15.6558 21.3223L13.0701 19.9951C12.5955 19.7515 12.3978 19.1784 12.6169 18.6921C14.0521 15.5067 16.2372 13.4741 20.0778 12.7969C24.1001 12.0877 28.9472 14.4704 29.677 18.6095V18.6095ZM26.7456 33.2577C27.0803 35.156 25.8083 36.9727 23.91 37.3075C22.0116 37.6422 20.1949 36.3701 19.8602 34.4718C19.5255 32.5735 20.7975 30.7568 22.6959 30.4221C24.5942 30.0873 26.4109 31.3594 26.7456 33.2577Z" fill="var(--grey500)"/>
            </g>
            </g>
            <defs>
            <clipPath id="clip0">
            <rect width="43" height="49" fill="white"/>
            </clipPath>
            <clipPath id="clip1">
            <rect width="42.6156" height="42.6156" fill="white" transform="translate(-3 7.40015) rotate(-10)"/>
            </clipPath>
            </defs>
          </svg>
        </ImgAvatar>
        <h3 style={{ marginTop: '0' }}>Have feedback?</h3>
        <p>I'd love to see if this was helpful or if there was anything I should look to update - let me know below!</p>
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
            fontSize: designTokens.sizing._sm,
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
        <SendButton type="submit" disabled={state.submitting}>
          Send Message
        </SendButton>
      </FeedbackForm>
    </>
  )
}