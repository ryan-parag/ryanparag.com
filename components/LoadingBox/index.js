import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import { Loader } from 'react-feather'
import { Box } from '@components/Box'

export const LoadingSpinner = styled(Loader)`
  color: var(--primary);
  animation: rotation 2s infinite linear;
`

const LoadingBox = ({title, description}) => {
  return(
    <Box center>
      <LoadingSpinner
        size={'40'}
      />
      <h3 style={{ marginBottom: designTokens.space[2] }}>
        { title ? title : 'Loading...' }
      </h3>
      {
        description ? (
          <p style={{ marginBottom: designTokens.space[2] }}>
            <small>{description}</small>
          </p>
        )
        :
        null
      }
    </Box>
  )
}

export default LoadingBox