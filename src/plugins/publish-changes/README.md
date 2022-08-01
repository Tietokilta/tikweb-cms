# Strapi plugin publish-changes

A plugin that enables starting GitHub Actions from Strapi. Some environmental variables are required for this plugin to work correctly:

- `GITHUB_APP_KEY`
  - A private RSA256 key
- `GITHUB_APP_ID`
  - A GitHub App ID
  - From [here](https://github.com/organizations/Tietokilta/settings/apps/tikweb-cms)
- `GITHUB_APP_INSTALLATION_ID`
  - A GitHub App Installation ID
  - From [here](https://github.com/organizations/Tietokilta/settings/installations) (Configure -> ID is in URL)

You can find more information on how to further develop on Strapi plugins [here](https://docs-v3.strapi.io/developer-docs/latest/development/local-plugins-customization.html#quick-start).
