import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'
import { designTokens } from '../Theme/designTokens'
import { transparentize } from 'polished'

export const GlobalStyles = createGlobalStyle`
  ${normalize}
  :root {
    --grey900: ${({ theme }) => theme.grey900};
    --grey800: ${({ theme }) => theme.grey800};
    --grey700: ${({ theme }) => theme.grey700};
    --grey600: ${({ theme }) => theme.grey600};
    --grey500: ${({ theme }) => theme.grey500};
    --grey400: ${({ theme }) => theme.grey400};
    --grey300: ${({ theme }) => theme.grey300};
    --grey200: ${({ theme }) => theme.grey200};
    --grey100: ${({ theme }) => theme.grey100};
    --grey0: ${({ theme }) => theme.grey0};
    --transparent: ${({ theme}) => theme.transparent};
    --primary: ${({ theme }) => theme.primary};
    --primaryDark: ${({ theme }) => theme.primaryDark};
    --primaryTransparent: ${({ theme }) => theme.primaryTransparent};
    --secondary: ${({ theme }) => theme.secondary};
    --secondaryDark: ${({ theme }) => theme.secondaryDark};
    --secondaryTransparent: ${({ theme }) => theme.secondaryTransparent};
    --tertiary: ${({ theme }) => theme.tertiary};
    --tertiaryDark: ${({ theme }) => theme.tertiaryDark};
    --tertiaryTransparent: ${({ theme }) => theme.tertiaryTransparent};
    --debug-outline: transparent;
    &.debug-outline {
      --debug-outline: var(--secondary);
    }
  }
  html {
    box-sizing: border-box;
    font-size: 62.5%;
    scroll-behavior: smooth;
  }
  *,*:before,*:after {
    box-sizing: inherit;
  }
  html,body {
    width: 100%;
    height: 100%;
  }
  body {
    font-size: ${designTokens.fontSizesMobile[2]};
    background: var(--grey0);
    color: var(--grey900);
    font-family: ${designTokens.fonts.body};
    @media screen and (max-width: ${designTokens.breakpoints[2]}) {
      font-size: ${designTokens.fontSizes[1]};
    }
  }
  ::selection {
    background: var(--primaryTransparent);
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
    font-size: ${designTokens.fontSizesMobile[2]};
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
    .icon {
      opacity: 0.54;
      position: relative;
      margin-left: ${designTokens.space[2]};
      display: inline-block;
      transition: all 120ms ease-out 0s;
    }
    &:hover, &:focus {
      text-decoration: underline dotted;
      .icon {
        opacity: 1;
        transform: translateX(${designTokens.space[1]});
      }
    }
  }
  article {
    p, li {
      a {
        color: var(--primaryDark);
        box-shadow: 0px 1px 0px 0px currentColor;
        transition: all 120ms ease-out 0s;
        &:hover, &:focus {
          opacity: .8;
        }
      }
      a:visited {
        color: var(--secondaryDark);
      }
    }
  }

  hr {
    background: var(--grey200);
    border: 0;
    height: 1px
  }

  input, textarea, select {
    font-family: inherit;
    color: inherit;
    background: var(--grey100);
    display: block;
    width: 100%;
    border: 1px solid var(--grey400);
    border-radius: ${designTokens.space[1]};
    padding: ${designTokens.space[2]} ${designTokens.space[3]};
    margin: ${designTokens.space[2]} auto ${designTokens.space[3]};
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-shadow: none;
    transition: all 120ms ease-out 0s;
  }

  input, textarea {
    &:focus {
      background: transparent;
      border-color: var(--primary);
    }
  }

  textarea {
    height: ${designTokens.space[9]};
    resize: none;
  }

  select {
    cursor: pointer;
    background: linear-gradient(45deg,transparent 50%,var(--primary) 0),linear-gradient(135deg,var(--primary) 50%,transparent 0),linear-gradient(90deg,var(--grey0),var(--grey0));
    background-position: calc(100% - 18px) calc(1em + 0px),calc(100% - 12px) calc(1em + 0px),100% 0;
    background-size: 6px 6px,6px 6px,5em 5em;
    background-repeat: no-repeat;
    &:focus {
      border-color: var(--primary);
    }
  }

  ::placeholder {
    color: var(--grey500);
  }

  form {
    label {
      font-size: ${designTokens.fontSizes[1]};
      color: var(--grey700);
    }
  }
  
  strong {
    font-weight: ${designTokens.fontWeights.bold};
  }
  em {
    background: var(--primaryTransparent);
    font-style: normal;
    box-shadow: 0px 0px 0px 3px var(--primaryTransparent);
    transform: skew(10deg);
  }
  del {
    opacity: 0.6;
  }
  pre, code {
    font-family: ${designTokens.fonts.monospace};
    margin-top:${designTokens.space[4]} !important;
    margin-bottom:${designTokens.space[5]} !important;
  }
  code {
    color: var--grey500;
  }

  blockquote {
    margin-bottom: ${designTokens.space[5]};
    margin-top: ${designTokens.space[4]};
    padding: ${designTokens.space[4]} ${designTokens.space[2]} ${designTokens.space[1]} ${designTokens.space[4]};
    font-style: italic;
    margin-left: 0;
    margin-right: 0;
    position: relative;
    font-size: ${designTokens.fontSizes[2]};
    background: var(--primaryTransparent);
    p {
      font-size: ${designTokens.fontSizes[2]};
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${designTokens.space[1]};
      background: var(--primary);
    }
  }
  ul {
    list-style: circle inside;
  }
  ol {
    list-style-position: inside;
  }
  ul, ol {
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
      box-shadow: 0px 0px 0px ${designTokens.space[1]} var(--grey100);
      transition: all 120ms ease-out 0s;
    }
  }
  hr {
    margin-top: ${designTokens.space[7]};
    margin-bottom: ${designTokens.space[7]};
    border-color: var(--grey200);
    @media screen and (max-width:${designTokens.breakpoints[2]}) {
      margin-top: ${designTokens.space[5]};
    margin-bottom: ${designTokens.space[5]};
    }
  }
  article img {
    width: 100%;
  }

  * {
    outline: 1px dotted var(--debug-outline);
  }
`;