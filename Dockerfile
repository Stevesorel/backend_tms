FROM node:18-alpine

# Création du dossier de l'app
WORKDIR /app

# Installation des dépendances (en copiant d'abord les json pour optimiser le cache)
COPY package*.json ./
RUN npm install --production

# Copie du reste du code
COPY . .

# Ton port backend (ex: 4000)
EXPOSE 4000

CMD ["node", "index.js"]