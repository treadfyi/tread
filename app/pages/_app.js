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

    const host = ctx.req ? ctx.req.headers.host : location.host;

    const protocol = host.indexOf("localhost") !== -1 ? "http:" : "https:";

    const res = await fetch(`${protocol}//${host}/api/dashboard`, {
      headers: {
        Cookie: ctx.req ? ctx.req.headers.cookie : document.cookie
      }
    }).then(res => res.json());

    if (!res.error) {
      data = res.data;
    }

    return {
      pageProps,
      data,
      githubClientID: res.githubClientID,
      realtimeEventSourceURL: res.realtimeEventSourceURL
    };
  }

  render() {
    const {
      Component,
      data,
      githubClientID,
      pageProps,
      realtimeEventSourceURL
    } = this.props;

    return (
      <Container>
        <Head>
          <title>App - Tread</title>
        </Head>

        <Component
          data={data}
          githubClientID={githubClientID}
          realtimeEventSourceURL={realtimeEventSourceURL}
          {...pageProps}
        />
      </Container>
    );
  }
}
