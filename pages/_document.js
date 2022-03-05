import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;800&display=swap" rel="stylesheet"></link>
          <link href="/static/fonts/fonts.css" rel="stylesheet"/>
        </Head>
        <body>
          <Main/>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument