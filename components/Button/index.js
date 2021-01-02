import styled, { css } from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

export const ButtonBase = css`
  padding: ${(props) => props.small ? designTokens.space[1] : designTokens.space[2]} ${(props) => props.small ? designTokens.space[2] : designTokens.space[3]};
  display: inline-flex;
  align-items:center;
  font-weight: 700;
  cursor: pointer;
  font-size: ${(props) => props.small ? designTokens.fontSizes[0] : designTokens.fontSizes[1]};
  border-radius: ${designTokens.space[2]};
  border: 1px solid var(--grey200);
  background: linear-gradient(to top, var(--grey100), var(--grey0));
  box-shadow: 0px 1px 3px rgba(0,0,0,0.14);
  min-height: ${(props) => props.small ? designTokens.space[5] : designTokens.space[6]};
  margin-top: ${(props) => props.marginTop ? props.marginTop : '0'};
  margin-bottom: ${(props) => props.marginBottom ? props.marginBottom : '0'};
  margin-left: ${(props) => props.marginLeft ? props.marginLeft : '0'};
  margin-right: ${(props) => props.marginRight ? props.marginRight : '0'};
  transition: all 120ms ease-out 0s;
  &:hover {
    border-color: var(--grey300);
    background: var(--grey800);
    color: var(--grey0);
    text-decoration: none;
  }
  &:focus {
    outline: ${designTokens.space[1]} solid var(--primaryTransparent);
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
  ${ButtonBase}
  background: linear-gradient(to top, var(--primaryDark), var(--primary));
  color: var(--grey0);
`