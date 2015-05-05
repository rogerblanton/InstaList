#!/bin/bash

# Save Some Paths
IL_PROJECT_PATH="/home/ubuntu/InstaList"

DISPLAY=:1.5

export PATH IL_PROJECT_PATH CHROME_BIN DISPLAY

# Helpful Functions
# These must be run inside of vagrant
#  or via `vagrant ssh -c func-name`

# This will kill all the procs running the gulp dev server
# TODO: convert to docker kill
kill-gulp ()
{
  echo "nothing to kill"
}

# This will run `npm start` correctly
start-gulp ()
{
  echo "gulp already running"
}

# This just runs the above two commands
restart-gulp ()
{
  kill-gulp ; start-gulp
}

# setup container for socket and db;
run-db-and-socket{
  docker run -dt -v '/home/ubuntu/InstaList:/usr/src/app' -p 8080:8080 -p 28015:28015 -p 29015:29015 --name rethinkdb rethinkdb; docker run -dt -v /home/ubuntu/InstaList:/usr/src/app --name socket -p 81:8181/tcp -p 81:8181/udp --link rethinkdb:rethinkdb  socket;
}
# $1: namespace | < il | ui | poc >
# $2: elem-name
copy-element ()
{
  # little bit of protection
  if [ "$#" != 2 ]; then
    echo "ERROR: Not the right number of args, must be 2 ie: namespace elem-name"
    return
  fi
  local CWD=`pwd`

  # transform $2 into camel case
  local replaceNext=false
  local varname=""
  for char in `echo "$2" | sed -e "s/\(.\)/\1\n/g"` ; do
    if [ "$replaceNext" == true ]; then
      varname="$varname$(echo $char | tr '[:lower:]' '[:upper:]')"
      replaceNext=false
      continue
    fi
    if [ "$char" == "-" ]; then
      replaceNext=true
    else
      varname="$varname$char"
    fi
  done
  echo "variable name will be: $varname"

  # move dirs and copy ./.new/*
  cd "$IL_PROJECT_PATH/InstaList/www/components/"
  cp -r "./.new/" "./$1/$2/" && echo "copied sucessfuly"

  # move again and do magic on files
  cd "./$1/$2"
  for file in ./*; do
    sed -i -e "s/new-element/$2/g" "${file}" && echo "rewrote tag style names"
    sed -i -e "s/newElement/${varname}/g" "${file}" && echo "rewrote variable name"
    mv "${file}" "${file/new-element/$2}" && echo "renamed ${file} -> ${file/new-element/$2}"
  done

  # yay done
  echo "created new element in: " && pwd
  cd "$CWD"
}
