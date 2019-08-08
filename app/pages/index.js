import Link from "next/link";
import React from "react";

class Home extends React.Component {
  state = {
    realtimeEventSource: null,
    realtimeEventsInsert: [],
    realtimeSessionsInsert: []
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
      this.setState(state => ({
        realtimeSessionsInsert: [
          JSON.parse(event.data),
          ...state.realtimeSessionsInsert
        ]
      }));
    });

    realtimeEventSource.addEventListener("events_insert", event => {
      this.setState(state => ({
        realtimeEventsInsert: [
          JSON.parse(event.data),
          ...state.realtimeEventsInsert
        ]
      }));
    });

    this.setState({ realtimeEventSource: realtimeEventSource });
  }

  componentWillUnmount() {
    const realtimeEventSource = this.state.realtimeEventSource;

    realtimeEventSource.close();
  }

  render() {
    return (
      <>
        <header>
          <div style={{ flex: 1 }}>
            <img
              alt="Tread logo"
              className="logo"
              src="/static/tread-logo.png"
            />

            <span className="version">alpha</span>
          </div>

          <Link href="/install">
            <a>Install</a>
          </Link>
        </header>

        <h2 style={{ marginBottom: "32px" }}>Tread Dashboard</h2>

        <p style={{ marginBottom: "32px" }}>
          Tread will automatically track sessions and events from any website
          you have installed the tracker on.
        </p>

        {this.props.data.sessions.length === 0 &&
          this.props.data.events.length === 0 && (
            <p>
              Get started by{" "}
              <Link href="/install">
                <a>installing Tread</a>
              </Link>{" "}
              on your website.
            </p>
          )}

        {this.props.data.sessions.length > 0 && (
          <section>
            <h3>
              Sessions{" "}
              <span className="event-count">
                {this.props.data.sessions.length}
              </span>
            </h3>

            <div className="event-report">
              <div className="event-row-head">
                <h4 style={{ flex: "none", width: "16px" }} />

                <h4>URL</h4>

                <h4>Entry Page</h4>

                <h4>User Agent</h4>

                <h4>Time</h4>
              </div>

              {this.state.realtimeSessionsInsert.map(session => {
                const sessionTimestampLocaleString = new Date(
                  parseInt(session.timestamp, 10)
                ).toLocaleString("en-GB");

                return (
                  <div className="event-row" key={session.id}>
                    <span style={{ flex: "none", width: "16px" }}>️️⚡️</span>

                    <span>{session.url}</span>

                    <span>{session.path}</span>

                    <span>{session.user_agent}</span>

                    <span>{sessionTimestampLocaleString}</span>
                  </div>
                );
              })}

              {this.props.data.sessions.map(session => {
                const sessionTimestampLocaleString = new Date(
                  parseInt(session.timestamp, 10)
                ).toLocaleString("en-GB");

                return (
                  <div className="event-row" key={session.id}>
                    <span style={{ flex: "none", width: "16px" }} />

                    <span>{session.url}</span>

                    <span>{session.path}</span>

                    <span>{session.user_agent}</span>

                    <span>{sessionTimestampLocaleString}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {this.props.data.events.length > 0 && (
          <section>
            <h3>
              Events{" "}
              <span className="event-count">
                {this.props.data.events.length}
              </span>
            </h3>

            <div className="event-report">
              <div className="event-row-head">
                <h4 style={{ flex: "none", width: "16px" }} />

                <h4>URL</h4>

                <h4>Page</h4>

                <h4>Type</h4>

                <h4>Element</h4>

                <h4>Time</h4>
              </div>

              {this.state.realtimeEventsInsert.map(event => {
                const eventTimestampLocaleString = new Date(
                  parseInt(event.timestamp, 10)
                ).toLocaleString("en-GB");

                return (
                  <div className="event-row" key={event.id}>
                    <span style={{ flex: "none", width: "16px" }}>️️⚡️</span>

                    <span>{event.url}</span>

                    <span>{event.path}</span>

                    <span>{event.type}</span>

                    <span>
                      {event.target_node_name}#{event.target_id}.
                      {event.target_class_name}
                    </span>

                    <span>{eventTimestampLocaleString}</span>
                  </div>
                );
              })}

              {this.props.data.events.map(event => {
                const eventTimestampLocaleString = new Date(
                  parseInt(event.timestamp, 10)
                ).toLocaleString("en-GB");

                return (
                  <div className="event-row" key={event.id}>
                    <span style={{ flex: "none", width: "16px" }} />

                    <span>{event.url}</span>

                    <span>{event.path}</span>

                    <span>{event.type}</span>

                    <span>
                      {event.target_node_name}#{event.target_id}.
                      {event.target_class_name}
                    </span>

                    <span>{eventTimestampLocaleString}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </>
    );
  }
}

export default Home;
