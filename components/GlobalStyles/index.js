import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'
import { designTokens } from '../Theme/designTokens'
import { PrismStyles } from '@components/CodeBlock'

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
    --debug: 0.4px;
  }
  html {
    box-sizing: border-box;
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
    font-size: ${designTokens.sizing._base};
    background-color: var(--grey0);
    color: var(--grey900);
    font-family: ${designTokens.fonts.monospace};
    overscroll-behavior-x: none;
    @media screen and (max-width: ${designTokens.breakpoints[2]}) {
      font-size: ${designTokens.sizing._sm};
    }
  }
  ::selection {
    background: var(--primaryTransparent);
  }
  code {
    font-family: ${designTokens.fonts.monospace};
  }
  button, select, input, textarea {
    color: inherit;
    font-family: inherit;
    touch-action: manipulation;
    &:active, &:focus {
      outline: 0;
      -webkit-tap-highlight-color: transparent;
    }
  }
  h1,h2,h3 {
    letter-spacing: -.06rem;
    font-weight: 900;
  }

  h4,h5,h6 {
    font-weight: 700;
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
    font-family: ${designTokens.fonts.body};
    font-weight: 900;
  }
  h1 {
    font-size: ${designTokens.sizing._5xl};
    line-height: ${designTokens.lineHeights.bigHeading};
    font-weight: ${designTokens.fontWeights.heading};
    @media screen and (max-width: ${designTokens.breakpoints[4]}) {
      font-size: ${designTokens.sizing._3xl};
    }
  }
  h2 {
    font-size: ${designTokens.sizing._4xl};
    line-height: ${designTokens.lineHeights.bigHeading};
    font-weight: ${designTokens.fontWeights.heading};
    @media screen and (max-width: ${designTokens.breakpoints[4]}) {
      font-size: ${designTokens.sizing._2xl};
    }
  }
  h3 {
    font-size: ${designTokens.sizing._3xl};
    line-height: ${designTokens.lineHeights.bigHeading};
    font-weight: ${designTokens.fontWeights.heading};
    @media screen and (max-width: ${designTokens.breakpoints[4]}) {
      font-size: ${designTokens.sizing._xl};
    }
  }
  h4 {
    font-size: ${designTokens.sizing._2xl};
    line-height: ${designTokens.lineHeights.bigHeading};
    font-weight: ${designTokens.fontWeights.subheading};
    @media screen and (max-width: ${designTokens.breakpoints[4]}) {
      font-size: ${designTokens.sizing._lg};
    }
  }
  h5 {
    font-size: ${designTokens.sizing._xl};
    line-height: ${designTokens.lineHeights.bigHeading};
    font-weight: ${designTokens.fontWeights.subheading};
    @media screen and (max-width: ${designTokens.breakpoints[4]}) {
      font-size: ${designTokens.sizing._base};
    }
  }
  h6 {
    font-size: ${designTokens.sizing._lg};
    line-height: ${designTokens.lineHeights.bigHeading};
    font-weight: ${designTokens.fontWeights.subheading};
    @media screen and (max-width: ${designTokens.breakpoints[4]}) {
      font-size: ${designTokens.sizing._sm};
    }
  }
  p {
    font-size: ${designTokens.sizing._sm};
    line-height: 180%;
    margin-top: 0;
    letter-spacing: -.03rem;
    margin-bottom: ${designTokens.space[5]};
    @media screen and (min-width: ${designTokens.breakpoints[2]}) {
      font-size: ${designTokens.sizing._base};
    }
    @media screen and (min-width: ${designTokens.breakpoints[1]}) {
      font-size: ${designTokens.sizing._lg};
    }
  }
  p + p {
    margin-top: 0;
  }
  
  .text--xs {
    font-size: ${designTokens.sizing._xs};
  }

  .text--sm {
    font-size: ${designTokens.sizing._sm};
  }

  .text--base {
    font-size: ${designTokens.sizing._base};
  }

  .text--lg {
    font-size: ${designTokens.sizing._lg};
  }

  .lead {
    font-size: ${designTokens.sizing._base};
    line-height: 160%;
    letter-spacing: -.06rem;
    @media screen and (min-width: ${designTokens.breakpoints[2]}) {
      font-size: ${designTokens.sizing._xl};
    }
    @media screen and (min-width: ${designTokens.breakpoints[1]}) {
      font-size: ${designTokens.sizing._2xl};
    }
  }

  .link {
    text-decoration: none;
    overflow-wrap: break-word;
    border-radius: ${designTokens.space[1]};
    padding-left: ${designTokens.space[1]};
    padding-right: ${designTokens.space[1]};
    padding-top: ${designTokens.space[1]};
    padding-bottom: ${designTokens.space[1]};
    line-height: 1;
    border: 0;
    cursor: pointer;
    background: var(--grey200);
    transition: all 120ms ease-out 0s;
    &:hover,&:focus {
      background: var(--primaryTransparent);
      box-shadow: 0px 0px 0px 2px var(--primaryTransparent);
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
      .icon {
        opacity: 1;
        transform: translateX(${designTokens.space[1]});
      }
    }
  }
  article {
    p, li {
      a {
        text-decoration: none;
        overflow-wrap: break-word;
        border-radius: ${designTokens.space[1]};
        padding-left: ${designTokens.space[1]};
        padding-right: ${designTokens.space[1]};
        padding-top: ${designTokens.space[1]};
        padding-bottom: ${designTokens.space[1]};
        background: var(--grey200);
        transition: all 120ms ease-out 0s;
        &:hover,&:focus {
          background: var(--primaryTransparent);
          box-shadow: 0px 0px 0px 2px var(--primaryTransparent);
        }
      }
    }
    .anchor {
      padding: 0;
      height: 0;
      width: 0;
    }
    .icon-link {
      display: none;
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
    padding: ${designTokens.space[3]} ${designTokens.space[3]};
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

  progress {
    border-radius: ${designTokens.space[2]};
    width: 100%;
    height: ${designTokens.space[2]};
    box-shadow: none;
  }

  progress::-webkit-progress-bar {
    background-color: var(--grey200);
    border-radius: ${designTokens.space[2]};
  }

  progress::-webkit-progress-value {
    background-color: var(--primary);
    border-radius: ${designTokens.space[2]};
    box-shadow: none;
  }

  progress::-moz-progress-bar {
    /* style rules */
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
      font-size: ${designTokens.sizing._sm};
      color: var(--grey700);
    }
  }
  
  strong {
    font-weight: ${designTokens.fontWeights.bold};
  }
  em {
    font-style: italic;
  }
  del {
    opacity: 0.6;
  }

  blockquote {
    margin-bottom: ${designTokens.space[5]};
    margin-top: ${designTokens.space[4]};
    padding: ${designTokens.space[4]} ${designTokens.space[2]} ${designTokens.space[1]} ${designTokens.space[4]};
    font-style: italic;
    margin-left: 0;
    margin-right: 0;
    position: relative;
    font-size: ${designTokens.sizing._lg};
    color: var(--primaryDark);
    p {
      font-size: ${designTokens.sizing._lg};
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${designTokens.space[1]};
      background: var(--primaryTransparent);
    }
  }
  ul {
    list-style: circle inside;
    margin-bottom: ${designTokens.space[5]};
  }
  ol {
    list-style-position: inside;
  }
  ul, ol {
    padding-left: 0;
    li {
      margin-bottom: ${designTokens.space[3]};
      line-height: 130%;
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

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  @keyframes gradients {
    0%   {background-position: 0 0;}
    25% {background-position: 50% 0;}
    50% {background-position: 90% 0;}
    60% {background-position: 60%;}
    75% {background-position: 40%;}
    100%  {background-position: 0 0;}
}

  @keyframes shadowBreathing {
    0% {
      box-shadow: -16px 0px 32px 8px var(--tertiaryTransparent), 16px -16px 32px 8px var(--primaryTransparent), 8px 16px 32px 8px var(--secondaryTransparent);
      transform: rotate(0deg);
    }
    50% {
      box-shadow: 0px 0px 2px 0px var(--tertiaryTransparent), 0px 0px 2px 0px var(--primaryTransparent), 0px 0px 2px 0px var(--secondaryTransparent);
    }
    100% {
      box-shadow: -16px 0px 32px 8px var(--tertiaryTransparent), 16px -16px 32px 8px var(--primaryTransparent), 8px 16px 32px 8px var(--secondaryTransparent);
      transform: rotate(359deg);
    }
  }

  //syntax highlighting
  ${PrismStyles}
`;