import Layout from '@components/Layout/'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import Link from 'next/link'
import { ButtonLink } from '@components/Button'
import Subscribe from '@components/Subscribe'

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${designTokens.space[2]} ${designTokens.space[3]};
  margin-bottom: 0;
  &:not(:last-of-type) {
    border-bottom: 1px solid var(--grey200);
  }
`

const ListLabel = styled.div`
  display: inline-flex;
  align-items: center;
`

const Swatch = styled.div`
  height: ${designTokens.space[4]};
  width: ${designTokens.space[6]};
  border-radius: ${designTokens.space[1]};
  position: relative;
  border: 1px solid var(--grey300);
  margin-right: ${designTokens.space[3]};
`

const SwatchContainer = styled.ul`
  margin: ${designTokens.space[3]} 0 ${designTokens.space[4]};
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: ${designTokens.space[2]};
  border: 1px solid var(--grey200);
  background: var(--grey0);
  box-shadow: 0px 1px 3px rgba(0,0,0,0.14);
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

  const colorValue = (color) => {
    let getColor = getComputedStyle(document.documentElement).getPropertyValue(color)
    return getColor
  }

  const neutrals = [
    {
      name: 'Neutral 900',
      value: '--grey900'
    }, {
      name: 'Neutral 800',
      value: '--grey800'
    }, {
      name: 'Neutral 700',
      value: '--grey700'
    }, {
      name: 'Neutral 600',
      value: '--grey600'
    }, {
      name: 'Neutral 500',
      value: '--grey500'
    }, {
      name: 'Neutral 400',
      value: '--grey400'
    }, {
      name: 'Neutral 300',
      value: '--grey300'
    }, {
      name: 'Neutral 200',
      value: '--grey200'
    }, {
      name: 'Neutral 100',
      value: '--grey100'
    }, {
      name: 'Neutral 0',
      value: '--grey0'
    }
  ];

  const states = [
    {
      name: 'Primary',
      value: '--primary'
    }, {
      name: 'Primary Transparent',
      value: '--primaryTransparent'
    }, {
      name: 'Primary Dark',
      value: '--primaryDark'
    }, {
      name: 'Secondary',
      value: '--secondary'
    }, {
      name: 'Secondary Transparent',
      value: '--secondaryTransparent'
    }, {
      name: 'Secondary Dark',
      value: '--secondaryDark'
    }, {
      name: 'Tertiary',
      value: '--tertiary'
    }, {
      name: 'Tertiary Transparent',
      value: '--tertiaryTransparent'
    }, {
      name: 'Tertiary Dark',
      value: '--tertiaryDark'
    }
  ];
  
  return (
    <>
      <Layout pageTitle={`${title} | About`} description={description} ogImage="/notes-social-media.png">
        <article>
          <ProfileImg>
            <img src="/static/profile.png"/>
          </ProfileImg>
          <h1>Hello, I'm Ryan.👋</h1>
          <p className="lead">I'm a Digital Product Designer based in Tampa, Florida.</p>
          <p>
            I help build digital products and solve tough problems — focusing on user research & testing, prototyping, visual design, front-end code, and product strategy.
          </p>
          <p>
            I currently reside in Tampa,FL, where I help simplify the home remodeling experience and help build connected, IoT experiences for homeowners at <a href="https://ryanparag.com/work/masonite">Masonite</a> - a global manufacturer of doors.
          </p>
          <hr/>
          <h4>Projects</h4>
          <ul>
            <li>
              <a href="https://ryanparag.com">Take a look at my portfolio and case studies</a>
            </li>
            <li>
              <a href="https://slack-themes.now.sh/">Slack Themes</a>
            </li>
            <li>
              <a href="https://tampabay.design/">Tampa Bay Design Community Finder</a>
            </li>
            <li>
              <Link href="../create-theme"><a>Theme Creator</a></Link>
            </li>
          </ul>
          <h4>Writing</h4>
          <ul>
            <li>
              <Link href="../notes/thoughts-on-design-tools"><a>Thoughts on Design Tools</a></Link>
            </li>
            <li>
              <Link href="../notes/designing-for-personalization"><a>Designing for Personalization</a></Link>
            </li>
            <li>
              <Link href="../notes/from-figma-to-code"><a>From Figma to Code</a></Link>
            </li>
            <li>
              <Link href="../notes/portfolio-redesign"><a>Portfolio Redesign</a></Link>
            </li>
            <li>
              <Link href="../notes/"><a>Read more notes...</a></Link>
            </li>
          </ul>
          <h4>Get in touch</h4>
          <ul>
            <li>
              <a href="https://ryanparag.com/about/resume">Resumé</a>
            </li>
            <li>
              <a href="https://dribbble.com/ryanparag">Dribbble</a>
            </li>
            <li>
              <a href="https://codepen.io/ryanparag">CodePen</a>
            </li>
            <li>
              <a href="https://github.com/ryan-parag">GitHub</a>
            </li>
            <li>
              <a href="mailto:parag.ryan@gmail.com">Email me!</a>
            </li>
          </ul>
        </article>
        <hr/>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <svg width={designTokens.space[8]} viewBox="0 0 138 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M108 88C107.448 88 107 88.4477 107 89V91H105C104.448 91 104 91.4477 104 92C104 92.5523 104.448 93 105 93H107V95C107 95.5523 107.448 96 108 96C108.552 96 109 95.5523 109 95V93H111C111.552 93 112 92.5523 112 92C112 91.4477 111.552 91 111 91H109V89C109 88.4477 108.552 88 108 88Z" fill="var(--tertiary)"/>
            <mask id="path-2-inside-1" fill="white">
              <rect x="97" y="68" width="7" height="7" rx="1"/>
            </mask>
            <rect x="97" y="68" width="7" height="7" rx="1" stroke="var(--secondary)" strokeWidth="4" mask="url(#path-2-inside-1)"/>
            <circle cx="67" cy="48" r="40" fill="var(--primaryTransparent)"/>
            <path d="M75.7222 27.474C72.6387 26.1969 69.2452 26.1969 66.1633 27.4735C63.0791 28.751 60.6795 31.1505 59.3998 34.2349L51.1675 54.1127C50.8455 54.8901 51.2144 55.7807 51.9929 56.1053L58.0178 58.6007L54.3547 67.4434C53.8995 68.5421 53.8983 69.7502 54.3552 70.8458C54.8095 71.9425 55.6656 72.7984 56.7607 73.2521C57.8595 73.7071 59.0676 73.7083 60.1644 73.254C61.2612 72.7997 62.1172 71.9435 62.5698 70.8459L66.2356 62.002L72.2605 64.4974C72.6342 64.6522 73.0549 64.6513 73.4276 64.4969C73.8029 64.3415 74.0984 64.0457 74.2532 63.6719L82.4855 43.7941C83.7628 40.7107 83.7629 37.3174 82.4856 34.2337C81.2066 31.1534 78.8056 28.7507 75.7222 27.474ZM59.7514 69.6787C59.465 70.3702 58.6166 70.7216 57.9252 70.4352C57.5813 70.2928 57.3119 70.0235 57.1696 69.68C57.0273 69.3364 57.0274 68.9555 57.1699 68.6117L60.833 59.7689L63.4156 60.8386L59.7514 69.6787ZM79.6667 42.6264L79.3261 43.4487L79.2669 43.4329C78.872 43.1073 78.5893 42.7539 78.2737 42.3582C77.5827 41.4896 76.727 40.4106 74.6713 39.5591C72.6184 38.7067 71.2476 38.8657 70.1457 38.994C69.203 39.1027 68.4608 39.1872 67.1378 38.6393C65.8147 38.0913 65.3496 37.5068 64.7626 36.7623C64.2565 36.1236 63.6572 35.3718 62.5597 34.6808C63.5805 32.6975 65.2474 31.1526 67.33 30.29C69.6583 29.3255 72.2247 29.3244 74.5569 30.2904C76.8892 31.2563 78.702 33.069 79.6675 35.3998C80.6303 37.7318 80.6312 40.2981 79.6667 42.6264Z" fill="var(--primary)"/>
            <circle cx="107" cy="34" r="3" stroke="var(--secondary)" strokeWidth="2"/>
            <circle cx="23" cy="77" r="3" stroke="var(--secondary)" strokeWidth="2"/>
            <mask id="path-8-inside-2" fill="white">
              <rect x="27" y="28" width="7" height="7" rx="1"/>
            </mask>
            <rect x="27" y="28" width="7" height="7" rx="1" stroke="var(--tertiary)" strokeWidth="4" mask="url(#path-8-inside-2)"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M14 43C13.4477 43 13 43.4477 13 44V46H11C10.4477 46 10 46.4477 10 47C10 47.5523 10.4477 48 11 48H13V50C13 50.5523 13.4477 51 14 51C14.5523 51 15 50.5523 15 50V48H17C17.5523 48 18 47.5523 18 47C18 46.4477 17.5523 46 17 46H15V44C15 43.4477 14.5523 43 14 43Z" fill="var(--tertiary)"/>
            <circle cx="92.5" cy="87.5" r="1.5" fill="var(--primaryDark)"/>
            <circle cx="114.5" cy="57.5" r="1.5" fill="var(--primaryDark)"/>
            <circle cx="136.5" cy="23.5" r="1.5" fill="var(--primaryDark)"/>
            <circle cx="104.5" cy="15.5" r="1.5" fill="var(--primaryDark)"/>
            <circle cx="111.5" cy="33.5" r="1.5" fill="var(--primaryDark)"/>
            <circle cx="39.5" cy="13.5" r="1.5" fill="var(--primaryDark)"/>
            <circle cx="1.5" cy="82.5" r="1.5" fill="var(--primaryDark)"/>
            <circle cx="27.5" cy="54.5" r="1.5" fill="var(--primaryDark)"/>
          </svg>
          <ButtonLink>
            <Link href="/create-theme">
              <a>
                <img
                  src="/static/theme.svg"
                  width="32"
                  style={{
                    marginRight: designTokens.space[2],
                    transform: 'rotate(-10deg) translateX(-4px)'
                  }}
                />
                Create Theme
              </a>
            </Link>
          </ButtonLink>
        </div>
        <h3>Current Theme:</h3>
        <p>
          View all of the colors in your selected theme below. Change the theme to see the updated colors in the palette!
        </p>
        <SwatchContainer>
          <ListItem>
            <strong><small>Neutrals</small></strong>
          </ListItem>
          {
            neutrals.map(color => (
              <ListItem key={color.name}>
                <ListLabel>
                  <Swatch
                    style={{
                      background: `var(${color.value})`
                    }}
                  />
                  <small>{color.name}</small>
                </ListLabel>
              </ListItem>
            ))
          }
        </SwatchContainer>
        <SwatchContainer>
          <ListItem>
            <strong><small>Primary / Secondary / Tertiary</small></strong>
          </ListItem>
          {
            states.map(color => (
              <ListItem key={color.name}>
                <ListLabel>
                  <Swatch
                    style={{
                      background: `var(${color.value})`
                    }}
                  />
                  <small>{color.name}</small>
                </ListLabel>
              </ListItem>
            ))
          }
        </SwatchContainer>
        <hr/>
        <Subscribe/>
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
