import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import { Send } from 'react-feather'
import { ButtonAnchorTag, SmallButton, Button } from '@components/Button'
import { Check, Copy, Edit3, GitHub, Linkedin } from 'react-feather'
import List, { ListItem } from '@components/List'
import { Label, Body, ItemTitle } from '@components/Typography'

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

const ListInner = styled.div`
  padding: ${designTokens.space[3]} 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

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

export const ContactList = () => {

  const data = {
    email: 'parag.ryan@gmail.com',
    resume: '/static/about/RyanParag-resume.pdf',
    github: 'https://github.com/ryan-parag',
    linkedin: 'https://linkedin.com/in/ryan-parag'
  }

  const [copy, setCopy] = useState(false)

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const copyLink = () => {
    copyTextToClipboard(data.email)
    .then(() => {
      setCopy(true)
    })
  }

  useEffect(() => {
    setTimeout(() => {
      setCopy(false)
    }, 3000)
  },[copy])

  return(
    <>
      <h5>Contact</h5>
      <List>
        <ListItem>
          <ListInner>
            <div>
              <Body>Email 📬</Body>
              <Label subtle mt={2} mb={3}>{data.email}</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <a className="link" href={`mailto:${data.email}?subject=Hey Ryan!`}>
                <Edit3 size={16} style={{ marginRight: designTokens.space[1] }}/>
                Compose
              </a>
              <span style={{ margin: `0 ${designTokens.space[1]}`}}>|</span>
              {
                copy ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <Check size={16} style={{ marginRight: designTokens.space[1], color: 'var(--primaryDark)' }}/>
                    Copied
                  </span>
                )
                :
                (
                  <button onClick={() => copyLink()} className="link">
                    <Copy size={16} style={{ marginRight: designTokens.space[1] }}/>
                    Copy
                  </button>
                )
              }
              <input style={{ opacity: '0', width: '0', height: '0', position: 'fixed', top: '-9999px', left: '-9999px' }}type="text" value={data.email} readOnly />
            </div>
          </ListInner>
        </ListItem>
        <ListItem>
          <ListInner>
            <div>
              <Body>Resumé 👨‍💼</Body>
              <Label subtle mt={2} mb={3}>Download a PDF of my resumé</Label>
            </div>
            <div>
              <a href={data.resume} target="_blank" className="link">Download</a>
            </div>
          </ListInner>
        </ListItem>
        <ListItem>
          <ListInner>
            <div>
              <Body>Stay in touch 👯‍♀️</Body>
              <Label subtle mt={2} mb={3}>Check out what I'm currently up to</Label>
            </div>
            <div>
              <a className="link" href={data.github} target="_blank">
                <GitHub size={16} style={{ marginRight: designTokens.space[1] }}/>
                GitHub
              </a>
              <span style={{ margin: `0 ${designTokens.space[1]}`}}>|</span>
              <a className="link" href={data.linkedin} target="_blank">
                <Linkedin size={16} style={{ marginRight: designTokens.space[1] }}/>
                LinkedIn
              </a>
            </div>
          </ListInner>
        </ListItem>
      </List>
    </>
  )
}