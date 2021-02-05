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

const ThemeCreator = ({toggleTheme}) => {

  const [neutralHueStart, setNeutralHueStart] = useState(287)
  const [neutralHueEnd, setNeutralHueEnd] = useState(173)
  const [neutralSatStart, setNeutralSatStart] = useState(40)
  const [neutralSatEnd, setNeutralSatEnd] = useState(10)
  const [neutralLumStart, setNeutralLumStart] = useState(12)
  const [neutralLumEnd, setNeutralLumEnd] = useState(87)
  const [darkMode, setDarkMode] = useState(true)
  const [easing, setEasing] = useState('easeInQuad')
  const [activeSwatch, setActiveSwatch] = useState(null)
  const [activeSwatchName, setActiveSwatchName] = useState(null)
  const [sending, setSending] = useState(false)

  const input = {
    specs: {
      steps: 10,
      hue_start: parseInt(neutralHueStart),
      hue_end: parseInt(neutralHueEnd),
      hue_curve: easing,
      sat_start: parseInt(neutralSatStart),
      sat_end: parseInt(neutralSatEnd),
      sat_curve: easing,
      sat_rate: 100,
      lum_start: parseInt(neutralLumStart),
      lum_end: parseInt(neutralLumEnd),
      lum_curve: easing,
      modifier: 10
    }
  }

  const getTransparent = (value) => {
    return transparentize(0.25, value)
  }

  const palette = generate(input)

  const changeColor = () => {
    let newNeutralTheme = []
    setTimeout(() => {
      palette.map(color => {
        newNeutralTheme.push(color.hex)
      })
      if(darkMode) {
        setCustomTheme(prevState => ({
          ...prevState,
          grey900: newNeutralTheme[9],
          grey800: newNeutralTheme[8],
          grey700: newNeutralTheme[7],
          grey600: newNeutralTheme[6],
          grey500: newNeutralTheme[5],
          grey400: newNeutralTheme[4],
          grey300: newNeutralTheme[3],
          grey200: newNeutralTheme[2],
          grey100: newNeutralTheme[1],
          grey0: newNeutralTheme[0],
          transparent: getTransparent(newNeutralTheme[0]),
        }))
      } else {
        setCustomTheme(prevState => ({
          ...prevState,
          grey900: newNeutralTheme[0],
          grey800: newNeutralTheme[1],
          grey700: newNeutralTheme[2],
          grey600: newNeutralTheme[3],
          grey500: newNeutralTheme[4],
          grey400: newNeutralTheme[5],
          grey300: newNeutralTheme[6],
          grey200: newNeutralTheme[7],
          grey100: newNeutralTheme[8],
          grey0: newNeutralTheme[9],
          transparent: transparentize(0.25, newNeutralTheme[0]),
        }))
      }
      return customTheme
    },100)
  }

  const changeHueStart = (value) => {
    setNeutralHueStart(value)
    changeColor()
  }

  const changeHueEnd = (value) => {
    setNeutralHueEnd(value)
    changeColor()
  }

  const changeSatStart = (value) => {
    setNeutralSatStart(value)
    changeColor()
  }

  const changeSatEnd = (value) => {
    setNeutralSatEnd(value)
    changeColor()
  }

  const changeLumStart = (value) => {
    setNeutralLumStart(value)
    changeColor()
  }

  const changeLumEnd = (value) => {
    setNeutralLumEnd(value)
    changeColor()
  }

  const changeEasing = (e) => {
    setEasing(e.target.value)
    changeColor()
  }

  const changePrimary = (value) => {
    let hexValue = chroma(value).hex()
    setCustomTheme(prevState => ({
      ...prevState,
      primary: hexValue,
      primaryDark: darkMode ? lighten(0.12, value) : darken(0.12, value),
      primaryTransparent: transparentize(0.8, value),
   }))
  }

  const changeSecondary = (value) => {
    setCustomTheme(prevState => ({
      ...prevState,
      secondary: value,
      secondaryDark: darkMode ? lighten(0.12, value) : darken(0.12, value),
      secondaryTransparent: transparentize(0.8, value),
   }))
  }

  const changeTertiary = (value) => {
    setCustomTheme(prevState => ({
      ...prevState,
      tertiary: value,
      tertiaryDark: darkMode ? lighten(0.12, value) : darken(0.12, value),
      tertiaryTransparent: transparentize(0.8, value),
   }))
  }

  const changeDarkMode = () => {
    setDarkMode(!darkMode)
    changeColor()
  }

  const theme = {
    name: 'Click to Preview',
    grey900: darkMode ? palette[9].hex : palette[0].hex,
    grey800: darkMode ? palette[8].hex : palette[1].hex,
    grey700: darkMode ? palette[7].hex : palette[2].hex,
    grey600: darkMode ? palette[6].hex : palette[3].hex,
    grey500: darkMode ? palette[5].hex : palette[4].hex,
    grey400: darkMode ? palette[4].hex : palette[5].hex,
    grey300: darkMode ? palette[3].hex : palette[6].hex,
    grey200: darkMode ? palette[2].hex : palette[7].hex,
    grey100: darkMode ? palette[1].hex : palette[8].hex,
    grey0: darkMode ? palette[0].hex : palette[9].hex,
    primary: chroma('rgb(255, 134, 243)').hex(),
    secondary: chroma('rgb(0,255,33)').hex(),
    tertiary: chroma('rgb(255,198,56)').hex(),
    primaryTransparent: transparentize(0.8, 'rgb(255, 134, 243)'),
    secondaryTransparent: transparentize(0.8, 'rgb(0, 255, 33)'),
    tertiaryTransparent: transparentize(0.8, 'rgb(255,198,56)'),
    transparent: darkMode ? getTransparent(palette[0].hex) : getTransparent(palette[9].hex),
    primaryDark: darken(0.12,'rgb(255, 134, 243)'),
    secondaryDark: darken(0.12,'rgb(0, 255, 33)'),
    tertiaryDark: darken(0.12,'rgb(255,198,56)')
  }

  const [customTheme, setCustomTheme] = useState(theme)

  useEffect(() => {
    changeColor()
    setCustomTheme(prevState => customTheme);
  }, [customTheme])

  const sendItem = () => {
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE)

    base('themes').create([
      {
        "fields": {
          "grey900": customTheme.grey900,
          "grey800": customTheme.grey800,
          "grey700": customTheme.grey700,
          "grey600": customTheme.grey600,
          "grey500": customTheme.grey500,
          "grey400": customTheme.grey400,
          "grey300": customTheme.grey300,
          "grey200": customTheme.grey200,
          "grey100": customTheme.grey100,
          "grey0": customTheme.grey0,
          "primary": customTheme.primary,
          "secondary": customTheme.secondary,
          "tertiary": customTheme.tertiary,
          "primaryDark": customTheme.primaryDark,
          "secondaryDark": customTheme.secondaryDark,
          "tertiaryDark": customTheme.tertiaryDark,
          "primaryTransparent": customTheme.primaryTransparent,
          "secondaryTransparent": customTheme.secondaryTransparent,
          "tertiaryTransparent": customTheme.tertiaryTransparent,
          "transparent": customTheme.transparent
        }
      }
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
      }
    });
  }

  const addAndSave = () => {
    if (typeof window !== 'undefined') {
      setSending(true)
      localStorage.setItem('customThemes', JSON.stringify(customTheme))
      localStorage.setItem('ryansNotesNewTheme', JSON.stringify(customTheme))
      sendItem()
      setTimeout(() => {
        Router.reload(window.location.pathname)
      }, 1000)
    }
  }

  const toggleActiveSwatch = (name, value) => {
    changeColor()
    setActiveSwatch(value)
    setActiveSwatchName(name)
  }

  const spacings = [
    { name: 'Quad - EaseIn', value: 'easeInQuad'},
    { name: 'Quad - EaseOut', value: 'easeOutQuad'},
    { name: 'Quad - EaseInOut', value: 'easeInOutQuad'},
    { name: 'Quart - EaseIn', value: 'easeInQuart'},
    { name: 'Quart - EaseOut', value: 'easeOutQuart'},
    { name: 'Quart - EaseInOut', value: 'easeInOutQuart'},
    { name: 'Sine - EaseIn', value: 'easeInSine'},
    { name: 'Sine - EaseOut', value: 'easeOutSine'},
    { name: 'Sine - EaseInOut', value: 'easeInOutSine'},
    { name: 'Cubic - EaseIn', value: 'easeInCubic'},
    { name: 'Cubic - EaseOut', value: 'easeOutCubic'},
    { name: 'Cubic - EaseInOut', value: 'easeInOutCubic'},
    { name: 'Expo - EaseIn', value: 'easeInExpo'},
    { name: 'Expo - EaseOut', value: 'easeOutExpo'},
    { name: 'Expo - EaseInOut', value: 'easeInOutExpo'},
    { name: 'Quint - EaseIn', value: 'easeInQuint'},
    { name: 'Quint - EaseOut', value: 'easeOutQuint'},
    { name: 'Quint - EaseInOut', value: 'easeInOutQuint'},
    { name: 'Circ - EaseIn', value: 'easeInCirc'},
    { name: 'Circ - EaseOut', value: 'easeOutCirc'},
    { name: 'Circ - EaseInOut', value: 'easeInOutCirc'},
    { name: 'Back - EaseIn', value: 'easeInBack'},
    { name: 'Back - EaseOut', value: 'easeOutBack'},
    { name: 'Back - EaseInOut', value: 'easeInOutBack'},
    { name: 'Linear', value: 'linear'},
  ]

  return (
    <>
      {
        !sending ? (
          <Card>
            <CardHeader>
              <LargeTitle>New Theme</LargeTitle>
              <div>
                <ButtonPrimary onClick={() => addAndSave()}>Save & Add</ButtonPrimary>
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
                <CardRow>
                  <SwatchGrid>
                    <Swatch active={activeSwatch === customTheme.grey900 ? true : false} onClick={() => toggleActiveSwatch("Grey 900", customTheme.grey900)} title="Grey 900" style={{ background: customTheme.grey900 }}/>
                    <Swatch active={activeSwatch === customTheme.grey800 ? true : false} onClick={() => toggleActiveSwatch("Grey 800", customTheme.grey800)} title="Grey 900" style={{ background: customTheme.grey800 }}/>
                    <Swatch active={activeSwatch === customTheme.grey700 ? true : false} onClick={() => toggleActiveSwatch("Grey 700", customTheme.grey700)} title="Grey 800" style={{ background: customTheme.grey700 }}/>
                    <Swatch active={activeSwatch === customTheme.grey600 ? true : false} onClick={() => toggleActiveSwatch("Grey 600", customTheme.grey600)} title="Grey 600" style={{ background: customTheme.grey600 }}/>
                    <Swatch active={activeSwatch === customTheme.grey500 ? true : false} onClick={() => toggleActiveSwatch("Grey 500", customTheme.grey500)} title="Grey 500" style={{ background: customTheme.grey500 }}/>
                    <Swatch active={activeSwatch === customTheme.grey400 ? true : false} onClick={() => toggleActiveSwatch("Grey 400", customTheme.grey400)} title="Grey 400" style={{ background: customTheme.grey400 }}/>
                    <Swatch active={activeSwatch === customTheme.grey300 ? true : false} onClick={() => toggleActiveSwatch("Grey 300", customTheme.grey300)} title="Grey 300" style={{ background: customTheme.grey300 }}/>
                    <Swatch active={activeSwatch === customTheme.grey200 ? true : false} onClick={() => toggleActiveSwatch("Grey 200", customTheme.grey200)} title="Grey 200" style={{ background: customTheme.grey200 }}/>
                    <Swatch active={activeSwatch === customTheme.grey100 ? true : false} onClick={() => toggleActiveSwatch("Grey 100", customTheme.grey100)} title="Grey 100" style={{ background: customTheme.grey100 }}/>
                    <Swatch active={activeSwatch === customTheme.grey0 ? true : false} onClick={() => toggleActiveSwatch("Grey 0", customTheme.grey0)} title="Grey 0" style={{ background: customTheme.grey0 }}/>
                    <Swatch active={activeSwatch === customTheme.primary ? true : false} onClick={() => toggleActiveSwatch("Primary", customTheme.primary)} title="Primary" style={{ background: customTheme.primary }}/>
                    <Swatch active={activeSwatch === customTheme.primaryTransparent ? true : false} onClick={() => toggleActiveSwatch("Primary Transparent", customTheme.primaryTransparent)} title="Primary Transparent" style={{ background: customTheme.primaryTransparent }}/>
                    <Swatch active={activeSwatch === customTheme.primaryDark ? true : false} onClick={() => toggleActiveSwatch("Primary Dark", customTheme.primaryDark)} title="Primary Dark" style={{ background: customTheme.primaryDark }}/>
                    <Swatch active={activeSwatch === customTheme.secondary ? true : false} onClick={() => toggleActiveSwatch("Secondary", customTheme.secondary)} title="Secondary" style={{ background: customTheme.secondary }}/>
                    <Swatch active={activeSwatch === customTheme.secondaryTransparent ? true : false} onClick={() => toggleActiveSwatch("Secondary Transparent", customTheme.secondaryTransparent)} title="Secondary Transparent" style={{ background: customTheme.secondaryTransparent }}/>
                    <Swatch active={activeSwatch === customTheme.secondaryDark ? true : false} onClick={() => toggleActiveSwatch("Secondary Dark", customTheme.secondaryDark)} title="Secondary Dark" style={{ background: customTheme.secondaryDark }}/>
                    <Swatch active={activeSwatch === customTheme.tertiary ? true : false} onClick={() => toggleActiveSwatch("Tertiary", customTheme.tertiary)} title="Tertiary" style={{ background: customTheme.tertiary }}/>
                    <Swatch active={activeSwatch === customTheme.tertiaryTransparent ? true : false} onClick={() => toggleActiveSwatch("Tertiary Transparent", customTheme.tertiaryTransparent)} title="Tertiary Transparent" style={{ background: customTheme.tertiaryTransparent }}/>
                    <Swatch active={activeSwatch === customTheme.tertiaryDark ? true : false} onClick={() => toggleActiveSwatch("Tertiary Dark", customTheme.tertiaryDark)} title="Tertiary Dark" style={{ background: customTheme.tertiaryDark }}/>
                    <Swatch active={activeSwatch === customTheme.transparent ? true : false} onClick={() => toggleActiveSwatch("Transparent", customTheme.transparent)} title="Transparent" style={{ background: customTheme.transparent }}/>
                  </SwatchGrid>
                  {
                    activeSwatch !== null ?
                    (
                      <div style={{ padding: `${designTokens.space[2]} 0` }}>
                        <small>
                          <strong>{activeSwatchName}</strong>
                          <br/>
                          {activeSwatch}
                        </small>
                      </div>
                    )
                    :
                      null
                  }
                </CardRow>
              </CardColumn>
              <CardColumn>
                <CardBody grid={'repeat(2, 1fr)'}>
                  <CardColumn>
                    <CardRow bottomBorder>
                      <SectionTitle spacing="true">Primary</SectionTitle>
                      <ColorPicker
                        color={customTheme.primary}
                        changeColor={changePrimary}
                      />
                      <div style={{ marginTop: designTokens.space[2] }}>
                        <ContrastChecker
                          foregroundColor={customTheme.grey0}
                          backgroundColor={customTheme.primary}
                        />
                      </div>
                    </CardRow>
                  </CardColumn>
                  <CardColumn>
                    <CardRow bottomBorder>
                      <SectionTitle spacing="true">Secondary</SectionTitle>
                      <ColorPicker
                        color={customTheme.secondary}
                        changeColor={changeSecondary}
                      />
                      <div style={{ marginTop: designTokens.space[2] }}>
                        <ContrastChecker
                          foregroundColor={customTheme.grey0}
                          backgroundColor={customTheme.secondary}
                        />
                      </div>
                    </CardRow>
                  </CardColumn>
                  <CardColumn>
                    <CardRow bottomBorder>
                      <SectionTitle spacing="true">Tertiary</SectionTitle>
                      <ColorPicker
                        color={customTheme.tertiary}
                        changeColor={changeTertiary}
                      />
                      <div style={{ marginTop: designTokens.space[2] }}>
                        <ContrastChecker
                          foregroundColor={customTheme.grey0}
                          backgroundColor={customTheme.tertiary}
                        />
                      </div>
                    </CardRow>
                  </CardColumn>
                  <CardColumn>
                    <CardRow bottomBorder>
                      <SectionTitle spacing="true">Color Easing</SectionTitle>
                      <select
                        value={easing}
                        onChange={changeEasing}
                        style={{ marginBottom: `calc(${designTokens.space[4]} + ${designTokens.space[2]} - 2px)` }}
                      >
                        {
                          spacings.map(option => (
                            <option key={option.name} value={option.value}>{option.name}</option>
                          ))
                        }
                      </select>
                    </CardRow>
                  </CardColumn>
                </CardBody>
                <CardRow>
                  <FlexContainer>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center'
                    }}>
                      <SectionTitle>Neutrals</SectionTitle>
                      <div style={{ marginRight: designTokens.space[2]}}/>
                      <ContrastChecker
                        foregroundColor={customTheme.grey900}
                        backgroundColor={customTheme.grey0}
                      />
                    </div>
                  </FlexContainer>
                </CardRow>
                <CardBody grid={'repeat(2, 1fr)'}>
                  <CardRow>
                    <FlexContainer>
                      <SectionSubtitle>Hue Start</SectionSubtitle>
                      <small>{neutralHueStart}</small>
                    </FlexContainer>
                    <RangeSlider
                      min={0}
                      max={359}
                      value={neutralHueStart}
                      modifier={'hue'}
                      changeFunction={changeHueStart}
                    />
                  </CardRow>
                  <CardRow>
                    <FlexContainer>
                      <SectionSubtitle>Hue End</SectionSubtitle>
                      <small>{neutralHueEnd}</small>
                    </FlexContainer>
                    <RangeSlider
                      min={0}
                      max={359}
                      value={neutralHueEnd}
                      modifier={'hue'}
                      changeFunction={changeHueEnd}
                    />
                  </CardRow>
                  <CardRow>
                    <FlexContainer>
                      <SectionSubtitle>Saturation Start</SectionSubtitle>
                      <small>{neutralSatStart}%</small>
                    </FlexContainer>
                    <RangeSlider
                      min={0}
                      max={100}
                      value={neutralSatStart}
                      modifier={'saturation'}
                      changeFunction={changeSatStart}
                    />
                  </CardRow>
                  <CardRow>
                    <FlexContainer>
                      <SectionSubtitle>Saturation End</SectionSubtitle>
                      <small>{neutralSatEnd}%</small>
                    </FlexContainer>
                    <RangeSlider
                      min={0}
                      max={100}
                      value={neutralSatEnd}
                      modifier={'saturation'}
                      changeFunction={changeSatEnd}
                    />
                  </CardRow>
                  <CardRow bottomBorder>
                    <FlexContainer>
                      <SectionSubtitle>Brightness Start</SectionSubtitle>
                      <small>{neutralLumStart}%</small>
                    </FlexContainer>
                    <RangeSlider
                      min={0}
                      max={40}
                      value={neutralLumStart}
                      modifier={darkMode ? 'brightness-rev-start' : 'brightness-start'}
                      changeFunction={changeLumStart}
                    />
                  </CardRow>
                  <CardRow bottomBorder>
                    <FlexContainer>
                      <SectionSubtitle>Brightness End</SectionSubtitle>
                      <small>{neutralLumEnd}%</small>
                    </FlexContainer>
                    <RangeSlider
                      min={60}
                      max={100}
                      value={neutralLumEnd}
                      modifier={darkMode ? 'brightness-rev-end' : 'brightness-end'}
                      changeFunction={changeLumEnd}
                    />
                  </CardRow>
                </CardBody>
              </CardColumn>
              <MobileContainer>
                <CardRow>
                  <div>
                    <MobileButton onClick={() => addAndSave()}>Save & Add</MobileButton>
                  </div>
                </CardRow>
              </MobileContainer>
            </CardBody>
          </Card>
        )
        :
        <Card>
          <div style={{ padding: designTokens.space[4], textAlign: 'center' }}>
          Sending your theme and updating!
          </div>
        </Card>
      }
    </>
  )
}

export default ThemeCreator