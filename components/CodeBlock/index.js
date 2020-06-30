import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { duotoneSea } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default ({language, value}) => {
  return (
    <SyntaxHighlighter language={language} style={duotoneSea}>
      {value}
    </SyntaxHighlighter>
  )
}