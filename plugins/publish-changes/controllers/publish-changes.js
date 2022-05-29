"use strict";

const { startBuild, getLatestRun } = require("../services/publish-changes");

/**
 * publish-changes.js controller
 *
 * @description: A set of functions called "actions" of the `publish-changes` plugin.
 */

async function runsStart(ctx) {
  try {
    await startBuild(ctx.request.body.environment);
    ctx.body = { status: "ok" };
  } catch (e) {
    ctx.response.status = 500;
    ctx.body = { error: e.message };
  }
}

async function getRun(ctx) {
  try {
    ctx.body = await getLatestRun();
  } catch (e) {
    ctx.response.status = 500;
    ctx.body = { error: e.message };
  }
}

module.exports = { runsStart, getRun };
