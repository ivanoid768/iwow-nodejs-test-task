FROM node:14.15

WORKDIR /usr/app
ADD ./package.json ./package-lock.json ./
RUN npm install

COPY ./ ./

RUN [ ! -f .env ] && cp docker.env .env || echo "using custom .env config"

RUN npm run build

EXPOSE 4000
CMD ["node", "-r", "ts-node/register/transpile-only", "-r", "dotenv/config", "./build/index.js"]