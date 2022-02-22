import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Cookie&family=Monoton&family=Rancho&family=Roboto+Mono:wght@100&family=Roboto:wght@100;400&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/fav.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument