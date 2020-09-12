import React, { useState } from 'react';
import { CustomPicker, ChromePicker } from 'react-color';
import { designTokens } from '@components/Theme/designTokens'
import styled from 'styled-components'

const PickerContainer = styled.div`
  width: 100%;
  margin-top: ${designTokens.space[2]};
  position: relative;
`

const PickerInput = styled.input`
 margin-top: 0;
 margin-bottom: 0;
 padding-left: calc(${designTokens.space[7]} + ${designTokens.space[3]});
`

const PickerButton = styled.button`
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
  &:hover, &:focus {
    transform: scale(1.05);
    box-shadow: 0px 2px 4px var(--grey200);
  }
`

const PickerButtonContainer = styled.div`
  padding: ${designTokens.space[2]};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${designTokens.space[7]};
  border-right: 1px solid var(--grey400);
`

const SelectContainer = styled.div`
  position: absolute;
  z-index: 100;
  transform: translate(${designTokens.space[3]}, -${designTokens.space[3]});
  input {
    padding: ${designTokens.space[1]};
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
      <PickerContainer>
        <PickerInput onChange={() => handleChange(event.target.value)} type="text" value={pickerColor} />
        <PickerButtonContainer>
          <PickerButton color={pickerColor} onClick={() => handleDisplay()}/>
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