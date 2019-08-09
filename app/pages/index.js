import Link from "next/link";
import UserAgent from "platform";
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

        <h1 style={{ marginBottom: "32px" }}>Tread Dashboard</h1>

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
            <div className="project-status">
              <h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-target"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
                {this.props.data.sessions[0].url}
              </h2>

              <p className="project-status-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6fcf97"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-radio"
                >
                  <circle cx="12" cy="12" r="2" />
                  <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
                </svg>
                Receiving data
              </p>

              <p className="project-status-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f2c94c"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-zap"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Realtime events
              </p>
            </div>

            <h3 className="section-header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-activity"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              Sessions{" "}
              <span className="event-count">
                {this.props.data.sessions.length}
              </span>
            </h3>

            <table className="event-report">
              <thead className="event-row-head">
                <tr>
                  <th>
                    <h4>Entry Page</h4>
                  </th>

                  <th>
                    <h4>User Agent</h4>
                  </th>

                  <th>
                    <h4>Time</h4>
                  </th>
                </tr>
              </thead>

              <tbody>
                {this.state.realtimeSessionsInsert.map(session => {
                  const sessionTimestampLocaleString = new Date(
                    parseInt(session.timestamp, 10)
                  ).toLocaleString("en-GB");

                  return (
                    <tr
                      className="event-row event-row-realtime"
                      key={session.id}
                    >
                      <td className="event-report-cell event-report-cell-highlight">
                        {session.path}
                      </td>

                      <td className="event-report-cell">
                        {UserAgent.parse(session.user_agent).description}
                      </td>

                      <td className="event-report-cell">
                        {sessionTimestampLocaleString}
                      </td>
                    </tr>
                  );
                })}

                {this.props.data.sessions.map(session => {
                  const sessionTimestampLocaleString = new Date(
                    parseInt(session.timestamp, 10)
                  ).toLocaleString("en-GB");

                  return (
                    <tr className="event-row" key={session.id}>
                      <td className="event-report-cell event-report-cell-highlight">
                        {session.path}
                      </td>

                      <td className="event-report-cell">
                        {UserAgent.parse(session.user_agent).description}
                      </td>

                      <td className="event-report-cell">
                        {sessionTimestampLocaleString}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}

        {this.props.data.events.length > 0 && (
          <section>
            <h3 className="section-header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-mouse-pointer"
              >
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                <path d="M13 13l6 6" />
              </svg>
              Events{" "}
              <span className="event-count">
                {this.props.data.events.length}
              </span>
            </h3>

            <table className="event-report">
              <thead className="event-row-head">
                <tr>
                  <th>
                    <h4>Page</h4>
                  </th>

                  <th>
                    <h4>Type</h4>
                  </th>

                  <th>
                    <h4>Element</h4>
                  </th>

                  <th>
                    <h4>Time</h4>
                  </th>
                </tr>
              </thead>

              <tbody>
                {this.state.realtimeEventsInsert.map(event => {
                  const eventTimestampLocaleString = new Date(
                    parseInt(event.timestamp, 10)
                  ).toLocaleString("en-GB");

                  return (
                    <tr className="event-row event-row-realtime" key={event.id}>
                      <td className="event-report-cell event-report-cell-highlight">
                        {event.path}
                      </td>

                      <td className="event-report-cell">{event.type}</td>

                      <td className="event-report-cell">
                        {event.target_node_name}#{event.target_id}.
                        {event.target_class_name}
                      </td>

                      <td className="event-report-cell">
                        {eventTimestampLocaleString}
                      </td>
                    </tr>
                  );
                })}

                {this.props.data.events.map(event => {
                  const eventTimestampLocaleString = new Date(
                    parseInt(event.timestamp, 10)
                  ).toLocaleString("en-GB");

                  return (
                    <tr className="event-row" key={event.id}>
                      <td className="event-report-cell event-report-cell-highlight">
                        {event.path}
                      </td>

                      <td className="event-report-cell">{event.type}</td>

                      <td className="event-report-cell">
                        {event.target_node_name}#{event.target_id}.
                        {event.target_class_name}
                      </td>

                      <td className="event-report-cell">
                        {eventTimestampLocaleString}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}
      </>
    );
  }
}

export default Home;
