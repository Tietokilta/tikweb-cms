module.exports = ({ env }) => ({
    responses: {
      privateAttributes: ['_v', 'id', 'created_at'],
    },
    rest: {
      defaultLimit: 100,
      maxLimit: 250,
    },
});