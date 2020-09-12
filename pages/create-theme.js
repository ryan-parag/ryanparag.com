import React, { useState } from 'react'
import Layout from '@components/Layout/'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import ColorPicker from '@components/ColorPicker'
import ThemeItem from '@components/ThemeItem'
import { transparentize, darken, lighten, saturate } from 'polished'
import { Button, ButtonPrimary } from '@components/Button'
import generate from '@utils/generate'
import chroma from 'chroma-js'

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
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 0;
`

const CardColumn = styled.div`
  --borderColor: var(--grey200);
  &:not(:last-of-type) {
    border-right: 1px solid var(--borderColor);
  }
  &:first-of-type {
    --borderColor: var(--grey200);
    background: var(--grey100);
  }
`

const CardRow = styled.div`
  padding: ${(props) => props.paddingY ? props.paddingY : designTokens.space[3]} ${(props) => props.paddingX ? props.paddingX : designTokens.space[3]} ${(props) => props.paddingY ? props.paddingY : designTokens.space[3]};
  &:not(:last-of-type) {
    border-bottom: 1px solid var(--borderColor);
  }
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

const CreateTheme = ({ title, description, ...props }) => {

  const theme = {
    name: 'Custom Theme',
    grey900: 'rgb(17,17,17)',
    grey800: 'rgb(55,53,47)',
    grey700: 'rgb(112,110,106)',
    grey600: 'rgb(175,173,170)',
    grey500: 'rgb(223,222,218)',
    grey400: 'rgb(238,237,233)',
    grey300: 'rgb(241,240,237)',
    grey200: 'rgb(247,246,243)',
    grey100: 'rgb(255,254,252)',
    grey0: 'rgb(255,255,255)',
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
  const [themeType, setThemeType] = useState('light')
  const [neutralHue, setNeutralHue] = useState(200)
  const [neutralSat, setNeutralSat] = useState(10)
  const [neutralLum, setNeutralLum] = useState(50)

  const input = {
    specs: {
      steps: 10,
      hue_start: neutralHue + 10,
      hue_end: neutralHue - 10,
      hue_curve: "easeInQuad",
      sat_start: neutralSat - 5,
      sat_end: neutralSat + 5,
      sat_curve: "easeOutQuad",
      sat_rate: 100,
      lum_start: neutralLum - 40,
      lum_end: neutralLum + 40,
      lum_curve: "easeOutQuad",
      modifier: 10
    }
  }

  const palette = generate(input)

  const changeColor = (value) => {
    setCustomTheme(prevState => ({
      ...prevState,
      grey500: value
    }))
    let hue = chroma(value).get('hsl.h')
    let sat = chroma(value).get('hsl.s')
    let lum = chroma(value).get('hsl.l')
    setNeutralHue(hue)
    setNeutralSat(sat)
    let newNeutralTheme = []
    palette.map(color => {
      newNeutralTheme.push(color.hex)
    })
    if(themeType === 'light') {
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
    } else {
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
    }
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

  return (
    <>
      <Layout pageTitle={`${title} | Create a Theme`} description={description}>
        <h2>[WIP] Create a Theme 🎨</h2>
        <p>If you've stumbled onto this website, you're most likely a designer - or probably very design minded 👍.</p>
        <p>As designers, we're naturally curious and enjoy tinkering with things - so why not play around with creating a new theme for this website! <strong>Have fun!</strong></p>
        {
          /*palette.map((color,i) => (
            <div style={{
              background: color.hex,
              color: color.displayColor,
              padding: '16px',
              textAlign: 'center'
            }}>
              Grey{i} {color.hex}
            </div>
          ))*/
        }
        <Card>
          <CardHeader>
            <strong>New Theme</strong>
            <div>
              <Button marginRight={designTokens.space[2]}>Test</Button>
              <ButtonPrimary >Save & Add</ButtonPrimary>
            </div>
          </CardHeader>
          <CardBody>
            <CardColumn>
              <CardRow>
                <small>Preview ✨</small>
              </CardRow>
              <CardRow>
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
              <CardRow>
                <div><strong><small>Neutrals</small></strong></div>
                <ColorPicker
                  color={customTheme.grey500}
                  changeColor={changeColor}
                />
              </CardRow>
              <CardRow>
                <div><strong><small>Primary</small></strong></div>
                <ColorPicker
                  color={customTheme.primary}
                  changeColor={changePrimary}
                />
              </CardRow>
              <CardRow>
                <div><strong><small>Secondary</small></strong></div>
                <ColorPicker
                  color={customTheme.secondary}
                  changeColor={changeSecondary}
                />
              </CardRow>
              <CardRow>
                <div><strong><small>Tertiary</small></strong></div>
                <ColorPicker
                  color={customTheme.tertiary}
                  changeColor={changeTertiary}
                />
              </CardRow>
            </CardColumn>
          </CardBody>
        </Card>
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
