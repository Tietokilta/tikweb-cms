module.exports = ({ env }) => ({
  'publish-changes': {
    enabled: Boolean(process.env.GITHUB_APP_ID),
    resolve: './src/plugins/publish-changes',
  },
})
