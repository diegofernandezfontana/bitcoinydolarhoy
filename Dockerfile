
# From root docker build -t nombre-de-tu-imagen -f /home/diego/diego/Dockerfile .
FROM node:20

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

RUN npm install -g bun

#installs expect to commit to github, add cron, rsyslog (LOGS CRON)
RUN apt-get update && apt-get install -y expect cron rsyslog && rm -rf /var/lib/apt/lists/*


# Copiamos todo el contenido de 'bitcoinydolarhoy' en '/app' dentro del contenedor
# El archivo .dockerignore evitará que se copien directorios como 'node_modules'
COPY bitcoinydolarhoy/ /app/
COPY bitcoinydolarhoy/start-docker.sh /app/start-docker.sh
COPY bitcoinydolarhoy/run-all.sh /app/run-all.sh
COPY bitcoinydolarhoy/ssh_add.exp /app/ssh_add.exp
COPY bitcoinydolarhoy/my-cron-job /app/my-cron-job
COPY bitcoinydolarhoy/private-key /app/private-key

RUN chmod 600 /app/private-key
RUN chmod +x /app/run-all.sh

# Desactivar el módulo imklog en rsyslog
RUN sed -i '/$ModLoad imklog/s/^/#/' /etc/rsyslog.conf
#Enable cron logs
RUN echo 'cron.* /var/log/cron.log' >> /etc/rsyslog.d/50-default.conf



#Give permission and run 
RUN chmod +x /app/start-docker.sh
CMD ["/app/start-docker.sh"]
