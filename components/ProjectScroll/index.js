import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const SectionWrapper = styled.section`
  padding: ${designTokens.space[9]} 0;
  background: var(--primaryTransparent);
`

const ScrollSection = styled.article`
  display: grid;
  grid-template-columns: 29.6rem 1fr;
  grid-template-rows: auto;
  flex-wrap: nowrap;
  overflow-x: scroll;
  padding: 3.2rem 1.6rem;
  scroll-padding: 0 1.6rem;
  -ms-scroll-snap-type: x mandatory;
  scroll-snap-type: x mandatory;
  white-space: nowrap;
  width: 100%;
  -webkit-overflow-scrolling: touch;
`

const ImageSection = styled.div`
  padding: 2.4rem 1.2rem;
  scroll-behavior: smooth;
  -ms-scroll-snap-type: x mandatory;
  scroll-snap-type: x mandatory;
  width: 100%;
  white-space: nowrap;
  overflow-x: initial;
  overflow-y: initial;
  padding: 0 1.6rem;
  scroll-padding: auto;
  transform: none;
`

const Item = styled.h2`
  display: inline-block;
  width: 100%;
  max-width: 300px;
  padding: 24px;
  background: red;
  border-radius: 2.4rem;
  margin-right: 2.4rem;
`

const ProjectScroll = () => {
  return(
    <SectionWrapper>
      <ScrollSection>
        <h1>sup</h1>
        <ImageSection>
          <Item>item</Item>
          <Item>item</Item>
          <Item>item</Item>
          <Item>item</Item>
          <Item>item</Item>
        </ImageSection>
      </ScrollSection>
    </SectionWrapper>
  )
}

export default ProjectScroll