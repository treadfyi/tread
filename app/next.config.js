module.exports = {
  target: "serverless",
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/^pg-native$/));

    return config;
  }
};
