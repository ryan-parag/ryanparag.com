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
  margin: 0 ${designTokens.space[3]};
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
`

export default function ThemeItem({theme, clickHandle, active}) {
  return(
    <ThemeContainer
      className={active ? 'active' : null}
      onClick={clickHandle}
      style={{
        background: theme.grey0,
        borderColor: active ? 'var(--primary)' : theme.grey300,
        borderWidth: active ? '2px' : null,
        color: theme.grey900
      }}
    >
      {theme.name}
      <div style={{display: 'flex', marginTop: designTokens.space[2], justifyContent: 'center'}}>
        <div style={{
          borderRadius: '50%',
          margin: `0 ${designTokens.space[1]}`,
          height: designTokens.space[3],
          width: designTokens.space[3], 
          background: theme.primary,
          border: `1px solid ${theme.primaryDark}`
        }}>
        </div>
        <div style={{
          borderRadius: '50%',
          margin: `0 ${designTokens.space[1]}`,
          height: designTokens.space[3],
          width: designTokens.space[3], 
          background: theme.secondary,
          border: `1px solid ${theme.secondaryDark}`
        }}>
        </div>
        <div style={{
          borderRadius: '50%',
          margin: `0 ${designTokens.space[1]}`,
          height: designTokens.space[3],
          width: designTokens.space[3], 
          background: theme.tertiary,
          border: `1px solid ${theme.tertiaryDark}`
        }}>
        </div>
      </div>
    </ThemeContainer>
  )
}