import React from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const ThemeContainer = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0 ${designTokens.space[3]};
  width: ${designTokens.space[5]};
  height: ${designTokens.space[5]};
  border: 1px solid var(--grey200);
  background: linear-gradient(to top, var(--grey100), var(--grey0));
  box-shadow: 0px 1px 3px rgba(0,0,0,0.14);
  color: inherit;
  border: 1px solid var(--grey200);
  font-family: inherit;
  cursor: pointer;
  border-radius: 50%;
  font-size: ${designTokens.sizing._base};
  position: relative;
  transform: translateY(calc(${designTokens.space[3]} + ${designTokens.space[1]}));
  transition: all 200ms ease-out 0s;
  &:hover {
    border-color: var(--grey300);
    text-decoration: none;
  }
  &:focus {
    box-shadow: 0px 0px 0px ${designTokens.space[1]} var(--primaryTransparent);
  }
`
export default function NewTheme() {
  return(
    <ThemeContainer>
      <svg width="16" height="16" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.7909 24.5781C13.6792 24.5781 14.3984 23.8449 14.3984 23.0129V14.1856H23C23.8602 14.1856 24.5935 13.4665 24.5935 12.5781C24.5935 11.7039 23.8602 10.9706 23 10.9706H14.3984V2.14334C14.3984 1.29728 13.6792 0.578125 12.7909 0.578125C11.9166 0.578125 11.1833 1.29728 11.1833 2.14334V10.9706H2.5817C1.74974 10.9706 0.988281 11.7039 0.988281 12.5781C0.988281 13.4665 1.74974 14.1856 2.5817 14.1856H11.1833V23.0129C11.1833 23.8449 11.9166 24.5781 12.7909 24.5781Z" fill="currentColor"/>
      </svg>
    </ThemeContainer>
  )
}