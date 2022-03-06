import React, { useState } from "react";
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import { Label } from '@components/Typography'

const TooltipWrapper = styled.div`
  display: inline-block;
  position: relative;
  --tooltip-text-color: var(--grey900);
  --tooltip-background-color: var(--grey0);
  --tooltip-margin: ${designTokens.space[4]};
  --tooltip-arrow-size: ${designTokens.space[1]};
`

const TooltipItem = styled.div`
  position: absolute;
  border-radius: var(--tooltip-arrow-size);
  left: 50%;
  transform: translateX(-50%);
  padding: ${designTokens.space[2]};
  background: var(--grey0);
  z-index: 100;
  white-space: nowrap;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.14), 0px 4px 8px -1px rgba(0,0,0,0.12), 0px 6px 12px -3px rgba(0,0,0,0.08);
  &::before {
    content: " ";
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: var(--tooltip-arrow-size);
    margin-left: calc(var(--tooltip-arrow-size) * -1);
  }
`


const Tooltip = (props) => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 300);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <TooltipWrapper
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}
      {active && (
        <TooltipItem>
          <Label>{props.content}</Label>
        </TooltipItem>
      )}
    </TooltipWrapper>
  );
};

export default Tooltip;
