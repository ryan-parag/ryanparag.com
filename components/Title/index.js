import { motion } from 'framer-motion'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const TitleContainer = styled(motion.div)`
  position: relative;
`

const Title = ({ children }) => {
  return(
    <TitleContainer
      initial={{ top: designTokens.space[5], opacity: 0 }}
      animate={{ top: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {children}
      <hr/>
    </TitleContainer>
  )
}

export default Title