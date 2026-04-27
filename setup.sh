#!/bin/bash


# Installing prequisites packages
sudo apt-get update -y
sudo apt-get install -y git
sudo apt-get install -y nodejs
sudo apt-get install -y npm

# Cloning the repo
git clone https://github.com/brunaru/vivavox
cd ~/vivavox/

# Installing npm packages	
npm install
npm run install:all