import React from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import ColorPicker from '@components/ColorPicker'
import Link from 'next/link'
import List, { ListItem } from '@components/List'
import Switch from '@components/Switch'
import ContrastChecker from '@components/ContrastChecker'
import { transparentize, darken, lighten, saturate } from 'polished'
import RangeSlider from '@components/RangeSlider'
import Chip from '@components/Chip'
import { ButtonPrimary } from '@components/Button'

const SidebarContainer = styled.div`
  padding: ${designTokens.space[7]} ${designTokens.space[5]};
  width: 100%;
  max-width: 40%;
  height: 100%;
  overflow-y: scroll;
  @media screen and (max-width: ${designTokens.breakpoints[3]}) {
    max-width: 50%;
  }
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    max-width: 100%;
    padding: ${designTokens.space[4]} ${designTokens.space[3]};
  }
`

const Label = styled.span`
  font-size: ${designTokens.fontSizes[1]};
  font-weight: ${designTokens.fontWeights.bold};
  display: block;
  margin-bottom: ${designTokens.space[2]};
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${designTokens.space[2]} 0 ${designTokens.space[3]};
  ${ButtonPrimary} {
    display: block;
    width: 100%;
  }
`

const InputContainer = styled.div`
  width: 50%;
`

const SmallLabel = styled.span`
  font-weight: ${designTokens.fontWeights.body};
  font-size: ${designTokens.fontSizes[0]};
  margin-left: ${designTokens.space[1]};
`

const SliderGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: ${designTokens.space[4]};
  --grey0: ${props => props.theme.grey0};
  --grey400: ${props => props.theme.grey400};
  --grey900: ${props => props.theme.grey900};
  --primary: ${props => props.theme.primary};
`

const ListTitle = styled.li`
  padding: ${designTokens.space[4]} 0 0;
  color: var(--grey600);
  font-size: ${designTokens.fontSizes[0]};
`

const LogoIcon = styled.div`
  width: ${designTokens.space[7]};
  height: ${designTokens.space[7]};
  overflow: hidden;
  display: block;
  box-shadow: 0px ${designTokens.space[1]} ${designTokens.space[2]} rgba(0,0,0,0.12);
  border: 1px solid var(--grey200);
  border-radius: calc(${designTokens.space[2]} + ${designTokens.space[1]});
  img {
    display: block;
    width: 100%;
  }
`

const LogoHorizontal = styled.div`
  display: flex;
  align-items: center;
  margin: ${designTokens.space[5]} 0 ${designTokens.space[3]};
  .title {
    margin-top: 0;
    margin-bottom: ${designTokens.space[1]};
  }
`

const ColorItem = ({dark, textColor, label, color, changeColor }) => {

  const updateValue = (value) => {
    changeColor(label.toLowerCase(), value)
  }

  return(
    <Row>
      <div>
        <Label>{label}</Label>
      </div>
      <InputContainer>
        <ColorPicker
          color={color}
          changeColor={updateValue}
        />
      </InputContainer>
    </Row>
  )
}

const Sidebar = ({ easing, submitTheme, neutrals, theme, changeColor, darkMode, changeDarkMode, changeNeutrals }) => {
  const colors = [
    {name: 'Primary', value: theme.primary},
    {name: 'Secondary', value: theme.secondary},
    {name: 'Tertiary', value: theme.tertiary}
  ]

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

  const updateHueStart = (value) => {
    changeNeutrals('hueStart', value)
  }

  const updateHueEnd = (value) => {
    changeNeutrals('hueEnd', value)
  }

  const updateSatStart = (value) => {
    changeNeutrals('satStart', value)
  }

  const updateSatEnd = (value) => {
    changeNeutrals('satEnd', value)
  }

  const updateLumStart = (value) => {
    changeNeutrals('lumStart', value)
  }

  const updateLumEnd = (value) => {
    changeNeutrals('lumEnd', value)
  }

  const updateEasing = (e) => {
    changeNeutrals('easing', e.target.value)
  }
updateEasing
  return(
    <SidebarContainer>
      <Link href={'/create-theme'}>
        <a className="link">
          ←{' '}Back
        </a>
      </Link>
      <LogoHorizontal>
        <LogoIcon>
          <img src="/static/projects/icon-theme-creator.png"/>
        </LogoIcon>
        <div style={{ paddingLeft: designTokens.space[3]}}>
          <h3 className="title">Create a Theme</h3>
          <small>
            <span>Version 2</span><Chip ml={designTokens.space[2]} ghost type={'primary'}>Beta</Chip>
          </small>
        </div>
      </LogoHorizontal>
      <p className="lead">Pick a few colors and build a new theme!</p>
      <List>
        <ListItem>
          <Row>
            <Label>Dark Mode</Label>
            <Switch
              isOn={darkMode}
              handleToggle={() => changeDarkMode(!darkMode)}
              startLabel={'Light'}
              endLabel={'Dark'}
            />
          </Row>
        </ListItem>
        <ListTitle>
          State colors
        </ListTitle>
        {
          colors.map(item => (
            <ListItem key={item.name}>
              <ColorItem
                label={item.name}
                color={item.value}
                changeColor={changeColor}
                textColor={theme.grey0}
                dark={darkMode}
              />
            </ListItem>
          ))
        }
        <ListTitle>
          Neutral colors
        </ListTitle>
        <ListItem>
          <Row>
            <SliderGrid theme={theme}>
              <div>
                <Label>Hue Start <SmallLabel>{neutrals.hueStart}</SmallLabel></Label>
                <RangeSlider
                  min={0}
                  max={359}
                  value={neutrals.hueStart}
                  changeFunction={updateHueStart}
                  modifier={'hue'}
                />
              </div>
              <div>
                <Label>Hue End <SmallLabel>{neutrals.hueEnd}</SmallLabel></Label>
                <RangeSlider
                  min={0}
                  max={359}
                  value={neutrals.hueEnd}
                  changeFunction={updateHueEnd}
                  modifier={'hue'}
                />
              </div>
            </SliderGrid>
          </Row>
        </ListItem>
        <ListItem>
          <Row>
            <SliderGrid theme={theme}>
              <div>
                <Label>Saturation Start <SmallLabel>{neutrals.satStart}</SmallLabel></Label>
                <RangeSlider
                  min={0}
                  max={100}
                  value={neutrals.satStart}
                  changeFunction={updateSatStart}
                  modifier={'saturation'}
                />
              </div>
              <div>
                <Label>Saturation End <SmallLabel>{neutrals.satEnd}</SmallLabel></Label>
                <RangeSlider
                  min={0}
                  max={100}
                  value={neutrals.satEnd}
                  changeFunction={updateSatEnd}
                  modifier={'saturation'}
                />
              </div>
            </SliderGrid>
          </Row>
        </ListItem>
        <ListItem>
          <Row>
            <SliderGrid theme={theme}>
              <div>
                <Label>Brightness Start <SmallLabel>{neutrals.lumStart}</SmallLabel></Label>
                <RangeSlider
                  min={0}
                  max={40}
                  value={neutrals.lumStart}
                  changeFunction={updateLumStart}
                  modifier={darkMode ? 'brightness-rev-start' : 'brightness-start'}
                  colors
                />
              </div>
              <div>
                <Label>Brightness End <SmallLabel>{neutrals.lumEnd}</SmallLabel></Label>
                <RangeSlider
                  min={60}
                  max={100}
                  value={neutrals.lumEnd}
                  changeFunction={updateLumEnd}
                  modifier={darkMode ? 'brightness-rev-end' : 'brightness-end'}
                />
              </div>
            </SliderGrid>
          </Row>
        </ListItem>
        <ListItem>
          <Row>
            <select
              onChange={updateEasing}
              value={easing}
            >
              {
                spacings.map(option => (
                  <option key={option.name} value={option.value}>{option.name}</option>
                ))
              }
            </select>
          </Row>
        </ListItem>
        <ListItem>
          <Row>
            <ButtonPrimary onClick={() => submitTheme()}>
              Use this theme!
            </ButtonPrimary>
          </Row>
        </ListItem>
      </List>
    </SidebarContainer>
  )
}

export default Sidebar