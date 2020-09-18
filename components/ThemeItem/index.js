import React from 'react'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'

const ThemeContainer = styled.button`
  display: inline-block;
  padding: ${designTokens.space[3]} ${designTokens.space[2]};
  text-align: center;
  font-family: inherit;
  border: 1px solid;
  cursor: pointer;
  border-radius: ${designTokens.space[1]};
  margin: 0;
  font-size: ${designTokens.fontSizes[0]};
  min-width: ${designTokens.space[9]};
  position: relative;
  transition: all 200ms ease-out 0s;
  &.active {
    &:after {
      content: '';
      position: absolute;
      top: -${designTokens.space[3]};
      left: 50%;
      border-left: ${designTokens.space[2]} solid transparent;
      border-right: ${designTokens.space[2]} solid transparent;
      border-top: ${designTokens.space[2]} solid var(--primary);
      transform: translateX(-50%);
    }
  }
  &:hover, &:focus {
    transform: scale(1.03);
  }
  &:focus {
    outline: ${designTokens.space[1]} solid var(--primaryTransparent);
  }
`

const SwatchItem = styled.div`
  border-radius: 50%;
  width: ${designTokens.space[3]};
  height: ${designTokens.space[3]};
  box-shadow: 0px 0px 0px 2px ${props => props.shadow};
  border: 1px solid ${props => props.borderColor};
  background: ${props => props.color};
  display: inline-block;
  margin: 0 ${designTokens.space[1]};
`

export default function ThemeItem({theme, clickHandle, active}) {
  return(
    <ThemeContainer
      className={active ? 'active' : null}
      onClick={clickHandle}
      style={{
        background: theme.grey0,
        borderColor: active ? 'var(--primary)' : theme.grey300,
        boxShadow: active ? '0px 0px 0px 2px var(--primary)' : null,
        color: theme.grey900
      }}
    >
      {theme.name}
      <div style={{textAlign: 'center', marginTop: designTokens.space[2]}}>
        <SwatchItem
          color={theme.primary}
          borderColor={theme.primaryDark}
          shadow={theme.tertiaryTransparent}
        />
        <SwatchItem
          color={theme.secondary}
          borderColor={theme.secondaryDark}
          shadow={theme.tertiaryTransparent}
        />
        <SwatchItem
          color={theme.tertiary}
          borderColor={theme.tertiaryDark}
          shadow={theme.tertiaryTransparent}
        />
      </div>
    </ThemeContainer>
  )
}