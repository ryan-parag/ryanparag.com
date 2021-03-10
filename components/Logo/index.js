import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const LogoLabelContainer = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${designTokens.space[2]} ${designTokens.space[2]} ${designTokens.space[2]} 0;
  transition: all 120ms ease-out 0s;
  &:hover, &:focus {
    background: var(--grey100);
    padding-left: ${designTokens.space[3]};
    box-shadow: inset ${designTokens.space[1]} 0px 0px var(--primary);
  }
`

const LogoLabel = styled.strong`
  font-size: ${designTokens.fontSizes[2]};
  display:block;
`

const LogoSubtitle = styled.span`
  font-size: ${designTokens.fontSizes[0]};
  margin-top: ${designTokens.space[1]};
  display: block;
`

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: rotate(-6deg);
  .shadow {
    position: relative;
    transform: translateY(10px);
  }
`

export const NotesLogo = () => {
  return(
    <svg viewBox="0 0 55 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_i)">
        <path fillRule="evenodd" clipRule="evenodd" d="M10.105.333A3 3 0 006.79 2.982L2.039 45.584.797 50.09a3 3 0 002.095 3.69l.602.165a3 3 0 00.298.082l33.288 9.175a3 3 0 003.69-2.095l1.11-4.03a2.987 2.987 0 00.788-1.715l.215-1.924 10.662-38.684a3 3 0 00-2.095-3.69l-3.727-1.027.275-2.46a3 3 0 00-2.65-3.315L10.106.333z" fill="var(--grey0)"/>
      </g>
      <rect x="7.123" width="41.463" height="54.082" rx="3" transform="rotate(6.364 7.123 0)" fill="var(--grey200)" stroke="var(--grey300)" strokeWidth="1px"/>
      <g filter="url(#filter1_i)">
        <rect x="14.37" y=".845" width="41.463" height="54.082" rx="3" transform="rotate(15.409 14.37 .845)" fill="var(--primary)"/>
      </g>
      <g filter="url(#filter2_i)">
        <rect x="14.37" y=".845" width="41.463" height="54.082" rx="3" transform="rotate(15.409 14.37 .845)" fill="url(#paint0_linear)"/>
      </g>
      <rect x="9.224" y="33.086" width="34.252" height="5.408" rx="2.704" transform="rotate(15.409 9.224 33.086)" fill="var(--grey0)"/>
      <rect x="6.829" y="41.776" width="21.633" height="5.408" rx="2.704" transform="rotate(15.409 6.829 41.776)" fill="var(--grey0)"/>
      <path d="M30.7276 11.5769C31.2243 10.7166 30.2383 9.76537 29.3964 10.2926L17.5354 17.7201C16.9263 18.1015 16.9424 18.994 17.5647 19.3533L20.7767 21.2077C21.2325 21.4709 21.3887 22.0538 21.1255 22.5097L16.9066 29.8171C16.4099 30.6773 17.3959 31.6286 18.2378 31.1014L30.0988 23.6738C30.7078 23.2925 30.6918 22.3999 30.0695 22.0407L26.8575 20.1862C26.4017 19.923 26.2455 19.3401 26.5087 18.8843L30.7276 11.5769Z" fill="var(--grey0)"/>
      <defs>
        <filter id="filter0_i" x=".689" y=".314" width="52.965" height="62.998" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"/><feBlend in2="shape" result="effect1_innerShadow"/></filter><filter id="filter1_i" x="0" y=".845" width="54.342" height="63.154" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"/><feBlend in2="shape" result="effect1_innerShadow"/></filter><filter id="filter2_i" x="0" y=".845" width="54.342" height="63.154" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"/><feBlend in2="shape" result="effect1_innerShadow"/></filter><linearGradient id="paint0_linear" x1="13.884" y1=".845" x2="32.519" y2="62.028" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" stopOpacity=".26"/><stop offset=".471" stopColor="#fff" stopOpacity=".078"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient>
      </defs>
    </svg>
  )
}

export default function Logo() {
  return(
    <LogoIcon>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256">
        <g clipPath="url(#clip0)">
          <path fill="var(--primary)" d="M128 256c56.089 0 87.269 0 107.635-20.365C256 215.269 256 184.089 256 128c0-56.089 0-87.27-20.365-107.635C215.269 0 184.089 0 128 0 71.911 0 40.73 0 20.365 20.365 0 40.731 0 71.911 0 128c0 56.089 0 87.269 20.365 107.635C40.731 256 71.911 256 128 256z"/>
          <path className="shadow" fill="rgba(0,0,0,0.2)" d="M156.764 57.347c1.714-6.396-6.277-10.82-10.788-5.973L82.412 119.67c-3.263 3.506-1.62 9.226 3.007 10.466l23.883 6.399a6.354 6.354 0 014.493 7.782l-14.559 54.336c-1.714 6.396 6.277 10.821 10.789 5.973l63.563-68.295c3.264-3.507 1.62-9.227-3.007-10.467l-23.883-6.399a6.354 6.354 0 01-4.493-7.782l14.559-54.336z"/>
          <path fill="var(--grey0)" d="M156.764 57.347c1.714-6.396-6.277-10.82-10.788-5.973L82.412 119.67c-3.263 3.506-1.62 9.226 3.007 10.466l23.883 6.399a6.354 6.354 0 014.493 7.782l-14.559 54.336c-1.714 6.396 6.277 10.821 10.789 5.973l63.563-68.295c3.264-3.507 1.62-9.227-3.007-10.467l-23.883-6.399a6.354 6.354 0 01-4.493-7.782l14.559-54.336z"/>
          <g filter="url(#filter1_f)" style={{ mixBlendMode: 'soft-light' }}>
            <path fill="url(#paint0_linear)" fillRule="evenodd" d="M20.365 20.365C0 40.731 0 71.911 0 128c0 56.089 0 87.269 20.365 107.635C40.731 256 71.911 256 128 256c56.089 0 87.269 0 107.635-20.365C256 215.269 256 184.089 256 128c0-56.089 0-87.27-20.365-107.635C215.269 0 184.089 0 128 0 71.911 0 40.73 0 20.365 20.365zm174.413 230.121c16.985-2.492 29.171-7.408 38.735-16.973 9.565-9.564 14.481-21.75 16.973-38.735C252.993 177.693 253 156.13 253 128c0-28.13-.007-49.693-2.514-66.778-2.492-16.985-7.408-29.17-16.973-38.735-9.564-9.565-21.75-14.481-38.735-16.973C177.693 3.007 156.13 3 128 3c-28.13 0-49.693.007-66.778 2.514-16.985 2.492-29.17 7.408-38.735 16.973-9.565 9.564-14.481 21.75-16.973 38.735C3.007 78.307 3 99.87 3 128c0 28.13.007 49.693 2.514 66.778 2.492 16.985 7.408 29.171 16.973 38.735 9.564 9.565 21.75 14.481 38.735 16.973C78.307 252.993 99.87 253 128 253c28.13 0 49.693-.007 66.778-2.514z" clipRule="evenodd"/>
          </g>
          <g filter="url(#filter2_f)" style={{ mixBlendMode: 'soft-light' }}>
            <path fill="url(#paint1_linear)" fillRule="evenodd" d="M20.365 20.365C0 40.731 0 71.911 0 128c0 56.089 0 87.269 20.365 107.635C40.731 256 71.911 256 128 256c56.089 0 87.269 0 107.635-20.365C256 215.269 256 184.089 256 128c0-56.089 0-87.27-20.365-107.635C215.269 0 184.089 0 128 0 71.911 0 40.73 0 20.365 20.365zm174.268 229.132c16.862-2.474 28.814-7.332 38.173-16.691 9.359-9.359 14.217-21.311 16.691-38.173C251.99 177.637 252 156.158 252 128c0-28.158-.01-49.636-2.503-66.633-2.474-16.862-7.332-28.814-16.691-38.173-9.359-9.36-21.311-14.217-38.173-16.69C177.637 4.01 156.158 4 128 4c-28.158 0-49.636.01-66.633 2.503-16.862 2.474-28.814 7.332-38.173 16.69-9.36 9.36-14.217 21.312-16.69 38.174C4.01 78.364 4 99.842 4 128c0 28.158.01 49.637 2.503 66.633 2.474 16.862 7.332 28.814 16.69 38.173 9.36 9.359 21.312 14.217 38.174 16.691C78.364 251.99 99.842 252 128 252c28.158 0 49.637-.01 66.633-2.503z" clipRule="evenodd"/>
          </g>
        </g>
        <defs>
          <clipPath id="clip0">
            <path fill="#fff" d="M0 0h256v256H0z"/>
          </clipPath>
          <clipPath id="clip1">
            <path fill="#fff" d="M0 0h160v160H0z" transform="translate(48 48)"/>
          </clipPath>
        </defs>
      </svg>
    </LogoIcon>
  )
}

export const LogoWithLabel = ({logo}) => {
  return(
    <Link href="/">
      <a>
        <LogoLabelContainer>
          {
            logo ? (
              <div style={{
                width: `calc(${designTokens.space[5]} + ${designTokens.space[2]})`,
                marginRight: designTokens.space[3]
              }}>
                <Logo/>
              </div>
            )
            :
            null
          }
          <div>
            <LogoLabel>Ryan Parag</LogoLabel>
            <LogoSubtitle>Product Designer</LogoSubtitle>
          </div>
        </LogoLabelContainer>
      </a>
    </Link>
  )
}