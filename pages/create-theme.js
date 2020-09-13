import React, { useState } from 'react'
import Layout from '@components/Layout/'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import ColorPicker from '@components/ColorPicker'
import { SliderPicker } from 'react-color'
import ThemeItem from '@components/ThemeItem'
import { transparentize, darken, lighten, saturate } from 'polished'
import { Button, ButtonPrimary } from '@components/Button'
import generate from '@utils/generate'
import chroma from 'chroma-js'
import RangeSlider from '@components/RangeSlider'
import Switch from '@components/Switch'
import Router from 'next/router'

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
  grid-template-columns: ${(props) => props.grid ? props.grid : '1fr 3fr'};
  grid-column-gap: 0;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    grid-template-columns: 1fr;
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

const Swatch = styled.div`
  width: ${designTokens.space[3]};
  height: ${designTokens.space[3]};
  margin: auto;
  border-radius: 50%;
  border: 1px solid var(--borderColor);
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

const CreateTheme = ({ title, description, ...props }) => {

  const [neutralHueStart, setNeutralHueStart] = useState(190)
  const [neutralHueEnd, setNeutralHueEnd] = useState(210)
  const [neutralSatStart, setNeutralSatStart] = useState(5)
  const [neutralSatEnd, setNeutralSatEnd] = useState(15)
  const [neutralLumStart, setNeutralLumStart] = useState(10)
  const [neutralLumEnd, setNeutralLumEnd] = useState(90)
  const [darkMode, setDarkMode] = useState(false)

  const input = {
    specs: {
      steps: 10,
      hue_start: neutralHueStart,
      hue_end: neutralHueEnd,
      hue_curve: "easeInQuad",
      sat_start: neutralSatStart,
      sat_end: neutralSatEnd,
      sat_curve: "easeOutQuad",
      sat_rate: 100,
      lum_start: neutralLumStart,
      lum_end: neutralLumEnd,
      lum_curve: "easeOutQuad",
      modifier: 10
    }
  }

  const palette = generate(input)

  const changeColor = () => {
    let newNeutralTheme = []
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
      }))
    }
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

  const changePrimary = (value) => {
    setCustomTheme(prevState => ({
      ...prevState,
      primary: value,
      primaryDark: darken(0.12, value),
      primaryTransparent: transparentize(0.8, value),
   }))
  }

  const changeSecondary = (value) => {
    setCustomTheme(prevState => ({
      ...prevState,
      secondary: value,
      secondaryDark: darken(0.12, value),
      secondaryTransparent: transparentize(0.8, value),
   }))
  }

  const changeTertiary = (value) => {
    setCustomTheme(prevState => ({
      ...prevState,
      tertiary: value,
      tertiaryDark: darken(0.12, value),
      tertiaryTransparent: transparentize(0.8, value),
   }))
  }

  const changeDarkMode = () => {
    setDarkMode(!darkMode)
    changeColor()
  }

  const theme = {
    name: 'Custom Theme',
    grey900: palette[0].hex,
    grey800: palette[1].hex,
    grey700: palette[2].hex,
    grey600: palette[3].hex,
    grey500: palette[4].hex,
    grey400: palette[5].hex,
    grey300: palette[6].hex,
    grey200: palette[7].hex,
    grey100: palette[8].hex,
    grey0: palette[9].hex,
    primary: 'rgb(235, 87, 87)',
    tertiary: 'rgb(249,191,82)',
    secondary: 'rgb(6, 156, 205)',
    primaryTransparent: transparentize(0.8, 'rgb(235, 87, 87)'),
    tertiaryTransparent: transparentize(0.8, 'rgb(249,191,82)'),
    secondaryTransparent: transparentize(0.8, 'rgb(6, 156, 205)'),
    transparent: transparentize(0.25, 'rgb(255,255,255)'),
    secondaryDark: darken(0.12,'rgb(6, 156, 205)'),
    primaryDark: darken(0.12,'rgb(235, 87, 87)'),
    tertiaryDark: darken(0.12,'rgb(249,191,82)')
  }

  const [customTheme, setCustomTheme] = useState(theme)

  const addAndSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('customThemes', JSON.stringify(customTheme))
      localStorage.setItem('ryansNotesNewTheme', JSON.stringify(customTheme))
      Router.reload(window.location.pathname)
    }
  }

  return (
    <>
      <Layout pageTitle={`${title} | Create a Theme`} description={description}>
        <h2>[WIP] Create a Theme 🎨</h2>
        <p>If you've stumbled onto this website, you're most likely a designer - or probably very design minded 👍.</p>
        <p>As designers, we're naturally curious and enjoy tinkering with things - so why not play around with creating a new theme for this website! <strong>Have fun!</strong></p>
        <Card>
          <CardHeader>
            <LargeTitle>New Theme</LargeTitle>
            <div>
              {/*<Button marginRight={designTokens.space[2]}>Test</Button>*/}
              <ButtonPrimary onClick={() => addAndSave()}>Save & Add</ButtonPrimary>
            </div>
          </CardHeader>
          <CardBody>
            <CardColumn tinted>
              <CardRow bottomBorder>
                <SectionTitle>Preview ✨</SectionTitle>
              </CardRow>
              <CardRow bottomBorder>
                <ThemeItem
                  theme={customTheme}
                />
              </CardRow>
              <CardRow>
                <SwatchGrid>
                  <Swatch style={{ background: customTheme.grey900 }}/>
                  <Swatch style={{ background: customTheme.grey800 }}/>
                  <Swatch style={{ background: customTheme.grey700 }}/>
                  <Swatch style={{ background: customTheme.grey600 }}/>
                  <Swatch style={{ background: customTheme.grey500 }}/>
                  <Swatch style={{ background: customTheme.grey400 }}/>
                  <Swatch style={{ background: customTheme.grey300 }}/>
                  <Swatch style={{ background: customTheme.grey200 }}/>
                  <Swatch style={{ background: customTheme.grey100 }}/>
                  <Swatch style={{ background: customTheme.grey0 }}/>
                  <Swatch style={{ background: customTheme.primary }}/>
                  <Swatch style={{ background: customTheme.primaryTransparent }}/>
                  <Swatch style={{ background: customTheme.primaryDark }}/>
                  <Swatch style={{ background: customTheme.secondary }}/>
                  <Swatch style={{ background: customTheme.secondaryTransparent }}/>
                  <Swatch style={{ background: customTheme.secondaryDark }}/>
                  <Swatch style={{ background: customTheme.tertiary }}/>
                  <Swatch style={{ background: customTheme.tertiaryTransparent }}/>
                  <Swatch style={{ background: customTheme.tertiaryDark }}/>
                </SwatchGrid>
              </CardRow>
            </CardColumn>
            <CardColumn>
              <CardRow bottomBorder>
                <FlexContainer>
                  <SectionTitle>Neutrals</SectionTitle>
                  <Switch
                    isOn={darkMode}
                    handleToggle={() => changeDarkMode()}
                    startLabel={'Light'}
                    endLabel={'Dark'}
                  />
                </FlexContainer>
              </CardRow>
              <CardBody grid={'repeat(2, 1fr)'}>
                <CardRow bottomBorder>
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
                <CardRow bottomBorder>
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
                <CardRow bottomBorder>
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
                <CardRow bottomBorder>
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
                    modifier={darkMode ? 'brightness-rev' : 'brightness'}
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
                    modifier={darkMode ? 'brightness-rev' : 'brightness'}
                    changeFunction={changeLumEnd}
                  />
                </CardRow>
              </CardBody>
              <CardBody grid={'repeat(2, 1fr)'}>
                <CardColumn>
                  <CardRow bottomBorder>
                    <SectionTitle spacing>Primary</SectionTitle>
                    <ColorPicker
                      color={customTheme.primary}
                      changeColor={changePrimary}
                    />
                  </CardRow>
                </CardColumn>
                <CardColumn>
                  <CardRow bottomBorder>
                    <SectionTitle spacing>Secondary</SectionTitle>
                    <ColorPicker
                      color={customTheme.secondary}
                      changeColor={changeSecondary}
                    />
                  </CardRow>
                </CardColumn>
                <CardColumn>
                  <CardRow bottomBorder>
                    <SectionTitle spacing>Tertiary</SectionTitle>
                    <ColorPicker
                      color={customTheme.tertiary}
                      changeColor={changeTertiary}
                    />
                  </CardRow>
                </CardColumn>
                <CardColumn>

                </CardColumn>
              </CardBody>
            </CardColumn>
          </CardBody>
        </Card>
        <div style={{
          textAlign: 'center',
          paddingTop: designTokens.space[3]
        }}>
          <div style={{
            marginBottom: designTokens.space[2],
            color: 'var(--grey400)'
          }}>
            <small>Powered by</small>
          </div>
          <a
            style={{
              display: 'inline-flex',
              alignItems: 'center'
            }}
            href="https://github.com/lyft/coloralgorithm"
            target="_blank"
          >
          <svg width="24px" height="24px" viewBox="0 0 29 29" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient x1="90.5486726%" y1="-18.7679634%" x2="29.4247788%" y2="84.8213047%" id="linearGradient-1">
                <stop stop-color="#191445" offset="0%"></stop>
                <stop stop-color="#645EE9" offset="27%"></stop>
                <stop stop-color="#943FFF" offset="66%"></stop>
                <stop stop-color="#FF01BE" offset="91%"></stop>
              </linearGradient>
            </defs>
            <g id="Artboard" stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
              <rect fill="#FFFFFF" x="0" y="0" width="29" height="29"></rect>
              <g id="Asset-1" transform="translate(1.000000, 1.000000)">
                <polyline id="Path" stroke="#1A1445" strokeWidth="4.8467498" points="26.3144782 25.8848301 0.562415289 25.8848301 0.562415289 0.410267857"></polyline>
                <path d="M0.562415289,0.410267857 L26.3235972,0.410267857 L26.3235972,25.8938508 L26.3235972,25.8938508 C12.0960893,25.8938508 0.562415289,14.4844621 0.562415289,0.410267857 L0.562415289,0.410267857 L0.562415289,0.410267857 Z" id="Path" stroke="url(#linearGradient-1)" strokeWidth="6"></path>
              </g>
            </g>
          </svg>
          <span style={{
            marginLeft: designTokens.space[2]
          }}>
            <strong>ColorBox</strong>{' '}
            <small>by Lyft Design</small>
          </span>
          </a>
        </div>
      </Layout>
    </>
  )
}

export default CreateTheme

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
