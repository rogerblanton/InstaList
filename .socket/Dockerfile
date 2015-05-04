# sudo docker run -dt -v ~/:/usr/src/app --name socket -p 81:8181/tcp -p 81:8181/udp --link rethinkdb:rethinkdb  socket;
FROM node:0.12.2

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

EXPOSE 8181

CMD cd .socket/ && npm start
