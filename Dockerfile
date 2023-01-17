FROM node:14.17

WORKDIR /usr/app
ADD ./package.json ./package-lock.json ./
RUN npm install

COPY ./ ./

RUN [ ! -f .env ] && cp docker.env .env || echo "using custom .env config"

EXPOSE 8080

CMD npm run migrate up & npm start