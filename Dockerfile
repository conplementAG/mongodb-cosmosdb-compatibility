FROM node:lts

COPY ./src/package.json package.json

RUN npm install

COPY ./src .

WORKDIR /usr/src

RUN npm install -g nodemon


EXPOSE 3000
CMD [ "nodemon", "index.js" ]