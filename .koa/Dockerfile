# sudo docker run -t -v '/home/ubuntu/app:/usr/src/app' -p 80:8000 --name koa koa
FROM node:0.12.2

RUN mkdir /usr/src/app
WORKDIR /usr/src/app/

EXPOSE 8000

CMD cd .koa/ && npm start
