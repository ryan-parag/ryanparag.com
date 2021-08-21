import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import { Loader } from 'react-feather'
import { Box } from '@components/Box'

export const LoadingSpinner = styled(Loader)`
  color: var(--primary);
  animation: rotation 2s infinite linear;
`

const InlineContainer = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${designTokens.space[3]} 0;
  margin-bottom: ${designTokens.space[3]};
`

const LoadingBox = ({title, description}) => {
  return(
    <Box
      center
      bg={'transparent'}
    >
      <LoadingSpinner
        size={'40'}
      />
      <h3 style={{ marginBottom: designTokens.space[2] }}>
        { title ? title : 'Loading...' }
      </h3>
      {
        description && (
          <p style={{ marginBottom: designTokens.space[2] }}>
            <small>{description}</small>
          </p>
        )
      }
    </Box>
  )
}

export const LoadingSmall = ({title}) => {
  return (
    <InlineContainer>
      <LoadingSpinner
        size={'32'}
        style={{ marginRight: designTokens.space[3] }}
      />
      <strong>{ title ? title : 'Loading...' }</strong>
    </InlineContainer>
  )
}

export default LoadingBox