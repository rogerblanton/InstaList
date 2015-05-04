FROM dockerfile/ubuntu

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN \
  echo "deb http://download.rethinkdb.com/apt `lsb_release -cs` main" > /etc/apt/sources.list.d/rethinkdb.list && \
  wget -O- http://download.rethinkdb.com/apt/pubkey.gpg | apt-key add - && \
  apt-get update && \
  apt-get install -y rethinkdb python-pip && \
  rm -rf /var/lib/apt/lists/*

RUN pip install rethinkdb

CMD ["rethinkdb", "--bind", "all"]

EXPOSE 8080
EXPOSE 28015
EXPOSE 29015
