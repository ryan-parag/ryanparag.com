import React from 'react'
import styled, { css } from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import { ArrowRight } from 'react-feather'
import { ButtonAnchorTag } from '@components/Button'

export const ContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  border: 1px solid var(--grey200);
  border-radius: ${designTokens.space[2]};
  margin-bottom: ${designTokens.space[4]};
  position: relative;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.12);
  transition: all 120ms ease-out 0s;
`

const Hero = styled.img`
  display: block;
  width: 100%;
  border-top-right-radius: ${designTokens.space[2]};
  border-top-left-radius: ${designTokens.space[2]};
`

const ContainerLink = styled.a`
  ${ContainerStyles}
  margin-bottom: ${designTokens.space[6]};
  &:hover, &:focus {
    text-decoration: none;
    background: var(--grey100);
    ${Hero} {
      opacity: .9;
    }
    svg {
      margin-left: ${designTokens.space[3]};
    }
  }
`

const Container = styled.div`
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

const Content = styled.div`
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

const InlineButton = styled.div`
  display: inline-flex;
  align-items: center;
  color: var(--grey900);
  border-radius: calc(${designTokens.space[1]}/2);
  transition: all 120ms ease-out 0s;
  font-weight: ${designTokens.fontWeights.bold};
  font-size: ${designTokens.sizing._sm};
  svg {
    margin-left: ${designTokens.space[2]};
    color: var(--primary);
    transition: all 120ms ease-out 0s;
  }
`

export const Card = ({img, title, children, button, link}) => {
  return(
    <>
      {
        link ? (
          <ContainerLink href={link}>
            {
              img && (
                <Hero src={img} />
              )
            }
            <Content>
              {
                title && (
                  <ContactH3>
                    {title}
                  </ContactH3>
                )
              }
              {children}
            </Content>
            {
              button && (
                <ContentFooter>
                  <InlineButton>
                    {button}
                    <ArrowRight
                      size={'20'}
                    />
                  </InlineButton>
                </ContentFooter>
              )
            }
          </ContainerLink>
      )
      :
      (
        <Container>
          {
            img && (
              <Hero src={img} />
            )
          }
          <Content>
            {
              title && (
                <ContactH3>
                  {title}
                </ContactH3>
              )
            }
            {children}
          </Content>
          {
            button && (
              <ContentFooter>
                <InlineButton>
                  {button}
                  <ArrowRight
                    size={'20'}
                  />
                </InlineButton>
              </ContentFooter>
            )
          }
        </Container>
      )
    }
    </>
  )
}

export default Card