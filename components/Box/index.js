import styled, { css } from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import Link from 'next/link'

export const BoxBase = css`
  display: block;
  background: var(--grey100);
  border: 1px solid var(--grey200);
  padding: ${designTokens.space[4]} ${designTokens.space[3]};
  border-radius: ${designTokens.space[1]};
  margin-bottom: ${designTokens.space[3]};
  box-shadow: none;
  p, ul {
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`

export const BoxBaseLink = css`
  ${BoxBase}
  cursor: pointer;
  transition: all 120ms ease-out 0s;
  &:hover, &:focus {
    background: var(--grey200);
    text-decoration: none;
    transform: scale(1.03);
    box-shadow: 0px 1px 2px var(--grey200), 0px 4px 8px var(--grey100), 0px 8px 16px var(--grey100);
  }
`


export const Box = styled.div`
  ${BoxBase}
  text-align: ${props => props.center ? 'center' : 'left'};
  background: ${props => props.bg ? props.bg : 'var(--grey100)'};
  border-color: ${props => props.bg ? props.bg : 'var(--grey200)'};
`

export const BoxLink = styled(Link)`
  a {
    ${BoxBaseLink}
  }
`

export const BoxAnchorLink = styled.a`
 ${BoxBaseLink}
`