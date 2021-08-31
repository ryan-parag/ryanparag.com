import React from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const AvatarBase = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: ${designTokens.space[5]};
  width: ${designTokens.space[5]};
  background: ${props => props.bg ? props.bg : 'var(--grey200)'};
  font-size: ${designTokens.sizing._base};
  font-weight: ${designTokens.fontWeights.bold};
  color: ${props => props.color ? props.color : 'var(--grey600)'};
`

const Avatar = ({icon, text, type}) => {

  const getTypeBg = () => {
    switch (type) {
      case 'primary':
        return 'var(--primaryTransparent)'
        break;
      case 'secondary':
        return 'var(--secondaryTransparent)'
        break;
        break;
      case 'primary':
        return 'var(--tertiaryTransparent)'
        break;
      default:
        return 'var(--grey200)'
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case 'primary':
        return 'var(--primaryDark)'
        break;
      case 'secondary':
        return 'var(--secondaryDark)'
        break;
        break;
      case 'primary':
        return 'var(--tertiaryDark)'
        break;
      default:
        return 'var(--grey600)'
    }
  }

  return(
    <AvatarBase
      bg={getTypeBg}
      color={getTypeColor()}
    >
      {
        icon && (icon)
      }
      {
        text && (text)
      }
    </AvatarBase>
  )
}

export default Avatar