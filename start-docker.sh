#!/bin/sh


#install expect to open ssh with user/pw
apt-get install expect

# Install bun (node already installed)
curl -fsSL https://bun.sh/install | bash


current_dir=$(pwd)

ls 
#1- LOAD PRIVATE KEY
eval "$(ssh-agent -s)"
"$current_dir"/ssh_add.exp

#3 get historical data
cd "$current_dir"/historical
bun run get:all

pnpm build

# Ejecutar preview
pnpm preview --host

docker build -t btc-0.0.1 -f /home/diego/diego/Dockerfile . && docker run -p 8000:4321 btc-0.0.1

