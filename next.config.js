module.exports = {
  env: {
    REACT_APP_MAILCHIMP_URL: process.env.REACT_APP_MAILCHIMP_URL
  },
  target: 'serverless',
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
}
