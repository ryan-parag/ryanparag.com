import Layout from '@components/Layout/'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const Swatch = styled.div`
  height: ${designTokens.space[6]};
  width: 100%;
  border-radius: ${designTokens.space[1]};
  position: relative;
  border: 1px solid var(--grey300);
`

const SwatchContainer = styled.div`
  display: grid;
  grid-column-gap: ${designTokens.space[3]};
  grid-row-gap: ${designTokens.space[3]};
  grid-template-columns: repeat(9, 1fr);
  margin-bottom: ${designTokens.space[4]};
  margin-top: ${designTokens.space[3]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ProfileImg = styled.div`
  width: ${designTokens.space[9]};
  height: ${designTokens.space[9]};
  border-radius: 50%;
  background: var(--primaryTransparent);
  position: relative;
  img {
    display: block; width: 100%;
  }
  &:before, &:after {
    content: '';
    position: absolute;
    top: -${designTokens.space[4]};
    right: -${designTokens.space[4]};
    width: ${designTokens.space[4]};
    height: ${designTokens.space[4]};
    display: block;
    background: var(--secondaryTransparent);
    border-radius: 50%;
  }
  &:after {
    top: ${designTokens.space[2]};
    right: -${designTokens.space[7]};
    width: ${designTokens.space[3]};
    height: ${designTokens.space[3]};
    background: var(--tertiaryTransparent);
  }
`

const About = ({ title, description, ...props }) => {

  const neutrals = [
    'var(--grey900)',
    'var(--grey800)',
    'var(--grey700)',
    'var(--grey600)',
    'var(--grey500)',
    'var(--grey400)',
    'var(--grey300)',
    'var(--grey200)',
    'var(--grey100)'
  ];

  const states = [
    'var(--primary)',
    'var(--primaryTransparent)',
    'var(--primaryDark)',
    'var(--secondary)',
    'var(--secondaryTransparent)',
    'var(--secondaryDark)',
    'var(--tertiary)',
    'var(--tertiaryTransparent)',
    'var(--tertiaryDark)'
  ];
  
  return (
    <>
      <Layout pageTitle={`${title} | About`} description={description}>
        <ProfileImg>
          <img src="/static/profile.png"/>
        </ProfileImg>
        <h2>Hello, I'm Ryan.👋</h2>

        <p>
        I'm a Digital Product Designer currently based in Tampa, Florida. I help build digital products and solve tough problems — focusing on user research & testing, prototyping, visual design, front-end code, and product strategy.
        </p>
        <p>
          I currently reside in Tampa,FL, where I help simplify the home remodeling experience and help build connected, IoT experiences for homeowners at <a href="https://ryanparag.com/work/masonite">Masonite</a> - a global manufacturer of doors.
        </p>
        <p>
          Previously, I helped build a problem-solving platform for payments as the first product designer at <a href="https://ryanparag.com/work/chargebacks911">Chargebacks911</a>.
        </p>
        <p>
          I’m driven to learn why people do what they do so I can create experiences that are intuitive and successful. I’ve helped rethink, prototype and design solutions to help bring empathy and simplicity into complex problems - which is a fancier way of saying I help things make sense.
        </p>
        <p>
          If you'd like to see more of what I've been working on, take a look at my <a href="https://codepen.io/ryanparag">CodePen</a>, <a href="https://dribbble.com/ryanparag">Dribbble</a>, and <a href="https://github.com/ryan-parag">GitHub</a>. For a more in-depth look at my design process or if you have a project in mind, <a href="mailto:parag.ryan@gmail.com">let's chat - I'm available</a>.
        </p>
        <hr/>
        <h4>Current Theme:</h4>
        <span>Neutrals</span>
        <SwatchContainer>
          {
            neutrals.map(color => (
              <Swatch bg={color} style={{
                background: color,
                color: color
              }}/>
            ))
          }
        </SwatchContainer>
        <span>Primary / Secondary / Tertiary</span>
        <SwatchContainer>
          {
            states.map(color => (
              <Swatch bg={color} style={{
                background: color,
                color: color
              }}/>
            ))
          }
        </SwatchContainer>
      </Layout>
    </>
  )
}

export default About

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
