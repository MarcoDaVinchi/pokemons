#!/bin/bash
#Deps are curl or wget and sudo for debian buster. Install before running this script.

#Change root password!
passwd

user="dockuser"

adduser $user

sudo apt update -y && sudo apt upgrade -y && sudo apt dist-upgrade

sudo apt remove docker docker-engine docker.io containerd runc

sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common \
    tmux \
    htop \
    git

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"

curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo systemctl enable docker

sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" \
    -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

sudo usermod -aG docker $user