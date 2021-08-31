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
  font-size: ${designTokens.sizing._sm};
  border-bottom: 2px solid var(--grey200);
  a, button {
    color: var(--grey600);
    border: 0;
    background: transparent;
    cursor: pointer;
    font-weight: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
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
    a, button {
      color: var(--grey900);
    }
  }
`