# Utiliser une image Node.js comme image de base
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste de l'application dans le conteneur
COPY . .

# Compiler l'application (si vous utilisez TypeScript)
RUN npm run build

# Exposer le port sur lequel l'application sera exécutée
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "start:prod"]
