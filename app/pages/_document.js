import Document, { Html, Head, Main, NextScript } from "next/document";

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <meta name="description" content="Tread App" />
          <meta name="robots" content="noindex" />
          <meta property="og:url" content="https://app.tread.fyi/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="App - Tread" />
          <meta property="og:description" content="Reach for the stats!" />
          <meta
            property="og:image"
            content="https://app.tread.fyi/static/og-image.png"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Overpass+Mono&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/static/style.css" />
        </Head>
        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}
