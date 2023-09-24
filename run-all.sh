#!/bin/bash

#0
export PATH=$PATH:/home/diego/.bun/bin

#2
current_dir=$(pwd)/diego/bitcoinydolarhoy

#1- LOAD PRIVATE KEY
eval "$(ssh-agent -s)"
"$current_dir"/ssh_add.exp

#3 get historical data
#cd "$current_dir"/historical
#bun run get:all

#4 # get current price USD and BTC
cd "$current_dir"/cron
bun run ./src/index.ts

#5 #Copy the output from cron to bitcoindolarhoy and btcdolarhoy.tweet
cp "$current_dir"/cron/src/output/last_update.json "$current_dir"/bitcoindolayhoy/src/last_update.json
cp "$current_dir"/cron/src/output/last_update.json "$current_dir"/btcdolarhoy.tweeter/src/last_update.json
cd "$current_dir"

git remote set-url origin git@github.com:diegofernandezfontana/bitcoinydolarhoy.git
# #Update
git add .
git commit -m "Auto update"
git push origin main

# Tweet
cd "$current_dir"/btcdolarhoy.tweeter
bun ./src/index.ts