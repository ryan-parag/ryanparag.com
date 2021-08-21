import { Box } from '@components/Box'
import { designTokens } from '@components/Theme/designTokens'
import { AlertTriangle } from 'react-feather'

const Error = () => {
  return (
    <Box
      center
      border={'transparent'}
      bg={'transparent'}
    >
      <AlertTriangle
        size={'24'}
      />
      <p style={{ marginTop: designTokens.space[3], marginBottom: designTokens.space[3] }}>
        <strong>An error occured</strong>
      </p>
    </Box>
  )
}

export default Error