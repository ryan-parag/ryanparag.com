import React from 'react'
import { designTokens } from '@components/Theme/designTokens'
import styled from 'styled-components'
import Title from '@components/Title'
import Randomizer from '@components/Randomizer'
import { GradientContainer } from '@components/Layout'
import Logo from '@components/Logo'
import { ArrowRight } from 'react-feather'
import CurrentTheme from '@components/Theme/CurrentTheme'

const PreviewLayout = styled.div`
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    height: 40vh;
  }
`

const PreviewContainer = styled.div`
  --grey0: ${props => props.theme.grey0};
  --grey100: ${props => props.theme.grey100};
  --grey200: ${props => props.theme.grey200};
  --grey300: ${props => props.theme.grey300};
  --grey400: ${props => props.theme.grey400};
  --grey500: ${props => props.theme.grey500};
  --grey600: ${props => props.theme.grey600};
  --grey700: ${props => props.theme.grey700};
  --grey800: ${props => props.theme.grey800};
  --grey900: ${props => props.theme.grey900};
  --primary: ${props => props.theme.primary};
  --primaryTransparent: ${props => props.theme.primaryTransparent};
  --primaryDark: ${props => props.theme.primaryDark};
  --secondary: ${props => props.theme.secondary};
  --secondaryTransparent: ${props => props.theme.secondaryTransparent};
  --secondaryDark: ${props => props.theme.secondaryDark};
  --tertiary: ${props => props.theme.tertiary};
  --tertiaryTransparent: ${props => props.theme.tertiaryTransparent};
  --tertiaryDark: ${props => props.theme.tertiaryDark};
  width: 100%;
  background: var(--grey200);
  padding: ${designTokens.space[3]};
  color: var(--grey900);
  position:relative;
  height: 100%;
  overflow: hidden;
  transition: all 80ms ease-out;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    background: var(--grey200);
    padding: 0;
  }
`

const PreviewLabel = styled.span`
  position: absolute;
  font-weight: ${designTokens.fontWeights.bold};
  font-size: ${designTokens.sizing._xs};
  top: ${designTokens.space[3]};
  left: ${designTokens.space[3]};
  color: var(--grey600);
`

const PreviewPage = styled.div`
  width: 100%;
  transform: scale(0.8) translateY(calc(-${designTokens.space[6]}));
  background: var(--grey0);
  padding: ${designTokens.space[9]} ${designTokens.space[6]};
  user-select: none;
  position: relative;
  border-radius: ${designTokens.space[1]};
  box-shadow: 0px ${designTokens.space[2]} ${designTokens.space[3]} rgba(0,0,0, .12);
  height: 900px;
  overflow-y: scroll;
  @media screen and (max-width: ${designTokens.breakpoints[3]}) {
    height: 600px;
  }
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    height: 300px;
    padding: ${designTokens.space[8]} ${designTokens.space[3]};
    transform: scale(0.9) translateY(${designTokens.space[6]});
  }
`

const HeaderBar = styled.div`
  height: ${designTokens.space[2]};
  background: var(--primary);
  background:linear-gradient(to right, var(--primary), var(--tertiary), var(--secondary));
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`

const Preview = ({ theme }) => {

  return(
    <PreviewLayout>
      <PreviewContainer theme={theme}>
        <PreviewLabel>Preview</PreviewLabel>
        <PreviewPage theme={theme}>
          <GradientContainer/>
          <HeaderBar/>
            <Title>
              <div style={{ width: '64px'}}>
                <Logo/>
              </div>
              <h1>Hey, I'm Ryan!</h1>
              <p className="lead">I'm a designer and <Randomizer/>. Currently, designing early-phase products at Masonite, based in Tampa, FL.</p>
              <p>
                <a className="link">
                  More about me
                  <ArrowRight size={'20'} className="icon" style={{ top: designTokens.space[1] }}/>
                </a>
              </p>
            </Title>
            <article>
              <p>I like to believe design is a fluid skill and that <strong>everyone is a bit of a designer</strong> 👍 - we all have the ability to feel certain ways about things that are designed. <strong>Feed that curiousity</strong> and play around with creating a new theme for this website!</p>
              <CurrentTheme/>
              <p>
                As users, we expect our modern digital products to understand us more thoroughly - to help drive a more seamless, personalized experience per our individual preferences. We see this in a multitude of ways, across mobile apps, websites, and even (more so) in our content streaming experiences:
              </p>
              <ul>
                <li>Custom app icons</li>
                <li>Personalized ecommerce recommendations</li>
                <li>Categorized TV shows and movies</li>
                <li>Dark / Light modes</li>
              </ul>
              <p>Neilsen Norman Group summarizes the difference between customization and personalization fairly well:</p>
              <blockquote>Customization gives control to the user and personalization gives control to the site. Both can enhance users’ experience, but only when carefully implemented.</blockquote>
              <p>I've been experimenting with ways to which we could give users fluid customization abilities, but provide them enough rails as to not degrade their experience.</p>
              <p>I'm still playing around with this idea and gathering feedback, but by using Lyft Design's Colorbox tool and the algorithm they've crafted, we can create palettes on-the-fly using minimal inputs.</p>
              <p>To provide some rails for the user, I included a way to gauge when parts of the theme aren't matching certain WCAG requirements as well.</p>
              <p>I'd love to hear what you think!</p>
            </article>
        </PreviewPage>
      </PreviewContainer>
    </PreviewLayout>
  )
}

export default Preview