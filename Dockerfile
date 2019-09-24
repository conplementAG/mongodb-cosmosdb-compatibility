FROM node:lts

COPY ./src/package.json package.json

RUN npm install

COPY ./src .

WORKDIR /usr/src

RUN npm install -g nodemon

CMD [ "nodemon", "index.js" ]