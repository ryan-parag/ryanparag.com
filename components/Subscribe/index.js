import React from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import Link from 'next/link'
import MailchimpSubscribe from "react-mailchimp-subscribe"
import Logo from '@components/Logo'
import { ButtonMain, ButtonBlock} from '@components/Button'

const SubscribeContainer = styled.div`
  padding: ${designTokens.space[4]};
  box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.12);
  background: var(--grey100);
  border-radius: ${designTokens.space[2]};
  margin-bottom: ${designTokens.space[6]};
  input {
    padding: ${designTokens.space[3]} ${designTokens.space[3]};
    margin-bottom: ${designTokens.space[4]};
    background: var(--grey0);
    box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.2), 0px 4px 12px -2px rgba(0,0,0,0.06);
  }
  button {
    ${ButtonBlock}
    ${ButtonMain}
  }
`

const SubscribeAvatar = styled.div`
  width: ${designTokens.space[6]};
  margin-bottom: ${designTokens.space[3]};
`

export default function Subscribe() {
  return(
    <SubscribeContainer>
      <SubscribeAvatar>
        <Logo/>
      </SubscribeAvatar>
      <h3 style={{ marginTop: '0' }}>Subscribe for Updates!</h3>
      <p>Would you like a quick, monthly update about new posts/notes, side projects I'm building, design portfolios I'm stalking, and possibly a few other things I'm finding interesting? If you're into that, add your email to the mailing list!</p>
      <p>
        <small>
          You can also <strong><Link href="/rss"><a className="link">subscribe via RSS</a></Link></strong>.
        </small>
      </p>
      <MailchimpSubscribe url={process.env.REACT_APP_MAILCHIMP_URL} />
    </SubscribeContainer>
  )
}