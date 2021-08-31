import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

export const ButtonBase = css`
  padding: ${(props) => props.small ? designTokens.space[1] : designTokens.space[2]} ${(props) => props.small ? designTokens.space[2] : designTokens.space[3]};
  display: inline-flex;
  align-items:center;
  justify-content: center;
  font-weight: ${(props) => props.small ? '400' : '700'};
  cursor: pointer;
  font-size: ${(props) => props.small ? designTokens.sizing._sm : designTokens.sizing._base};
  border-radius: ${designTokens.space[2]};
  border: 1px solid var(--grey300);
  color: var(--grey900);
  background: transparent;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.14);
  min-height: ${(props) => props.small ? designTokens.space[5] : designTokens.space[6]};
  margin-top: ${(props) => props.marginTop ? props.marginTop : '0'};
  margin-bottom: ${(props) => props.marginBottom ? props.marginBottom : '0'};
  margin-left: ${(props) => props.marginLeft ? props.marginLeft : '0'};
  margin-right: ${(props) => props.marginRight ? props.marginRight : '0'};
  transition: all 120ms ease-out 0s;
  .buttonIcon {
    transform: rotate(6deg) translateX(-2px);
    margin-right: ${designTokens.space[2]};
    transition: all 120ms ease-out 60ms;
  }
  &:hover {
    background: var(--grey100);
    color: var(--grey800);
    text-decoration: none;
    position: relative;
  }
  &:focus {
    outline: ${designTokens.space[1]} solid var(--primaryTransparent);
  }
  &:hover, &:focus {
    box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 5px rgba(0,0,0,0.12);
    .buttonIcon {
      transform: rotate(12deg) translateX(-2px) scale(1.1);
    }
  }
`

export const ButtonBlock = css`
  display: flex;
  justify-content: center;
  width: 100%;
`

export const ButtonMain = css`
  ${ButtonBase}
  background: var(--primary);
  color: var(--grey0);
  &:hover, &:focus {
    background: var(--primaryDark);
    color: var(--grey0);
  }
`

export const ButtonSecondaryStyles = css`
  ${ButtonBase}
  background: var(--secondaryTransparent);
  color: var(--secondaryDark);
  border: 0;
  box-shadow: none;
  &:hover, &:focus {
    background: var(--secondary);
    color: var(--grey0);
  }
`

const IconButtonBase = css`
  padding: 0;
  color: var(--grey600);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  color: inherit;
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: ${designTokens.space[2]};
  border: 1px solid var(--grey200);
  background: linear-gradient(to top, var(--grey100), var(--grey0));
  box-shadow: 0px 1px 3px rgba(0,0,0,0.14);
  transition: all 120ms ease-out 0s;
  svg {
    fill: currentColor;
    color: inherit;
  }
  &:hover, &:focus {
    border-color: var(--grey300);
    background: var(--grey800);
    color: var(--grey0);
  }
  &:focus {
    outline: ${designTokens.space[1]} solid var(--primaryTransparent);
  }
`

const SmallButtonStyles = css`
  text-decoration: none;
  overflow-wrap: break-word;
  border-radius: ${designTokens.space[1]};
  padding-left: ${designTokens.space[1]};
  padding-right: ${designTokens.space[1]};
  padding-top: ${designTokens.space[1]};
  padding-bottom: ${designTokens.space[1]};
  background: var(--grey200);
  border: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: all 120ms ease-out 0s;
  &:hover,&:focus {
    background: var(--primaryTransparent);
    box-shadow: 0px 0px 0px 2px var(--primaryTransparent);
  }
`

export const SmallButton = styled.button`
  ${SmallButtonStyles}
`

export const SmallButtonDanger = styled.button`
  ${SmallButtonStyles}
  background: var(--secondaryTransparent);
  color: var(--secondaryDark);
  &:hover,&:focus {
    background: var(--secondaryTransparent);
    box-shadow: 0px 0px 0px 2px var(--secondaryTransparent);
  }
`

export const ButtonLink = styled.span`
  a {
    ${ButtonBase}
  }
`

export const ButtonAnchorTag = styled.a`
  ${ButtonBase}
`

export const Button = styled.button`
  ${ButtonBase}
`

export const IconButtonLink = styled.span`
  a {
    ${IconButtonBase}
  }
`

export const IconAnchorTag = styled.a`
  ${IconButtonBase}
`

export const IconButton = styled.button`
  ${IconButtonBase}
`

export const IconButtonPrimary = styled.button`
  ${IconButtonBase}
  background: linear-gradient(to top, var(--primaryDark), var(--primary));
  color: var(--grey0);
`

export const ButtonPrimary = styled.button`
  ${ButtonMain}
`

export const ButtonSecondary = styled.button`
  ${ButtonSecondaryStyles}
`

export const ButtonPrimaryLink = styled.span`
  a {
    ${ButtonMain}
  }
`

export const ButtonPrimaryAnchorTag = styled.a`
  ${ButtonMain}
`