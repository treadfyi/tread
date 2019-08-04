require("dotenv").config();

module.exports = {
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    TREAD_APP_API: process.env.TREAD_APP_API
  },
  target: "serverless",
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/^pg-native$/));

    return config;
  }
};
