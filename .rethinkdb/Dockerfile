# sudo docker run -dt -v '/home/ubuntu/InstaList:/usr/src/app' -p 8080:8080 -p 28015:28015 -p 29015:29015 --name rethinkdb rethinkdb
FROM ubuntu:trusty

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN \
  echo "deb http://download.rethinkdb.com/apt `lsb_release -cs` main" > /etc/apt/sources.list.d/rethinkdb.list && \
  apt-get update && \
  apt-get install -y wget && \
  wget -O- http://download.rethinkdb.com/apt/pubkey.gpg | apt-key add - && \
  apt-get update && \
  apt-get install -y rethinkdb python-pip && \
  rm -rf /var/lib/apt/lists/*

RUN pip install rethinkdb

CMD ["rethinkdb", "--bind", "all"]

EXPOSE 8080
EXPOSE 28015
EXPOSE 29015
