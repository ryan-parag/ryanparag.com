import React from 'react'
import styled, { css } from 'styled-components'
import { designTokens } from '@components/Theme/designTokens' 

export const PrismStyles = css`
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: var(--grey600);
  }

  .token.punctuation {
    color: var(--grey600);
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: var(--secondaryDark);
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: var(--tertiaryDark);
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: var(--primaryDark);
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: var(--secondaryDark);
  }

  .token.function,
  .token.class-name {
    color: var(--tertiaryDark);
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: var(--primaryDark);
  }

  code[class*="language-"],
  pre[class*="language-"] {
    color: var(--grey900);
    background: var(--grey100);
    border-radius: ${designTokens.space[2]};
    padding: ${designTokens.space[3]};
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    font-size: ${designTokens.sizing._sm};

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
  code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
    text-shadow: none;
    background: #b3d4fc;
  }

  pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
  code[class*="language-"]::selection, code[class*="language-"] ::selection {
    text-shadow: none;
    background: #b3d4fc;
  }

  @media print {
    code[class*="language-"],
    pre[class*="language-"] {
      text-shadow: none;
    }
  }

  /* Code blocks */
  pre[class*="language-"] {
    overflow: auto;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
  }

  /* Inline code */
  :not(pre) > code[class*="language-"] {
    padding: .1em;
    white-space: normal;
  }

  .namespace {
    opacity: .7;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }
`

const Container = styled.div`
  ${PrismStyles}
`

const CodeBlock = ({children}) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default CodeBlock