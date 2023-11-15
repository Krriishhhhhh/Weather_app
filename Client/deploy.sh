#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v21.2.0/bin

cd Weather_app
sudo git pull origin main
cd Client
pm2 stop client
yarn build
pm2 start yarn --name "client" -- start

