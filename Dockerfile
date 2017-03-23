FROM node:7.7.3

ADD ./nodemon.json /root/shortener-js/nodemon.json
ADD ./package.json /root/shortener-js/package.json

RUN mkdir /src
RUN npm install nodemon -g

WORKDIR /root/shortener-js

EXPOSE 3000

CMD npm start