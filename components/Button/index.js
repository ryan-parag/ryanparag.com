import styled, { css } from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const ButtonBase = css`
  padding: ${designTokens.space[2]} ${designTokens.space[3]};
  display: inline-flex;
  align-items:center;
  font-weight: 700;
  font-size: ${designTokens.fontSizes[1]};
  border-radius: ${designTokens.space[2]};
  border: 1px solid var(--grey200);
  background: linear-gradient(to top, var(--grey100), var(--grey0));
  box-shadow: 0px 1px 3px rgba(0,0,0,0.14);
  min-height: ${designTokens.space[6]};
  margin-top: ${(props) => props.marginTop ? props.marginTop : '0'};
  margin-bottom: ${(props) => props.marginBottom ? props.marginBottom : '0'};
  margin-left: ${(props) => props.marginLeft ? props.marginLeft : '0'};
  margin-right: ${(props) => props.marginRight ? props.marginRight : '0'};
  transition: all 120ms ease-out 0s;
  &:hover {
    border-color: var(--grey300);
    text-decoration: none;
  }
  &:focus {
    box-shadow: 0px 0px 0px ${designTokens.space[1]} var(--primaryTransparent);
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