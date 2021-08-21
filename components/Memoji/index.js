import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const ProfileImg = styled.button`
  appearance: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  width: ${designTokens.space[9]};
  height: ${designTokens.space[9]};
  border-radius: 50%;
  background: var(--primaryTransparent);
  position: relative;
  transition: all 120ms ease-out 0s;
  img {
    display: block; width: 100%;
    transition: all 120ms ease-out 0s;
  }
  &:before, &:after {
    content: '';
    position: absolute;
    top: -${designTokens.space[4]};
    right: -${designTokens.space[4]};
    width: ${designTokens.space[4]};
    height: ${designTokens.space[4]};
    display: block;
    background: var(--secondaryTransparent);
    border-radius: 50%;
    transition: all 120ms ease-out 0s;
  }
  &:after {
    top: ${designTokens.space[2]};
    right: -${designTokens.space[7]};
    width: ${designTokens.space[3]};
    height: ${designTokens.space[3]};
    background: var(--tertiaryTransparent);
  }
  &:hover {
    img {
      transform: scale(.98);
    }
    &:before {
      right: -${designTokens.space[3]};
      transform: scale(1.2);
    }
    &:after {
      right: -${designTokens.space[6]};
      top: ${designTokens.space[4]};
      transform: scale(1.2);
    }
  }
  &:hover, &:focus {
    box-shadow: 0px 0px 0px ${designTokens.space[2]} var(--primaryTransparent);
    &:before {
      background: var(--secondary);
    }
    &:after {
      background: var(--tertiary);
    }
  }
`


const Memoji = () => {

  const memojis = [
    'memoji-thanks.png',
    'memoji-nervous.png',
    'memoji-peace.png',
    'memoji-shocked.png',
    'memoji-sleep.png',
    'memoji-stars.png',
    'memoji-surprise.png',
    'memoji-thinking.png',
    'memoji-eyeroll.png'
  ]

  const memojiRandom = () => {
    let random = memojis[Math.floor(Math.random() * memojis.length)]
    return random
  }

  const [isRandom, setIsRandom] = useState('memoji-thanks.png')

  useEffect(() => {
    setIsRandom(memojiRandom())
  }, [])

  return(
    <ProfileImg onClick={() => setIsRandom(memojiRandom())}>
      <img src={`/static/about/${isRandom}`}/>
    </ProfileImg>
  )
}

export default Memoji