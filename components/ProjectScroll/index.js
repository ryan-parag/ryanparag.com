import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import Card from '@components/ProjectScroll/Card'
import Image from 'next/image'

const SectionWrapper = styled.section`
  padding: ${designTokens.space[7]} 0;
  position: relative;
`

const ScrollSection = styled.article`
  padding: ${designTokens.space[3]} 0;
  transform: translateZ(0);
  scroll-behavior: smooth;
  @media screen and (min-width: ${designTokens.breakpoints[4]}) {
    display: grid;
    grid-template-columns: calc(${designTokens.space[10]} + ${designTokens.space[9]}) 1fr;
    grid-template-rows: auto;
    flex-wrap: nowrap;
    overscroll-behavior-x: contain;
    overflow-x: scroll;
    padding: ${designTokens.space[8]} 0 ${designTokens.space[8]} calc(${designTokens.space[9]} + ${designTokens.space[1]});
    scroll-padding: 0 1.6rem;
    -ms-scroll-snap-type: x mandatory;
    scroll-snap-type: x mandatory;
    white-space: nowrap;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  @media screen and (min-width: ${designTokens.breakpoints[2]}) {
    padding: ${designTokens.space[8]} 0 ${designTokens.space[8]} calc(${designTokens.space[10]} + ${designTokens.space[3]});
  }
  @media screen and (min-width: ${designTokens.breakpoints[0]}) {
    padding: ${designTokens.space[8]} 0 ${designTokens.space[8]} calc(${designTokens.space[10]} + ${designTokens.space[8]});
  }
`

const CardContainer = styled.div`
  padding: 0 ${designTokens.space[3]};
  @media screen and (min-width: ${designTokens.breakpoints[4]}) {
    padding: 0;
  }
`

const ImageSection = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  padding: ${designTokens.space[4]} ${designTokens.space[3]};
  scroll-behavior: smooth;
  scroll-padding: 0 ${designTokens.space[53]};
  -ms-scroll-snap-type: x mandatory;
  scroll-snap-type: x mandatory;
  transform: translateZ(0);
  width: 100%;
  white-space: nowrap;
  @media screen and (min-width: ${designTokens.breakpoints[4]}) {
    padding: 0 ${designTokens.space[5]};
    scroll-behavior: smooth;
    -ms-scroll-snap-type: x mandatory;
    scroll-snap-type: x mandatory;
    width: 100%;
    white-space: nowrap;
    overflow-x: initial;
    overflow-y: initial;
    scroll-padding: auto;
    transform: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`

const ItemImageContainer = styled.div`
  border-radius: ${designTokens.space[2]};
  display: inline-block;
  width: ${props => props.type === 'mobile' ? `calc(${designTokens.space[9]} + ${designTokens.space[7]})` : `calc(${designTokens.space[10]} + ${designTokens.space[10]} + ${designTokens.space[4]})`};
  overflow: hidden;
  padding: 0;
  margin-right: ${designTokens.space[5]};
  border: 1px solid var(--grey200);
  box-shadow: 0px 1px 3px rgba(0,0,0,0.12), 0px 1px 3px var(--grey200);
  @media screen and (min-width: ${designTokens.breakpoints[4]}) {
    width: ${props => props.type === 'mobile' ? `calc(${designTokens.space[10]} + ${designTokens.space[7]})` : `calc(${designTokens.space[10]} + ${designTokens.space[10]} + ${designTokens.space[10]} + ${designTokens.space[10]})`};
  }
`

const ItemImage = styled.img`
  display: block;
  width: 100%;
`

const ProjectScroll = ({project}) => {
  return(
    <SectionWrapper>
      <ScrollSection>
        <CardContainer>
          <Card
            title={project.name}
            href={project.link}
            image={project.logo}
            description={project.description}
          />
        </CardContainer>
        <ImageSection>
          {
            project.preview.map((item,i) => (
              <ItemImageContainer type={project.type}>
                <ItemImage
                  src={item}
                  alt={project.name + i}
                />
              </ItemImageContainer>
            ))
          }
        </ImageSection>
      </ScrollSection>
    </SectionWrapper>
  )
}

export default ProjectScroll