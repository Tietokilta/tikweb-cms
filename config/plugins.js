module.exports = ({ env }) => ({
  // This has to come before graphql, otherwise models will not appear properly.
  navigation: {
    enabled: true,
  },
  graphql: {
    enabled: true,
  },
  'publish-changes': {
    enabled: Boolean(process.env.GITHUB_APP_ID),
    resolve: './src/plugins/publish-changes',
  },
})
