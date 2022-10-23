FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY src/plugins/publish-changes/package*.json src/plugins/publish-changes/

RUN npm install

COPY . .

ENV NODE_ENV production

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start-with-config"]
