# Utiliser une image Node.js
FROM node:22.11.0-alpine

# Définir le répertoire de travail
WORKDIR /portfolio

# Copier les fichiers de configuration
COPY package.json pnpm-lock.yaml ./

# Installer pnpm et Prisma, et installer les dépendances du projet
RUN npm install -g pnpm && pnpm install && npm install -g prisma && pnpm approve-builds

# Copier le reste du projet
COPY . .

# Exposer le port si besoin
EXPOSE 3000