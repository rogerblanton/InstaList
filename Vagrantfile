# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.box_check_update = true

  config.vm.boot_timeout = 500

  config.vm.synced_folder "./", "/home/ubuntu/InstaList"

  # dumbby http server
  config.vm.network "forwarded_port", guest: 80, host: 8000
  # socket
  config.vm.network "forwarded_port", guest: 8181, host: 8181
  # rethinkdb http admin panel
  config.vm.network "forwarded_port", guest: 8080, host: 8080
  # rethinkdb Drivers
  #config.vm.network "forwarded_port", guest: 28015, host: 28015
  # rethinkdb Cluster
  #config.vm.network "forwarded_port", guest: 29015, host: 29015

  #config.vm.network "forwarded_port", guest: 35729, host: 35729
  #config.vm.network "forwarded_port", guest: 9876, host: 9876

  #config.vm.provision :shell, inline: "apt-get update", privileged: true
  #config.vm.provision :shell, inline: "apt-get install -y build-essential libssl-dev git", privileged: true
  #config.vm.provision :shell, inline: "apt-get install -y xvfb gtk2-engines-pixbuf xfonts-cyrillic xfonts-100dpi xfonts-75dpi xfonts-base xfonts-scalable", privileged: true

  #config.vm.provision :shell, path: "provision.sh", privileged: false

  config.vm.provision :docker do |d|
    d.build_image "/home/ubuntu/InstaList/.koa",
      args: "-t koa"
    d.run "koa",
      args: "-t -v '/home/ubuntu/InstaList:/usr/src/app' -p 80:8000"
    d.build_image "/home/ubuntu/InstaList/.rethinkdb",
      args: "-t rethinkdb"
    d.run "rethinkdb",
      args: "-t -v '/home/ubuntu/InstaList/:/usr/src/app' -p 8080:8080 -p 28015:28015 -p 29015:29015"
    d.build_image "/home/ubuntu/InstaList/.socket",
      args: "-t socket"
    d.run "socket",
      args: "-t -v '/home/ubuntu/InstaList:/usr/src/app' -p '8181:8181/tcp' -p '8181:8181/udp' --link rethinkdb:rethinkdb"
    #d.build_image "/home/ubuntu/InstaList/.gulp",
    #  args: "-t gulp"
    #d.run "gulp",
    #  args: "-t -v '/home/ubuntu/InstaList:/usr/src/app' --link koa:koa"
  end

  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--name", "InstaList Dev Env"]
    vb.customize ["modifyvm", :id, "--memory", "2048"]
    vb.customize ["modifyvm", :id, "--cpus", "2"]
    vb.customize ["modifyvm", :id, "--ioapic", "on"]
  end

  # On every vagrant up
  # TODO: Should also run helpers.sh in start.sh
  #config.vm.provision :shell, privileged: false, run: "always", path: "start.sh"

end
