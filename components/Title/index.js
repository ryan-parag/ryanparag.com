import { motion } from 'framer-motion'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import Image from 'next/image'

export const TitleIcon = styled.div`
  display: inline-block;
  position: relative;
  border-radius: 50%;
  box-shadow: inset 0px 0px 8px var(--grey200), 0px 0px 0px 1px rgba(0,0,0,0.12), 0px 4px 8px var(--grey200), 0px 8px 20px var(--grey200), -8px 0px 12px var(--primaryTransparent), 4px -8px 12px var(--secondaryTransparent), 8px 8px 12px var(--tertiaryTransparent);
  div {
    position: static !important;
  }
  img {
    border-radius: 50%;
  }
`

const TitleContainer = styled(motion.div)`
  position: relative;
`

const Title = ({ children, image, alt }) => {
  return(
    <TitleContainer
      initial={{ bottom: designTokens.space[2], opacity: 0 }}
      animate={{ bottom: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {
        image ? (
          <TitleIcon>
            <Image width={designTokens.space[7]} height={designTokens.space[7]} src={image} alt={alt}/>
          </TitleIcon>
        )
        :
        null
      }
      {children}
      <hr/>
    </TitleContainer>
  )
}

export default Title