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
  }
  &:before,&:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 50%;
  }
  &:after {
    box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.12), 0px 4px 8px var(--grey200), 0px 8px 20px var(--grey200), -8px 0px 16px 2px var(--tertiaryTransparent), 8px -8px 16px 2px var(--primaryTransparent), 2px 8px 16px 2px var(--secondaryTransparent);
    animation: shadowBreathing 4s infinite linear;
  }
  &:before {
    box-shadow: -2px 0px 4px var(--tertiary), 2px -2px 4px var(--primary), 2px 2px 4px var(--secondary);
    animation: rotation 4s infinite linear;
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