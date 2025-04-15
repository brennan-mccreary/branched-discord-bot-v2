FROM node:23.11.0-alpine

WORKDIR /bot

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm", "start"]