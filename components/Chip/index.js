import { designTokens } from '@components/Theme/designTokens'
import styled, { css } from 'styled-components'

const ChipStyles = css`
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  padding: ${designTokens.space[1]} ${designTokens.space[2]};
  font-weight: ${designTokens.fontWeights.body};
  font-size: ${designTokens.fontSizes[0]};
  margin-bottom: ${props => props.mb ? props.mb : '0'};
  margin-top: ${props => props.mt ? props.mt : '0'};
  margin-right: ${props => props.mr ? props.mr : designTokens.space[1]};
  margin-left: ${props => props.ml ? props.ml : '0'};
  line-height: 1;
  transition: all 120ms ease-out 0s;
`
const ChipBase = styled.div`
  ${ChipStyles}
  border: 1px solid ${props => props.border ? props.border : 'var(--grey500)'};
  color: ${props => props.color ? props.color : 'inherit'};
  background: ${props => props.bg ? props.bg : 'transparent'};
`

const Chip = ({ ghost, type, children }) => {

  const getBorder = () => {
    switch (type) {
      case 'primary':
        return 'var(--primary)'
      case 'secondary':
        return 'var(--secondary)'
      case 'tertiary':
        return 'var(--tertiary)'
      default:
        return 'var(--grey500)'
    }
  }

  const getColor = () => {
    switch (type) {
      case 'primary':
        return 'var(--primaryDark)'
      case 'secondary':
        return 'var(--secondaryDark)'
      case 'tertiary':
        return 'var(--tertiaryDark)'
      default:
        return 'inherit'
    }
  }

  const getBg = () => {
    switch (type) {
      case 'primary':
        return 'var(--primaryTransparent)'
      case 'secondary':
        return 'var(--secondaryTransparent)'
      case 'tertiary':
        return 'var(--tertiaryTransparent)'
      default:
        return 'var(--grey200)'
    }
  }
  if(ghost) {
    return (
      <ChipBase border={'transparent'} bg={getBg()} color={getColor()}>
        {children}
      </ChipBase>
    )
  } else {
    return (
      <ChipBase border={getBorder()} color={getColor()}>
        {children}
      </ChipBase>
    )
  }
}

export const ChipLink = styled.a`
  ${ChipStyles}
  &:hover, &:focus {
    transform: scale(1.03);
  }
`

export const PrimaryChip = styled(ChipBase)`
  color: var(--primaryDark);
  border-color: var(--primary);
`

export const SecondaryChip = styled(ChipBase)`
  color: var(--secondaryDark);
  border-color: var(--secondary);
`

export const TertiaryChip = styled(ChipBase)`
  color: var(--tertiaryDark);
  border-color: var(--tertiary);
`

export const DefaultChip = styled(ChipBase)`
  color: var(--grey500);
  border-color: var(--grey500);
`

export default Chip