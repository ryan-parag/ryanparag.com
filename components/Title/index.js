import { motion } from 'framer-motion'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

export const TitleIcon = styled.div`
  width: ${designTokens.space[7]};
  position: relative;
  img {
    display: block;
    width: 100%;
    border-radius: 50%;
    box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.12), 0px 4px 8px var(--grey200), 0px 8px 20px var(--grey200);
  }
`

const TitleContainer = styled(motion.div)`
  position: relative;
`

const Title = ({ children }) => {
  return(
    <TitleContainer
      initial={{ bottom: designTokens.space[2], opacity: 0 }}
      animate={{ bottom: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {children}
      <hr/>
    </TitleContainer>
  )
}

export default Title