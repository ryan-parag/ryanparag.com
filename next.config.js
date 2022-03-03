module.exports = {
  env: {
    REACT_APP_MAILCHIMP_URL: process.env.REACT_APP_MAILCHIMP_URL,
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    AIRTABLE_BASE: process.env.AIRTABLE_BASE,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
    SPOTIFY_USER_ID: process.env.SPOTIFY_USER_ID,
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    NOTION_AMA_DATABASE_ID: process.env.NOTION_AMA_DATABASE_ID,
    NOTION_ROLE_DATABASE_ID: process.env.NOTION_ROLE_DATABASE_ID,
    NOTION_AUTH_DATABASE_ID: process.env.NOTION_AUTH_DATABASE_ID,
    NOTION_PORTFOLIO_DATABASE_ID: process.env.NOTION_PORTFOLIO_DATABASE,
    NOTION_THEMES_DATABASE_ID: process.env.NOTION_THEMES_DATABASE,
    LIVEBLOCKS_API_KEY: process.env.LIVEBLOCKS_API_KEY,
    NEW_SENDGRID_API_KEY: process.env.NEW_SENDGRID_API_KEY,
    GITHUB_API_KEY: process.env.GITHUB_API_KEY,
    AUTH_STRING: process.env.AUTH_STRING,
    LINKPREVIEW_API_KEY: process.env.LINKPREVIEW_API_KEY,
    NOTION_WORDLE: process.env.NOTION_WORDLE
  },
  images: {
    domains: ['i.scdn.co', 'mosaic.scdn.co'],
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
