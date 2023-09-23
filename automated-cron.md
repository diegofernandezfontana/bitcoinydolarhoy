# How to run Cron Job (Linux):

## Setup: ssh_add.exp:

How to use run-all.sh script.
REQUIRED to run:
`sudo apt-get install expect`

This script does secuential things:
0-> Need to set up PATH, to specify which verison of run will be run by the cron job.

1- set SSH-AGENT with ssh_add.exp file.
2- script sets current_dir based on PWD of where the cron is being executed, which by default is linux /home/username. In the script we define our current_dir to PWD/PATH_TO_OUR_FOLDER
3- COMMENTED BY DEFAULT, Get historical data, if its already loaded, there is no need to re-fetch
4- Get current price of USD + BTC
5- Copy and paste the result of fetching data
6- set remote set-url to be able to push from ssh

We need to set permission to ssh_add and run-all.sh since they will be run from cron.
chmod +x /home/diego/diego/bitcoinydolarhoy/ssh_add.exp
chmod +x /home/diego/diego/bitcoinydolarhoy/run-all.sh
bash
Copy code
chmod +x /home/diego/diego/bitcoinydolarhoy/ssh_add.exp
chmod +x /home/diego/diego/bitcoinydolarhoy/run-all.sh 3. Configuración del Script Principal (run-all.sh):
Aquí hay un ejemplo de cómo debería verse tu script principal:

bash
Copy code
#!/bin/bash

# Carga la clave privada

eval "$(ssh-agent -s)"
current_dir=$(pwd) # Esto es la ruta desde donde se ejecuta el cron
"$current_dir"/ssh_add.exp

echo "Starting the script, getting historical data"
... # Resto del script
Ten en cuenta que $(pwd) obtendrá el directorio desde donde se ejecuta el cron y no necesariamente el directorio donde reside run-all.sh.

4. Configuración del Cron:
   Agrega una entrada al crontab para ejecutar tu script a intervalos regulares:

bash
Copy code
_/20 _ \* \* \* /bin/bash /home/diego/diego/bitcoinydolarhoy/run-all.sh >> /home/diego/diego/bitcoinydolarhoy/logs.txt 2>&1
Para editar tu crontab:

bash
Copy code
crontab -e
Y para ver tus entradas actuales:

bash
Copy code
crontab -l 5. Registro (Logging):
La salida de tu cron job se guardará en logs.txt. Puedes revisar este archivo para cualquier mensaje de salida o error.
