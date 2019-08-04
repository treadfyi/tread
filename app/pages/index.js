import React from "react";

class Home extends React.Component {
  componentDidMount() {
    if (typeof this.props.data === "undefined") {
      window.location = `https://github.com/login/oauth/authorize?client_id=${
        process.env.GITHUB_CLIENT_ID
      }`;
    }
  }

  render() {
    console.log(this.props);

    return <h1>Tread App</h1>;
  }
}

export default Home;
