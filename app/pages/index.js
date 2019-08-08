import React from "react";

class Home extends React.Component {
  state = {
    realtimeEventSource: null
  };

  componentDidMount() {
    if (typeof this.props.data === "undefined") {
      window.location = `https://github.com/login/oauth/authorize?client_id=${
        process.env.GITHUB_CLIENT_ID
      }`;
    }

    const realtimeEventSource = new EventSource(
      `${process.env.TREAD_APP_API}/realtime`
    );

    realtimeEventSource.addEventListener("sessions_insert", event => {
      // TODO: setState?
      console.log(JSON.parse(event.data));
    });

    realtimeEventSource.addEventListener("events_insert", event => {
      // TODO: setState?
      console.log(JSON.parse(event.data));
    });

    this.setState({ realtimeEventSource: realtimeEventSource });
  }

  componentWillUnmount() {
    const realtimeEventSource = this.state.realtimeEventSource;

    realtimeEventSource.close();
  }

  render() {
    console.log(this.props);

    return <h1>Tread App</h1>;
  }
}

export default Home;
