import React, { useState } from 'react'
import { designTokens } from '@components/Theme/designTokens'
import styled from 'styled-components'
import { Button } from '@components/Button'

const Container = styled.div`
  height: ${props => props.open ? 'auto' : designTokens.space[6]};
  position: relative;
  margin-bottom: ${designTokens.space[3]};
  overflow: hidden;
  transition: all 120ms ease-out 0s;
  cursor: ${props => props.open ? 'initial' : 'pointer'};
  &:after {
    content: '';
    position: absolute;
    z-index: ${props => props.open ? '-1' : '1'};
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    user-select: none;
    background: ${props => props.open ? 'transparent' : 'linear-gradient(to top, var(--grey0), var(--transparent))'};
  }
`

const Collapse = ({children, label, openLabel}) => {

  const [open, setOpen] = useState(false)

  return(
    <>
      {
        !open ? (
          <>
            <Container role="button" onClick={() => setOpen(!open)}>
              {children}
            </Container>
            <div style={{ marginBottom: designTokens.space[3] }}>
              <Button small onClick={() => setOpen(!open)}>{label ? label : 'View More'}</Button>
            </div>
          </>
        )
        :
        (
          <Container open>
            {children}
            <div style={{ marginBottom: designTokens.space[3] }}>
              <Button small onClick={() => setOpen(!open)}>{openLabel ? openLabel : 'View Less'}</Button>
            </div>
          </Container>
        )
      }
    </>
  )
}

export default Collapse