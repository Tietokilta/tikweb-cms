'use strict'

/**
 * publish-changes.js controller
 *
 * @description: A set of functions called "actions" of the `publish-changes` plugin.
 */

module.exports = ({ strapi }) => ({
  async runsStart(ctx) {
    try {
      await strapi
        .plugin('publish-changes')
        .service('publishChanges')
        .startBuild(ctx.request.body.environment)
      ctx.body = { status: 'ok' }
    } catch (e) {
      ctx.response.status = 500
      ctx.body = { error: e.message }
    }
  },

  async getRun(ctx) {
    try {
      ctx.body = await strapi
        .plugin('publish-changes')
        .service('publishChanges')
        .getLatestRun()
    } catch (e) {
      ctx.response.status = 500
      ctx.body = { error: e.message }
    }
  },
})