import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  render() {
    return (
      <Html className="document-root">
        <Head />
        <body>
          <Main/>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument