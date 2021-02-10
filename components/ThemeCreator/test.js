import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import ColorPicker from '@components/ColorPicker'
import ThemeItem from '@components/ThemeItem'
import { transparentize, darken, lighten, saturate } from 'polished'
import { Button, ButtonPrimary, ButtonBlock } from '@components/Button'
import generate from '@utils/generate'
import RangeSlider from '@components/RangeSlider'
import Switch from '@components/Switch'
import Router from 'next/router'
import ContrastChecker from '@components/ContrastChecker'
import chroma from 'chroma-js'
import Airtable from 'airtable'
import { hexToHsl, getHue } from '@utils/getHue'
import colorContrast from 'color-contrast'

const Card = styled.div`
  margin: ${(props) => props.marginTop ? props.marginTop : '0'} 0 ${(props) => props.marginBottom ? props.marginBottom : designTokens.space[3]};
  padding: 0;
  width: 100%;
  border-radius: ${designTokens.space[2]};
  border: 1px solid var(--grey200);
  background: var(--grey0);
  box-shadow: 0px 1px 3px rgba(0,0,0,0.14);
`
const CardBody = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.grid ? props.grid : '168px 3fr'};
  grid-column-gap: 0;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    grid-template-columns: 1fr;
  }
`

const ThemeContainer = styled.div`
@media screen and (max-width: ${designTokens.breakpoints[4]}) {
  display: flex;
  justify-content: space-between;
}
`

const CardColumn = styled.div`
  --borderColor: var(--grey200);
  background: ${(props) => props.tinted ? 'var(--grey100)' : 'transparent'};
  &:not(:last-of-type) {
    border-right: 1px solid var(--borderColor);
  }
`

const CardRow = styled.div`
  padding: ${(props) => props.paddingY ? props.paddingY : designTokens.space[3]} ${(props) => props.paddingX ? props.paddingX : designTokens.space[3]} ${(props) => props.paddingY ? props.paddingY : designTokens.space[3]};
  border-bottom: ${(props) => props.bottomBorder ? '1px solid var(--borderColor)' : '0'};
`

const CardHeader = styled.div`
  padding: ${designTokens.space[2]} ${designTokens.space[3]};
  border-bottom: 1px solid var(--grey200);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Swatch = styled.button`
  width: ${designTokens.space[3]};
  height: ${designTokens.space[3]};
  padding:0;
  margin: auto;
  border-radius: 50%;
  border: ${(props) => props.active ? '2px solid var(--primary)' : '1px solid var(--borderColor)'};
  box-shadow: ${(props) => props.active ? '0px 0px 0px 2px var(--primary)' : 'none'};
  cursor: pointer;
  transition: all 120ms ease-out 0s;
  &:hover {
    transform: scale(1.1);
  }
`

const SwatchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: ${designTokens.space[1]};
  grid-row-gap: ${designTokens.space[2]};
`

const LargeTitle = styled.h3`
  margin-top: 0;
  margin-bottom: ${(props) => props.spacing ? designTokens.space[3] : '0'};
`

const SectionTitle = styled.h4`
  margin-top: 0;
  margin-bottom: ${(props) => props.spacing ? designTokens.space[3] : '0'};
`

const SectionSubtitle = styled.h5`
  margin-top: 0;
  margin-bottom: ${(props) => props.spacing ? designTokens.space[2] : '0'};
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${designTokens.space[2]};
`

const MobileButton = styled(ButtonPrimary)`
  ${ButtonBlock}
`

const MobileContainer = styled.div`
  @media screen and (min-width: ${designTokens.breakpoints[4]}) {
    display: none;
  }
`

const TestCreator = ({initialTheme, toggleTheme}) => {

  const [neutralInput, setNeutralInput] = useState({
    specs: {
      steps: 10,
      hue_start: hexToHsl(initialTheme.grey0)[0],
      hue_end: hexToHsl(initialTheme.grey900)[0],
      hue_curve: 'easeInQuad',
      sat_start: hexToHsl(initialTheme.grey0)[1],
      sat_end: hexToHsl(initialTheme.grey900)[1],
      sat_curve: 'easeInQuad',
      sat_rate: 100,
      lum_start: hexToHsl(initialTheme.grey0)[2],
      lum_end: hexToHsl(initialTheme.grey900)[2],
      lum_curve: 'easeInQuad',
      modifier: 10
    }
  })
  const [darkMode, setDarkMode] = useState(colorContrast('#FFFFFF', initialTheme.grey900) < 4.5)
  const [primary, setPrimary] = useState(initialTheme.primary)
  const [secondary, secSecondary] = useState(initialTheme.secondary)
  const [tertiary, setTertiary] = useState(initialTheme.tertiary)
  const [activeSwatch, setActiveSwatch] = useState(null)
  const [activeSwatchName, setActiveSwatchName] = useState(null)
  const [sending, setSending] = useState(false)

  const createTheme = () => {
    const neutralPalette = generate(neutralInput)
    let primaryTransparent = () => {return transparentize(0.8, primary)}
    let secondaryTransparent = () => {return transparentize(0.8, secondary)}
    let tertiaryTransparent = () => {return transparentize(0.8, tertiary)}
    let transparent = () => {return darkMode ? transparentize(0.25, neutralPalette[9].hex) : transparentize(0.25, neutralPalette[0].hex)}
    let primaryDark = () => {return darkMode ? lighten(0.12, primary) : darken(0.12, primary)}
    let secondaryDark = () => {return darkMode ? lighten(0.12, secondary) : darken(0.12, secondary)}
    let tertiaryDark = () => {return darkMode ? lighten(0.12, tertiary) : darken(0.12, tertiary)}

    const newTheme = {
      name: 'Custom Theme',
      grey900: `${darkMode ? neutralPalette[9].hex : neutralPalette[0].hex}`,
      grey800: `${darkMode ? neutralPalette[8].hex : neutralPalette[1].hex}`,
      grey700: `${darkMode ? neutralPalette[7].hex : neutralPalette[2].hex}`,
      grey600: `${darkMode ? neutralPalette[6].hex : neutralPalette[3].hex}`,
      grey500: `${darkMode ? neutralPalette[5].hex : neutralPalette[4].hex}`,
      grey400: `${darkMode ? neutralPalette[4].hex : neutralPalette[5].hex}`,
      grey300: `${darkMode ? neutralPalette[3].hex : neutralPalette[6].hex}`,
      grey200: `${darkMode ? neutralPalette[2].hex : neutralPalette[7].hex}`,
      grey100: `${darkMode ? neutralPalette[1].hex : neutralPalette[8].hex}`,
      grey0: `${darkMode ? neutralPalette[0].hex : neutralPalette[9].hex}`,
      primary: primary,
      tertiary: tertiary,
      secondary: secondary,
      primaryTransparent: primaryTransparent(),
      tertiaryTransparent: tertiaryTransparent(),
      secondaryTransparent: secondaryTransparent(),
      transparent: transparent(),
      secondaryDark: secondaryDark(),
      primaryDark: primaryDark(),
      tertiaryDark: tertiaryDark(),
    }
    return newTheme
  }

  const [customTheme, setCustomTheme] = useState(createTheme())

  const changeDarkMode = () => {
    setDarkMode(!darkMode)
    setCustomTheme(createTheme())
  }

  useEffect(() => {
    console.log(customTheme)
  }, [customTheme])

  return (
    <>
      <Card>
        <CardHeader>
          <LargeTitle>New Theme</LargeTitle>
          <div>
            <ButtonPrimary>Save & Add</ButtonPrimary>
          </div>
        </CardHeader>
        <CardBody>
          <CardColumn tinted>
            <CardRow bottomBorder>
              <SectionTitle>Preview ✨</SectionTitle>
            </CardRow>
            <CardRow bottomBorder>
              <ThemeContainer>
                <ThemeItem
                  theme={customTheme}
                  clickHandle={() => toggleTheme(customTheme)}
                />
                <div style={{ marginTop: designTokens.space[3]}}>
                  <Switch
                    isOn={darkMode}
                    handleToggle={() => changeDarkMode()}
                    startLabel={'Light'}
                    endLabel={'Dark'}
                  />
                </div>
              </ThemeContainer>
            </CardRow>
          </CardColumn>
          <CardColumn>
            <CardBody grid={'repeat(2, 1fr)'}>
              <CardColumn>
                <ul>
                  <li>Neutral Hue Start: {neutralInput.specs.hue_start}</li>
                  <li>Neutral Hue End: {neutralInput.specs.hue_end}</li>
                  <li>Neutral Sat Start: {neutralInput.specs.sat_start}</li>
                  <li>Neutral Sat End: {neutralInput.specs.sat_end}</li>
                  <li>Neutral Lum Start: {neutralInput.specs.lum_start}</li>
                  <li>Neutral Lum End: {neutralInput.specs.lum_end}</li>
                </ul>
              </CardColumn>
            </CardBody>
          </CardColumn>
        </CardBody>
      </Card>
    </>
  )
}

export default TestCreator