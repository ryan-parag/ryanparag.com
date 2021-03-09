import styled from 'styled-components'

const Section = styled.article`
  grid-template-columns: 36.4rem auto;
  padding-top: 4.8rem;
  padding-left: 32px;
  padding-bottom: 4.8rem;
  scroll-padding: 0 64px;
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
  transform: translateZ(0);
  scroll-behavior: smooth;
`

const Test = styled.div`
  width: 100%;
  background: yellow;
`

const Work = () => {
  return(
    <Section>
      <Test>sup</Test>
      <Test>sup</Test>
      <Test>sup</Test>
    </Section>
  )
}

export default Work