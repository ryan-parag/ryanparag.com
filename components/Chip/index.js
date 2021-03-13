import { designTokens } from '@components/Theme/designTokens'
import styled, { css } from 'styled-components'

const ChipStyles = css`
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  padding: ${designTokens.space[1]} ${designTokens.space[2]};
  border: 1px solid var(--grey500);
  font-size: ${designTokens.fontSizes[0]};
  margin-bottom: ${props => props.mb ? props.mb : '0'};
  margin-top: ${props => props.mt ? props.mt : '0'};
  margin-right: ${props => props.mr ? props.mr : designTokens.space[1]};
  margin-left: ${props => props.ml ? props.ml : '0'};
  line-height: 1;
  transition: all 120ms ease-out 0s;
`
const Chip = styled.div`
  ${ChipStyles}
`

export const ChipLink = styled.a`
  ${ChipStyles}
  &:hover, &:focus {
    transform: scale(1.03);
  }
`

export const PrimaryChip = styled(Chip)`
  color: var(--primaryDark);
  border-color: var(--primary);
`

export const SecondaryChip = styled(Chip)`
  color: var(--secondaryDark);
  border-color: var(--secondary);
`

export const TertiaryChip = styled(Chip)`
  color: var(--tertiaryDark);
  border-color: var(--tertiary);
`

export const DefaultChip = styled(Chip)`
  color: var(--grey500);
  border-color: var(--grey500);
`

export default Chip