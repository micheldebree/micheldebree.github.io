# -*- mode: ruby -*-
# vi: set ft=ruby :
#
# Setup a development enviroment with Vagrant
# Usage:
# - Install Vagrant for your platform
# - Open a command-line in the same directory as this file
# - Type: vagrant up
# - Surf to localhost:4000
# - Edit files in your favorite editor and watch the site change

@provision = <<SCRIPT
#!/bin/bash

sudo locale-gen UTF-8

# install Ruby 2
sudo apt-get -y remove ruby
sudo apt-get install -y software-properties-common
sudo apt-add-repository -y ppa:brightbox/ruby-ng
sudo apt-get update
sudo apt-get install -y ruby2.2 ruby2.2-dev

# install Jekyll
sudo gem install jekyll
SCRIPT

@serve = <<SCRIPT
#!/bin/bash
cd /vagrant
jekyll serve --watch --force_polling
SCRIPT

Vagrant.configure(2) do |config|
  config.vm.box = 'ubuntu/trusty64'
  config.vm.network 'forwarded_port', guest: 4000, host: 4000
  config.vm.network 'forwarded_port', guest: 35_730, host: 35_730
  config.vm.provision 'shell', inline: @provision
  config.vm.provision 'shell', inline: @serve, run: 'always'
end
