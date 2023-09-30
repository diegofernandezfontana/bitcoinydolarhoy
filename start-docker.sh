#!/bin/sh



echo "-----START LS----------"
ls -a $HOME
echo "------END LS---------"

export PATH=$PATH:/home/.bun/bin


current_dir=$(pwd)

echo "-----START LS----------"
ls 
echo "------END LS---------"

#1- LOAD PRIVATE KEY
#eval "$(ssh-agent -s)"
#"$current_dir"/ssh_add.exp

#3 get historical data
cd "$current_dir"/historical
bun run get:all

#4 # get current price USD and BTC
cd "$current_dir"/cron
bun run ./src/index.ts

cp "$current_dir"/cron/src/output/last_update.json "$current_dir"/bitcoindolayhoy/src/last_update.json
cp "$current_dir"/cron/src/output/last_update.json "$current_dir"/btcdolarhoy.tweeter/src/last_update.json

cd "$current_dir/bitcoindolayhoy"


pnpm build
pnpm preview --host

#docker build -t btc-0.0.1 -f /home/diego/diego/Dockerfile . && docker run -p 8000:4321 btc-0.0.1

