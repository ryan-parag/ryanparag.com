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

const StateLabel = styled.span`
  padding: ${designTokens.space[1]} ${designTokens.space[2]};
  border-radius: 999px;
`

const SuccessState = styled(StateLabel)`
  color: var(--grey600);
`

const ErrorState = styled(StateLabel)`
  color: var(--secondaryDark);
  background: var(--secondaryTransparent);
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

  return(
    <ContrastContainer>
      <ContrastInner>
        <div style={{
          display: 'inline-block',
          padding: `4px 0px`,
          background: backgroundColor,
          color: foregroundColor,
          borderRadius: '999px',
          minWidth: `calc(${designTokens.space[5]} + ${designTokens.space[1]})`,
          textAlign: 'center',
          marginRight: designTokens.space[1]
        }}>
          <strong>{colorContrast(foregroundColor, backgroundColor).toFixed(2)}</strong>
        </div>
        <span>
          {getPassFail()}
        </span>
      </ContrastInner>
    </ContrastContainer>
  )
}