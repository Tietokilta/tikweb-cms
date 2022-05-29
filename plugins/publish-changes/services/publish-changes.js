"use strict";

const { Octokit } = require("@octokit/core");
const { createAppAuth } = require("@octokit/auth-app")
const jwt = require("jsonwebtoken");

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
  }
});

function startBuild(environment) {
  strapi.log.info(`Starting build for ${environment}`);
  return octokit.request(
    "POST /repos/Tietokilta/tikweb-frontend/actions/workflows/node.js.yml/dispatches",
    {
      ref: "start-build-from-strapi",
      inputs: { environment },
    }
  );
}

async function getLatestRun() {
  const res = await octokit.request(
    "GET /repos/Tietokilta/tikweb-frontend/actions/workflows/node.js.yml/runs"
  );
  const ranFromStrapi = res.data.workflow_runs.filter(
    (r) => r.event === "workflow_dispatch"
  );

  return ranFromStrapi[0];
}

const tokenCache = {
  expiry: new Date(),
  token: "",
};

function generateJWT() {
  if (tokenCache.expiry > new Date()) {
    return tokenCache.token;
  }

  const payload = {
    iat: Math.floor(new Date() / 1000) - 60,
    exp: Math.floor(new Date() / 1000) + (10 * 60),
    iss: process.env.GITHUB_APP_ID,
  };
  const token = jwt.sign(payload, process.env.GITHUB_APP_KEY, { algorithm: "RS256" });
  tokenCache.expiry = payload.exp;
  tokenCache.token = token;

  return token;
}

async function getInstallations() {
}

module.exports = { startBuild, getLatestRun };
