import { designTokens } from '@components/Theme/designTokens'
import styled from 'styled-components'

const Chip = styled.div`
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  padding: ${designTokens.space[1]} ${designTokens.space[2]};
  border: 1px solid var(--grey500);
  font-size: ${designTokens.fontSizes[0]};
  margin-right: ${designTokens.space[1]};
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