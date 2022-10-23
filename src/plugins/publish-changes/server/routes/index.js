module.exports = [
  {
    method: 'POST',
    path: '/runs/start',
    handler: 'publishChanges.runsStart',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'GET',
    path: '/runs/latest',
    handler: 'publishChanges.getRun',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
]