module.exports = () => ({
  responses: {
    privateAttributes: ['_v', 'created_at', 'published_at', 'updated_at'],
  },
  rest: {
    defaultLimit: 100,
    maxLimit: 250,
  },
})
