import React, { useState } from 'react';
import { CustomPicker, ChromePicker } from 'react-color';
import { designTokens } from '@components/Theme/designTokens'
import styled from 'styled-components'

const PickerContainer = styled.div`
  width: 100%;
  margin-top: ${designTokens.space[2]};
  position: relative;
  cursor: pointer;
  border-radius: ${designTokens.space[1]};
  border: 1px solid var(--grey400);
  &:hover, &:focus {
    background: var(--grey100);
  }
  &:focus, &:active {
    border-color: var(--primary);
  }
`

const PickerInput = styled.input`
 margin-top: 0;
 margin-bottom: 0;
 padding: ${designTokens.space[2]} ${designTokens.space[2]} ${designTokens.space[2]} calc(${designTokens.space[8]} + ${designTokens.space[3]});
 background: transparent;
 font-size: ${designTokens.sizing._sm};
 user-select: none;
 cursor: pointer;
 border: 0;
`

const PickerSwatch = styled.div`
  background: ${(props) => props.color ? props.color : 'var(--grey100)'};
  width: 100%;
  height: 100%;
  padding: 0;
  border-radius: ${designTokens.space[1]};
  border: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 120ms ease-out 0s;
`

const PickerButtonContainer = styled.div`
  padding: ${designTokens.space[2]};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${designTokens.space[8]};
  border-right: 1px solid var(--grey400);
`

const SelectContainer = styled.div`
  position: absolute;
  z-index: 100;
  transform: translate(${designTokens.space[3]}, -${designTokens.space[3]});
  input {
    padding: ${designTokens.space[1]};
    background: white;
  }
`

const CloseOverlay = styled.div`
  background: transparent;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const ColorPicker = (props) => {

  const [pickerColor, setPickerColor] = useState(props.hex)
  const [displayPicker, setDisplayPicker] = useState(false)

  const handleChange = (newColor) => {
    let colorVal = newColor
    setPickerColor(colorVal)
    props.changeColor(colorVal)
  }

  const handleDisplay = () => {
    setDisplayPicker(!displayPicker)
  }

  return(
    <>
      <PickerContainer role="button" onClick={() => handleDisplay()}>
        <PickerInput disabled type="text" value={pickerColor} />
        <PickerButtonContainer>
          <PickerSwatch color={pickerColor}/>
        </PickerButtonContainer>
      </PickerContainer>
      {
        displayPicker ?
          (
            <>
              <SelectContainer>
                <ChromePicker
                  color={pickerColor}
                  onChange={
                    (color) => {
                      handleChange(color.hex)
                    }
                  }
                />
              </SelectContainer>
              <CloseOverlay onClick={() => handleDisplay()}/>
            </>
          )
          :
          null
      }
    </>
  )
}

export default CustomPicker(ColorPicker);