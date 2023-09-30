#!/bin/bash

#
export PATH=$PATH:/home/.bun/bin
export PATH=$PATH:/usr/local/bin/bun

#Set /app as current directory
current_dir="/app"

echo "------Entro al run-all.sh------"

#Set repository for git
ssh-keyscan github.com >> ~/.ssh/known_hosts
git remote set-url origin git@github.com:diegofernandezfontana/bitcoinydolarhoy.git
git pull origin master

#1- LOAD PRIVATE KEY
eval "$(ssh-agent -s)"
"$current_dir"/ssh_add.exp

#3 get historical data
cd "$current_dir"/historical
bun run get:all

# #4 # get current price USD and BTC
cd "$current_dir"/cron
bun run ./src/index.ts

# #5 #Copy the output from cron to bitcoindolarhoy and btcdolarhoy.tweet
cp "$current_dir"/cron/src/output/last_update.json "$current_dir"/bitcoindolayhoy/src/last_update.json
cp "$current_dir"/cron/src/output/last_update.json "$current_dir"/btcdolarhoy.tweeter/src/last_update.json
cd $current_dir

#Push to build astro page
#git add .
#git commit -m "Auto update from docker file"
#git push -f origin main


# Tweet
cd "$current_dir"/btcdolarhoy.tweeter
bun ./src/index.ts