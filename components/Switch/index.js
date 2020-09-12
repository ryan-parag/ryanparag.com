import React from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`

const SwitchLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: ${designTokens.space[6]};
  height: ${designTokens.space[4]};
  background: grey;
  border-radius: 999px;
  position: relative;
  transition: background-color .2s;
`

const SwitchHandle = styled.span`
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(${designTokens.space[4]} - 4px);
  height: calc(${designTokens.space[4]} - 4px);
  border-radius: 50%;
  transition: 0.2s;
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
`

const Switch = ({ isOn, handleToggle }) => {
  return (
    <>
      <SwitchInput
        checked={isOn}
        onChange={handleToggle}
        id={`switch`}
        type="checkbox"
      />
      <SwitchLabel
        style={{ background: isOn && '#06D6A0' }}
        htmlFor={`switch`}
      >
        <SwitchHandle
          style={{
            left: isOn && 'calc(100% - 2px)',
            transform: isOn && 'translateX(-100%)'
          }}
        />
      </SwitchLabel>
    </>
  )
}

export default Switch;