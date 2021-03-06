#!/bin/bash

# Set TimeZone to LA
sudo timedatectl set-timezone America/Los_Angeles

#clear old docker images
#docker stop koa socket gulp rethinkdb; docker rm koa socket gulp rethinkdb;

# install and load nvm
#if [ ! -d ~/.nvm ]; then
#  curl -# https://raw.githubusercontent.com/creationix/nvm/v0.23.0/install.sh > ~/install.nvm.sh
#  chmod +x ~/install.nvm.sh
#  . ~/install.nvm.sh
#  rm ~/install.nvm.sh
#  source ~/.nvm/nvm.sh ; echo "installed nvm"
#fi

# install node 0.11 via nvm
#nvm install 0.11

# install set 0.11 as default for system in nvm
#nvm alias default 0.11

# Install Google Chrome
#wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
#sudo sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
#sudo apt-get update
#sudo apt-get -y install google-chrome-stable

# add some stuff to .profile
#echo "" >> ~/.profile
#echo "# Added during provision" >> ~/.profile
#echo "source ~/InstaList/helpers.sh" >> ~/.profile
#source ~/.profile

# Create app for prosperty
#if [ ! -d "$IL_PROJECT_PATH" ]; then
#  mkdir "$IL_PROJECT_PATH"
#fi

# Create logs folder if needed
#if [ ! -d "$IL_PROJECT_PATH/logs" ]; then
#  mkdir "$IL_PROJECT_PATH/logs"
#fi

# Create logs/gulp folder if needed
#if [ ! -d "$IL_PROJECT_PATH/logs/gulp" ]; then
#  mkdir "$IL_PROJECT_PATH/logs/gulp"
#fi

# Create logs/xvfb folder if needed
#if [ ! -d "$IL_PROJECT_PATH/logs/xvfb" ]; then
#  mkdir "$IL_PROJECT_PATH/logs/xvfb"
#fi
