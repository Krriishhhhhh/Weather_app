#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v21.2.0/bin

cd Weather_app
sudo git pull origin main
cd server
pm2 stop server
yarn build
pm2 start yarn --name "server" -- start

