#!/bin/bash


# Installing prequisites packages
sudo apt-get update -y
sudo apt-get install -y git
sudo apt-get install -y nodejs
sudo apt-get install -y npm

# Installing npm packages	
npm install
npm run install:all
