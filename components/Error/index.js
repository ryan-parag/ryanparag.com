import { Box } from '@components/Box'
import { designTokens } from '@components/Theme/designTokens'
import { AlertTriangle } from 'react-feather'
import { ItemTitle } from '@components/Typography'

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
      <div style={{ marginTop: designTokens.space[3], marginBottom: designTokens.space[3] }}>
        <ItemTitle small>An error occured</ItemTitle>
      </div>
    </Box>
  )
}

export default Error