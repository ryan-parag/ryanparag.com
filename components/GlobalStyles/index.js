import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'
import { designTokens } from '../Theme/designTokens'

export const GlobalStyles = createGlobalStyle`
  ${normalize}
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }
  *,*:before,*:after {
    box-sizing: inherit;
  }
  html,body {
    width: 100%;
    height: 100%;
  }
  body {
    font-size: ${designTokens.fontSizesMobile[1]};
    background: ${({ theme }) => theme.grey0};
    color: ${({ theme }) => theme.grey900};
    font-family: ${designTokens.fonts.body};
    @media screen and (min-width: ${designTokens.breakpoints[2]}) {
      font-size: ${designTokens.fontSizes[1]};
    }
  }
  ::selection {
    background: ${({ theme }) => theme.greenTransparent}
  }
  code {
    font-family: ${designTokens.fonts.code};
  }
  button, select, input, textarea {
    color: inherit;
    font-family: inherit;
    &:active, &:focus {
      outline: 0;
      -webkit-tap-highlight-color: transparent;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: ${designTokens.space[4]};
    margin-top: ${designTokens.space[4]};
    word-wrap: break-word;
    letter-spacing: -.06rem;
  }
  h1 {
    font-size: ${designTokens.fontSizes[5]};
    line-height: ${designTokens.lineHeights.bigHeading};
    font-weight: ${designTokens.fontWeights.heading};
    @media screen and (max-width: ${designTokens.breakpoints[4]}) {
      font-size: ${designTokens.fontSizesMobile[6]};
    }
  }
  h2 {
    font-size: ${designTokens.fontSizes[4]};
    line-height: ${designTokens.lineHeights.bigHeading};
    font-weight: ${designTokens.fontWeights.heading};
    @media screen and (max-width: ${designTokens.breakpoints[4]}) {
      font-size: ${designTokens.fontSizesMobile[5]};
    }
  }
  h3 {
    font-size: ${designTokens.fontSizes[3]};
    line-height: ${designTokens.lineHeights.bigHeading};
    font-weight: ${designTokens.fontWeights.heading};
    @media screen and (max-width: ${designTokens.breakpoints[4]}) {
      font-size: ${designTokens.fontSizesMobile[4]};
    }
  }
  h4 {
    font-size: ${designTokens.fontSizes[2]};
    line-height: ${designTokens.lineHeights.bigHeading};
    font-weight: ${designTokens.fontWeights.subheading};
    @media screen and (max-width: ${designTokens.breakpoints[4]}) {
      font-size: ${designTokens.fontSizesMobile[3]};
    }
  }
  h5 {
    font-size: ${designTokens.fontSizes[1]};
    line-height: ${designTokens.lineHeights.bigHeading};
    font-weight: ${designTokens.fontWeights.subheading};
    @media screen and (max-width: ${designTokens.breakpoints[4]}) {
      font-size: ${designTokens.fontSizesMobile[2]};
    }
  }
  h6 {
    font-size: ${designTokens.fontSizes[0]};
    line-height: ${designTokens.lineHeights.bigHeading};
    font-weight: ${designTokens.fontWeights.subheading};
    @media screen and (max-width: ${designTokens.breakpoints[4]}) {
      font-size: ${designTokens.fontSizesMobile[1]};
    }
  }
  p {
    font-size: ${designTokens.fontSizesMobile[1]};
    line-height: ${designTokens.lineHeights.body};
    margin-top: 0;
    margin-bottom: ${designTokens.space[4]};
    @media screen and (min-width: ${designTokens.breakpoints[2]}) {
      font-size: ${designTokens.fontSizes[2]};
    }
  }
  .lead {
    font-size: 1.8rem;
    @media screen and (min-width: ${designTokens.breakpoints[2]}) {
      font-size: ${designTokens.fontSizes[3]};
    }
  }
  a {
    text-decoration: none;
    color: inherit;
    &:focus {
      outline: none;
    }
  }
  p {
    a:visited {
      color: ${({ theme}) => theme.visited};
    }
  }
  
  strong {
    font-weight: ${designTokens.fontWeights.bold};
  }
  pre, code {
    font-weight: ${designTokens.fonts.monospace};
  }
  code {
    color: ${({ theme }) => theme.grey500};
  }

  blockquote {
    margin-bottom: ${designTokens.space[5]};
    margin-top: ${designTokens.space[4]};
    padding: ${designTokens.space[4]} 0 ${designTokens.space[1]} ${designTokens.space[4]};
    font-style: italic;
    margin-left: 0;
    position: relative;
    font-size: ${designTokens.fontSizes[3]};
    background: ${({ theme }) => theme.greenTransparent};
    p {
      font-size: ${designTokens.fontSizes[3]};
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${designTokens.space[1]};
      background: ${({ theme }) => theme.green};
    }
  }
  
  ul {
    list-style: circle inside;
    padding-left: 0;
    li {
      line-height: ${designTokens.lineHeights.body};
      margin-bottom: ${designTokens.space[2]};
    }
  }
  details summary {
    &:focus, &:active {
      outline: none;
      opacity: .75;
      box-shadow: 0px 0px 0px ${designTokens.space[1]} ${({ theme }) => theme.grey100};
      transition: all 120ms ease-out 0s;
    }
  }
  hr {
    margin-top: ${designTokens.space[7]};
    margin-bottom: ${designTokens.space[7]};
    border-color: ${({ theme }) => theme.grey200};
    @media screen and (max-width:${designTokens.breakpoints[2]}) {
      margin-top: ${designTokens.space[5]};
    margin-bottom: ${designTokens.space[5]};
    }
  }
`;