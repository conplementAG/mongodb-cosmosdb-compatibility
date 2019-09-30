FROM node:lts

WORKDIR /usr/src

COPY ./src/package.json package.json

RUN npm install && npm install -g nodemon

COPY ./src .

EXPOSE 3000
EXPOSE 9229

CMD ["test"]

ENTRYPOINT [ "npm", "run" ]