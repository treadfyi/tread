import App, { Container } from "next/app";
import Head from "next/head";
import fetch from "node-fetch";

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    let data,
      pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const res = await fetch(`${process.env.TREAD_APP_API}/dashboard`).then(
      res => res.json()
    );

    if (!res.error) {
      data = res.data;
    }

    return { pageProps, data };
  }

  render() {
    const { Component, data, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>App - Tread</title>
        </Head>

        <Component data={data} {...pageProps} />
      </Container>
    );
  }
}
