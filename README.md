# tietokilta.fi

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Tietokilta_tietokilta.fi&metric=alert_status)](https://sonarcloud.io/dashboard?id=Tietokilta_tietokilta.fi)

## Requirements

- Docker
- Docker Compose
- NPM

## Setup

```
# Start the database
docker-compose up -d

# Set the default dotenv configuration
mv .env.example .env

# Start the CMS app
npm install
npm run build
npm run config-restore
npm run develop
```

## Settings dump

Strapi saves some settings in the database. In order to propagate these to the repository and eventually production, dump the settings using:

```
npm run config-dump
```

and commit the file (`strapiConfig.json`) to git. In order to restore configuration, run:

```
npm run config-restore
```

Configuration is restored automatically on docker container start (so e.g. in production).
