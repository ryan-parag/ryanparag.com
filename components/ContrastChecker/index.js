import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import colorContrast from 'color-contrast'

const ContrastContainer = styled.div`
  display: inline-block;
`

const ContrastInner = styled.small`
  display: flex;
  align-items: center;
`

const SuccessState = styled.span`
  color: var(--primaryDark);
`

const ErrorState = styled.span`
  color: var(--secondaryDark);
`

export default function ContrastChecker({foregroundColor, backgroundColor}){

  const getPassFail = () => {
    if(colorContrast(foregroundColor, backgroundColor).toFixed(2) >= 7) {
      return <SuccessState>✓ Pass AAA</SuccessState>
    } else if(colorContrast(foregroundColor, backgroundColor).toFixed(2) >= 4.5) {
      return <SuccessState>✓ Pass AA</SuccessState>
    } else {
      return <ErrorState>× Fail</ErrorState>
    }
  }

  useEffect(() => console.log('rendered!'));

  return(
    <ContrastContainer>
      <ContrastInner>
        <div style={{
          display: 'inline-block',
          padding: `4px 0px`,
          background: backgroundColor,
          color: foregroundColor,
          borderRadius: '999px',
          minWidth: `calc(${designTokens.space[5]} + ${designTokens.space[3]})`,
          textAlign: 'center',
          marginRight: designTokens.space[2]
        }}>
          {colorContrast(foregroundColor, backgroundColor).toFixed(2)}
        </div>
        <span>
          {getPassFail()}
        </span>
      </ContrastInner>
    </ContrastContainer>
  )
}