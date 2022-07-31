const { Octokit } = require('@octokit/core')
const { createAppAuth } = require('@octokit/auth-app')

/**
 * publish-changes.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const octokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: process.env.GITHUB_APP_ID,
    privateKey: process.env.GITHUB_APP_KEY,
    installationId: process.env.GITHUB_APP_INSTALLATION_ID,
  },
})

module.exports = ({ strapi }) => {
  function startBuild(environment) {
    strapi.log.info(`Starting build for ${environment}`)
    return octokit.request(
      'POST /repos/Tietokilta/tikweb-frontend/actions/workflows/node.js.yml/dispatches',
      {
        ref: 'start-build-from-strapi',
        inputs: { environment },
      }
    )
  }

  async function getLatestRun() {
    const res = await octokit.request(
      'GET /repos/Tietokilta/tikweb-frontend/actions/workflows/node.js.yml/runs'
    )
    const ranFromStrapi = res.data.workflow_runs.filter(
      (r) => r.event === 'workflow_dispatch'
    )

    return ranFromStrapi[0]
  }

  return {
    startBuild,
    getLatestRun,
  }
}