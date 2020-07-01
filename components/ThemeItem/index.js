import React, {useState} from 'react'
import Link from 'next/link'
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
  transition: all 200ms ease-out 0s;
  &.active {
    border: 2px solid var(--primary);
  }
  &:hover, &:focus {
    transform: scale(1.03);
  }
`

export default function ThemeItem({theme, clickHandle}) {
  const [ active, setActive ] = useState(false)
  return(
    <ThemeContainer
      onClick={clickHandle}
      style={{
        background: theme.grey0,
        borderColor: theme.grey300,
        color: theme.grey900
      }}
      className={active ? 'active' : null}
    >
      {theme.name}
      <div style={{display: 'flex', marginTop: designTokens.space[2], justifyContent: 'center'}}>
        <div style={{
          borderRadius: '50%',
          margin: `0 ${designTokens.space[1]}`,
          height: designTokens.space[3],
          width: designTokens.space[3], 
          background: theme.primary}}>
        </div>
        <div style={{
          borderRadius: '50%',
          margin: `0 ${designTokens.space[1]}`,
          height: designTokens.space[3],
          width: designTokens.space[3], 
          background: theme.secondary}}>
        </div>
        <div style={{
          borderRadius: '50%',
          margin: `0 ${designTokens.space[1]}`,
          height: designTokens.space[3],
          width: designTokens.space[3], 
          background: theme.tertiary}}>
        </div>
      </div>
    </ThemeContainer>
  )
}