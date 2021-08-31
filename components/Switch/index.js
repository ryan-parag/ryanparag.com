import React from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const SwitchContainer = styled.div`
  display:inline-flex;
  align-items:center;
`

const ToggleLabel = styled.span`
  font-size: ${designTokens.sizing._sm};
  display: inline-block;
  margin: 0 ${designTokens.space[2]};
`

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
  width: calc(${designTokens.space[5]} + ${designTokens.space[2]});
  height: ${designTokens.space[4]};
  background: var(--grey400);
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
  background: var(--grey0);
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
`

const Switch = ({ isOn, handleToggle, startLabel=null, endLabel=null }) => {
  return (
    <SwitchContainer>
      {
        startLabel ? 
        (
          <ToggleLabel>
            {startLabel}
          </ToggleLabel>
        )
        :
        null
      }
      <SwitchInput
        checked={isOn}
        onChange={handleToggle}
        id={`switch`}
        type="checkbox"
      />
      <SwitchLabel
        style={{ background: isOn && 'var(--primary)' }}
        htmlFor={`switch`}
      >
        <SwitchHandle
          style={{
            left: isOn && 'calc(100% - 2px)',
            transform: isOn && 'translateX(-100%)'
          }}
        />
      </SwitchLabel>
      {
        endLabel ? 
        (
          <ToggleLabel>
            {endLabel}
          </ToggleLabel>
        )
        :
        null
      }
    </SwitchContainer>
  )
}

export default Switch;