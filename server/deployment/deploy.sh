#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v21.2.0/bin

cd Weather_app
git pull origin main
cd server
pm2 kill
yarn build
pm2 start dist/index.js

