FROM node:7.7.3

RUN npm install nodemon -g
RUN npm install

EXPOSE 8888

CMD npm start