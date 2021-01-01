import React from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import { ButtonBase } from '@components/Button'
import Link from 'next/link'
import MailchimpSubscribe from "react-mailchimp-subscribe"

const SubscribeContainer = styled.div`
  padding: ${designTokens.space[4]};
  box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.12);
  background: var(--grey100);
  border-radius: ${designTokens.space[2]};
  margin-bottom: ${designTokens.space[6]};
  input {
    padding: ${designTokens.space[3]} ${designTokens.space[3]};
    margin-bottom: ${designTokens.space[1]};
    background: var(--grey0);
    @media screen and (min-width: ${designTokens.breakpoints[4]}) {
      margin-right: ${designTokens.space[3]};
    }
  }
  button {
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
    display: block;
    width: 100%;
  }
`

export default function Subscribe() {
  return(
    <SubscribeContainer>
      <h4 style={{ marginTop: '0' }}>Subscribe for Updates!</h4>
      <p>Would you like to be updated about new posts (and maybe some things I'm finding interesting) monthly? Add your email to the mailing list! You can also <strong><Link href="/rss"><a className="link">subscribe via RSS</a></Link></strong>.</p>
      <MailchimpSubscribe url={process.env.REACT_APP_MAILCHIMP_URL} />
    </SubscribeContainer>
  )
}