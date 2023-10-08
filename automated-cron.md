# How to run Cron Job (Linux):

## Setup: ssh_add.exp:

How to use run-all.sh script.
REQUIRED to run:
`sudo apt-get install expect`

This script does secuential things:
0-> Need to set up PATH, to specify which verison of bun will be run by the cron job.
1- set SSH-AGENT with ssh_add.exp file.
2- script sets current_dir based on PWD of where the cron is being executed, which by default is linux /home/username. In the script we define our current_dir to PWD/PATH_TO_OUR_FOLDER
3- COMMENTED BY DEFAULT, Get historical data, if its already loaded, there is no need to re-fetch
4- Get current price of USD + BTC
5- Copy and paste the result of fetching data
6- set remote set-url to be able to push from ssh

We need to set permission to ssh_add and run-all.sh since they will be run from cron.

```
  chmod +x /home/diego/diego/bitcoinydolarhoy/ssh_add.exp
  chmod +x /home/diego/diego/bitcoinydolarhoy/run-all.sh
```

Open cron file :
`crontab -e`

This will open the /tmp folder where the cron is saved. the cron expression sets the time where the run will be executed. the next >> will specify the cron where to save the logs of the latest run script

```
*/10 * * * * /bin/bash /home/whole_path/bitcoinydolarhoy/run-all.sh >> /home/whole_path/bitcoinydolarhoy logs.txt 2>&1

```

Our ssh_add.exp needs to be like this:

```

#!/usr/bin/expect

# Tiempo máximo a esperar por una respuesta (ajusta según tus necesidades)
set timeout 20

# Ejecuta ssh-add y espera el prompt "Enter passphrase"
spawn ssh-add /home/diego/.ssh/tweet-automatic
expect "Enter passphrase for /home/diego/.ssh/tweet-automatic:"

# Envia la contraseña (reemplaza YOUR_PASSWORD con tu contraseña real)
send "PASSWORD\r"

# Espera a que termine la ejecución
expect eof


```

Chat GPT link to remember last conversations:
https://chat.openai.com/c/ccbaab11-1263-48bd-bc5e-fdb74f99e262
