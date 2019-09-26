FROM node:lts

WORKDIR /usr/src

COPY ./src/package.json package.json

RUN npm install && npm install -g nodemon

COPY ./src .

EXPOSE 3000

CMD [ "nodemon", "index.js" ]