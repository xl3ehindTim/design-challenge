import NextDocument, { Head, Html, Main, NextScript } from "next/document"
import favicon from "/favicon.ico"

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <script src="https://kit.fontawesome.com/90536e5a78.js" crossOrigin="anonymous"></script>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico"></link>
          
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
