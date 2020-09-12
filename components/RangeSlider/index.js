import React, { useState } from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const Slider = styled.input`
  padding: 0;
  -webkit-appearance: none;
  appearance: none;
  margin-top: ${designTokens.space[3]};
  width: 100%;
  height: ${designTokens.space[2]};
  border-radius: 999px;
  outline: none;
  background: transparent;
  border: 1px solid var(--grey300);
  box-shadow: inset 0px 0px 2px var(--grey300);
  &.hue {
    background: linear-gradient(90deg,red,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red);
  }
  &.saturation {
    background: linear-gradient(to right, transparent, var(--primary));
  }
  &.brightness {
    background: linear-gradient(to right, var(--grey0), var(--grey900));
  }
  &.brightness-rev {
    background: linear-gradient(to right, var(--grey900), var(--grey0));
  }
  &::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		height: ${designTokens.space[4]};
		width: ${designTokens.space[4]};
    border-radius: 50%;
    border: 1px solid var(--grey300);
    background: linear-gradient(to top, var(--grey100), var(--grey0));
    box-shadow: 0px 1px 3px rgba(0,0,0,0.2);
		cursor: grab;
		position: relative;
		transition: all 150ms ease;
		
		&:focus, &:active {
			box-shadow: 0px 0px 0px ${designTokens.space[2]} var(--primaryTransparent);
		}
		&:active {
			cursor: grabbing;
		}
  }
  &:focus, &:active {
    border-color: var(--grey300);
  }
`

export default function RangeSlider({min, max, value, changeFunction, modifier=null}) {

  const [currentValue, setCurrentValue] = useState(value)

  const handleChange = e => {
    setCurrentValue(e.target.value)
    console.log(currentValue)
    changeFunction(e.target.value)
  }
  return(
    <>
      <Slider
        className={modifier}
        type="range"
        min={min}
        max={max}
        value={currentValue}
        onChange={handleChange}
      />
    </>
  )
}