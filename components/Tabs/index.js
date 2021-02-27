import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

export const TabBar = styled.nav`
  display: flex;
  margin-bottom: ${designTokens.space[4]};
  overflow-x: scroll;
`

export const TabItem = styled.div`
  text-align: center;
  width: 100%;
  font-size: ${designTokens.fontSizes[1]};
  border-bottom: 2px solid var(--grey200);
  a {
    color: var(--grey600);
    display: block;
    padding: calc(${designTokens.space[2]} + ${designTokens.space[1]}) ${designTokens.space[2]};
    width: 100%;
    transition: all 120ms ease-out;
    &:hover, &:focus {
      color: var(--grey900);
      background: var(--grey100);
      text-decoration: none;
    }
  }
  &.active {
    border-bottom: 4px solid var(--primary);
    font-weight: ${designTokens.fontWeights.bold};
    a {
      color: var(--grey900);
    }
  }
`