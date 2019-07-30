import App, { Container } from "next/app";
import Head from "next/head";

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>App - Tread</title>
        </Head>

        <Component {...pageProps} />
      </Container>
    );
  }
}
