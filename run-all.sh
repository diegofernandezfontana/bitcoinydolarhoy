#!/bin/bash

#LOAD PRIVATE KEY
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/tweet-automatic

#move to current working dir
cd pwd

echo "Starting the script, getting historical data"
# get historical
cd ./historical
bun run get:all

echo "Finished getting all historical"
echo "Starting to get current USD and BTC price"

# get current price USD and BTC
cd ../cron
bun ./src/index.ts

cp ./src/output/last_update.json ../bitcoindolarhoy/otherthing.json
cd ..

ssh -T git@github.com
git remote set-url origin git@github.com:diegofernandezfontana/bitcoinydolarhoy.git

echo "starting checkout and auto commit"
git add .
#git commit -m "Auto update"
#git push origin main

