import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import Preview from './Preview'
import Sidebar from './Sidebar'
import { transparentize, darken, lighten, saturate } from 'polished'
import generate from '@utils/generate'
import namer from 'color-namer'
import { useRouter } from 'next/router'

const CreatorLayout = styled.div`
  display: flex;
  width: 100%;
  height:100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--grey0);
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    position: fixed;
    top: 0;
    botton: 0;
    right: 0;
    left: 0;
    flex-direction: column-reverse;
  }
`

const ThemeCreatorV2 = ({ defaultTheme }) => {

  const [theme, setTheme] = useState(defaultTheme)
  const [dark, setDark] = useState(false)
  const [neutrals, setNeutrals] = useState({
    hueStart: 287,
    hueEnd: 173,
    satStart: 40,
    satEnd: 10,
    lumStart: 12,
    lumEnd: 87
  })
  const [easing, setEasing] = useState('easeInQuad')

  const input = {
    specs: {
      steps: 10,
      hue_start: parseInt(neutrals.hueStart),
      hue_end: parseInt(neutrals.hueEnd),
      hue_curve: easing,
      sat_start: parseInt(neutrals.satStart),
      sat_end: parseInt(neutrals.satEnd),
      sat_curve: easing,
      sat_rate: 100,
      lum_start: parseInt(neutrals.lumStart),
      lum_end: parseInt(neutrals.lumEnd),
      lum_curve: easing,
      modifier: 10
    }
  }

  const getName = hex => {
    const names = namer(hex)
    const colorName = names.pantone[0].name
    const capitalized = colorName.charAt(0).toUpperCase() + colorName.slice(1)
    return capitalized
  }

  const changeColor = (target, value) => {
    switch(target) {
      case 'primary':
        setTheme({
          ...theme,
          primary: value,
          primaryTransparent: transparentize(0.8, value),
          primaryDark: dark ? lighten(0.12, value) : darken(0.12, value)
        });
        break;
      case 'secondary':
        setTheme({
          ...theme,
          secondary: value,
          secondaryTransparent: transparentize(0.8, value),
          secondaryDark: dark ? lighten(0.12, value) : darken(0.12, value)
        });
        break;
      case 'tertiary':
        setTheme({
          ...theme,
          tertiary: value,
          tertiaryTransparent: transparentize(0.8, value),
          tertiaryDark: dark ? lighten(0.12, value) : darken(0.12, value)
        });
        break;
    }
  };

  const changeNeutrals = (target, value) => {
    switch(target) {
      case 'hueStart':
        setNeutrals({
          ...neutrals,
          hueStart: value
        })
        break;
      case 'hueEnd':
        setNeutrals({
          ...neutrals,
          hueEnd: value
        })
        break;
      case 'satStart':
        setNeutrals({
          ...neutrals,
          satStart: value
        })
        break;
      case 'satEnd':
        setNeutrals({
          ...neutrals,
          satEnd: value
        })
        break;
      case 'lumStart':
        setNeutrals({
          ...neutrals,
          lumStart: value
        })
        break;
      case 'lumEnd':
        setNeutrals({
          ...neutrals,
          lumEnd: value
        })
        break;
      case 'easing':
        setEasing(value)
        break;
    }

    const updatedNeutrals = generate(input)
    setTheme({
      ...theme,
      grey0: dark ? updatedNeutrals[0].hex : updatedNeutrals[9].hex,
      grey100: dark ? updatedNeutrals[1].hex : updatedNeutrals[8].hex,
      grey200: dark ? updatedNeutrals[2].hex : updatedNeutrals[7].hex,
      grey300: dark ? updatedNeutrals[3].hex : updatedNeutrals[6].hex,
      grey400: dark ? updatedNeutrals[4].hex : updatedNeutrals[5].hex,
      grey500: dark ? updatedNeutrals[5].hex : updatedNeutrals[4].hex,
      grey600: dark ? updatedNeutrals[6].hex : updatedNeutrals[3].hex,
      grey700: dark ? updatedNeutrals[7].hex : updatedNeutrals[2].hex,
      grey900: dark ? updatedNeutrals[8].hex : updatedNeutrals[1].hex,
      grey900: dark ? updatedNeutrals[9].hex : updatedNeutrals[0].hex,
      transparent: transparentize(0.25, updatedNeutrals[9].hex)
    })
  }

  const changeDarkMode = () => {
    setTheme({
      ...theme,
      grey0: theme.grey900,
      grey100: theme.grey800,
      grey200: theme.grey700,
      grey300: theme.grey600,
      grey400: theme.grey500,
      grey500: theme.grey400,
      grey600: theme.grey300,
      grey700: theme.grey200,
      grey800: theme.grey100,
      grey900: theme.grey0,
      primaryDark: dark ? lighten(0.12, theme.primary) : darken(0.12, theme.primary),
      secondaryDark: dark ? lighten(0.12, theme.secondary) : darken(0.12, theme.secondary),
      tertiaryDark: dark ? lighten(0.12, theme.tertiary) : darken(0.12, theme.tertiary),
      transparent: transparentize(0.25, theme.grey900)
    });
    setDark(!dark)
  }

  const router = useRouter()

  const submitTheme = async () => {

    setTheme({
      ...theme,
      name: `${getName(theme.primary)} and ${getName(theme.grey500)}`
    })

    const submitted = {
      name: `${getName(theme.primary)} and ${getName(theme.grey500)}`,
      grey900: theme.grey900,
      grey800: theme.grey800,
      grey700: theme.grey700,
      grey600: theme.grey600,
      grey500: theme.grey500,
      grey400: theme.grey400,
      grey300: theme.grey300,
      grey200: theme.grey200,
      grey100: theme.grey100,
      grey0: theme.grey0,
      transparent: transparentize(0.25, theme.grey0),
      primary: theme.primary,
      primaryTransparent: theme.primaryTransparent,
      primaryDark: theme.primaryDark,
      secondary: theme.secondary,
      secondaryTransparent: theme.secondaryTransparent,
      secondaryDark: theme.secondaryDark,
      tertiary: theme.tertiary,
      tertiaryTransparent: theme.tertiaryTransparent,
      tertiaryDark: theme.tertiaryDark
    }

    const response = await fetch('../api/themes/submit', {
      method: 'POST',
      body: JSON.stringify({ submitted }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()

    console.log(theme)

    localStorage.setItem('ryansNotesNewTheme', JSON.stringify(theme))
    setTimeout(() => {
      router.reload()
    }, 500)
  }

  useEffect(() => {

  }, [theme])

  return (
    <CreatorLayout>
      <Sidebar
        theme={theme}
        changeColor={changeColor}
        darkMode={dark}
        changeDarkMode={changeDarkMode}
        neutrals={neutrals}
        changeNeutrals={changeNeutrals}
        submitTheme={submitTheme}
        easing={easing}
      />
      <Preview theme={theme} />
    </CreatorLayout>
  )
}

export default ThemeCreatorV2