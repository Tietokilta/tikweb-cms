# tietokilta.fi

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Tietokilta_tietokilta.fi&metric=alert_status)](https://sonarcloud.io/dashboard?id=Tietokilta_tietokilta.fi)

## Requirements
- Docker
- NPM

## Setup

```
docker-compose up -d

mv .env.example .env 

npm install
npm run config-restore
npm run develop
```


## Admin panel config

Whenever you change layout of the admin panel components, commit the changes to repo with
```
npm run config-dump
```
this creates a config json file


To apply the config file, run 
```
npm run config-restore
```
