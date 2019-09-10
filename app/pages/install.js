import Link from "next/link";
import React from "react";

class Install extends React.Component {
  componentDidMount() {
    if (typeof this.props.data === "undefined") {
      window.location = `https://github.com/login/oauth/authorize?client_id=${this.props.githubClientID}`;
    }
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

          <Link href="/">
            <a>Dashboard</a>
          </Link>
        </header>

        <h2 style={{ marginBottom: "32px" }}>Install Tread</h2>

        <p style={{ marginBottom: "32px" }}>
          Simply add this script before the closing <code>{`</body>`}</code> tag
          to start tracking sessions and events on any website:
        </p>

        <div
          style={{
            backgroundColor: "#002240",
            borderRadius: "4px",
            color: "white",
            padding: "16px"
          }}
        >
          <span>
            <span style={{ color: "#B3B7BC" }}>&lt;</span>
            <span style={{ color: "#9EFFFF" }}>script </span>
            <span style={{ color: "#FF80E1" }}>type</span>&#61;
            <span style={{ color: "#32C008" }}>"module"</span>
            <span style={{ color: "#B3B7BC" }}>&gt;</span>
          </span>

          <br />

          <span style={{ paddingLeft: "16px" }}>
            <span style={{ color: "#EBDE7B" }}>import </span>track
            <span style={{ color: "#EBDE7B" }}> from </span>
            <span style={{ color: "#32C008" }}>
              "https://unpkg.com/@tread/track"
            </span>
            ;
          </span>

          <br />
          <br />

          <span
            style={{
              paddingLeft: "16px"
            }}
          >
            <span style={{ color: "#9EFFFF" }}>track</span>(
            <span style={{ color: "#32C008" }}>
              "{this.props.data.account.client_id}"
            </span>
            );
          </span>

          <br />

          <span style={{ display: "block" }}>
            <span style={{ color: "#B3B7BC" }}>&lt;&#47;</span>
            <span style={{ color: "#9EFFFF" }}>script</span>
            <span style={{ color: "#B3B7BC" }}>&gt;</span>
          </span>
        </div>
      </>
    );
  }
}

export default Install;
