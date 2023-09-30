#!/bin/sh

echo "-----START docker----------"
echo "STARTING start-docker.sh"
echo "----- start-docker---------"

service rsyslog start
service cron start

export PATH=$PATH:/home/.bun/bin

chmod +x ssh_add.exp
chmod +x run-all.sh

current_dir=$(pwd)

#GIT SETUP
#REMOVE subdirectory of git
rm -rf "$current_dir"/btcdolarhoy.tweeter/.git
#SET TO MAKE GIT PUSH AVAILABLE from run--all.sh
mkdir -p /root/.ssh
chmod 700 /root/.ssh
ssh-keyscan github.com >> /root/.ssh/known_hosts


#SET UP CRON with my-cron-job config
crontab /app/my-cron-job
service cron start

service cron status

# Keeps process running, otherwise docker finilizes
tail -f /dev/null