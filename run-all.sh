#!/bin/bash

#LOAD PRIVATE KEY
eval "$(ssh-agent -s)"
#ssh-add ~/.ssh/tweet-automatic
./ssh_add.exp
current_dir=$(pwd)

echo "Starting the script, getting historical data"

cd ./historical
bun run get:all


# get current price USD and BTC
cd ../cron
bun ./src/index.ts

#Copy the output from cron to bitcoindolarhoy
cp "$current_dir"/cron/src/output/last_update.json "$current_dir"/bitcoindolayhoy/src/last_update.json
cd ..

git remote set-url origin git@github.com:diegofernandezfontana/bitcoinydolarhoy.git
#Update
git add .
git commit -m "Auto update"
git push origin main

cd ./btcdolarhoy.tweeter

bun ./src/index.ts