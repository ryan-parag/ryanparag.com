import List, { ListItem } from '@components/List'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const ListLabel = styled.div`
  display: flex;
  align-items: center;
  padding: ${designTokens.space[2]} 0;
  line-height: ${designTokens.lineHeights.smallHeading};
  font-size: ${designTokens.fontSizes[1]};
`

const ListContent = styled.div`
  flex: 1 1 0%;
`

const Swatch = styled.div`
  height: ${designTokens.space[4]};
  width: ${designTokens.space[6]};
  border-radius: ${designTokens.space[1]};
  position: relative;
  border: 1px solid var(--grey300);
  margin-right: ${designTokens.space[3]};
`

const SwatchLabel = styled.div`
  font-size: ${designTokens.fontSizes[0]};
  color: var(--grey600);
`

const CurrentTheme = () => {

  const neutrals = [
    {
      name: 'Neutral 900',
      value: '--grey900',
      description: 'Main text color'
    }, {
      name: 'Neutral 800',
      value: '--grey800'
    }, {
      name: 'Neutral 700',
      value: '--grey700'
    }, {
      name: 'Neutral 600',
      value: '--grey600',
      description: 'Subtle text color'
    }, {
      name: 'Neutral 500',
      value: '--grey500'
    }, {
      name: 'Neutral 400',
      value: '--grey400',
      description: 'Disabled text'
    }, {
      name: 'Neutral 300',
      value: '--grey300'
    }, {
      name: 'Neutral 200',
      value: '--grey200',
      description: 'Button borders'
    }, {
      name: 'Neutral 100',
      value: '--grey100',
      description: 'Item hover, card background, button background, and borders'
    }, {
      name: 'Neutral 0',
      value: '--grey0',
      description: 'Background'
    }
  ];

  const states = [
    {
      name: 'Primary',
      value: '--primary',
      description: 'Primary button background and hover/focus borders'
    }, {
      name: 'Primary Transparent',
      value: '--primaryTransparent',
      description: 'Primary hover backgrounds'
    }, {
      name: 'Primary Dark',
      value: '--primaryDark',
      description: 'Links and blockquotes'
    }, {
      name: 'Secondary',
      value: '--secondary'
    }, {
      name: 'Secondary Transparent',
      value: '--secondaryTransparent'
    }, {
      name: 'Secondary Dark',
      value: '--secondaryDark',
      description: 'Visited links'
    }, {
      name: 'Tertiary',
      value: '--tertiary',
      description: 'Visited links'
    }, {
      name: 'Tertiary Transparent',
      value: '--tertiaryTransparent'
    }, {
      name: 'Tertiary Dark',
      value: '--tertiaryDark'
    }
  ];

  return(
    <>
      <h3 id="currentTheme">Current Theme:</h3>
        <p>
          View all of the colors in your selected theme below. Change the theme to see the updated colors in the palette!
        </p>
        <List>
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
                  <ListContent>
                    <strong>{color.name}</strong>
                    {
                      color.description ? (
                        <>
                          <SwatchLabel>Examples: {color.description}</SwatchLabel>
                        </>
                      )
                      :
                      null
                    }
                  </ListContent>
                </ListLabel>
              </ListItem>
            ))
          }
        </List>
        <List>
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
                  <ListContent>
                    <strong>{color.name}</strong>
                    {
                      color.description ? (
                        <>
                          <SwatchLabel>Examples: {color.description}</SwatchLabel>
                        </>
                      )
                      :
                      null
                    }
                  </ListContent>
                </ListLabel>
              </ListItem>
            ))
          }
        </List>
    </>
  )
}

export default CurrentTheme