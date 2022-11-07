import NextDocument, { Head, Html, Main, NextScript } from "next/document"
import CssBaseline from "@mui/material/CssBaseline"

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <CssBaseline />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
