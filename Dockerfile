# Étape 1 : Builder
FROM node:20-alpine AS builder

# Installer pnpm globalement
RUN npm install -g pnpm

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de package et lock
COPY package.json pnpm-lock.yaml ./

# Installer les dépendances
RUN pnpm install

# Copier le reste des fichiers
COPY . .

# Générer le client Prisma et build Next.js
RUN npx prisma generate
RUN pnpm build

# Étape 2 : Runner
FROM node:20-alpine

WORKDIR /app

# Installer pnpm globalement
RUN npm install -g pnpm

# Copier uniquement ce dont on a besoin pour l'exécution
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copier les fichiers build depuis l'étape builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# Définir la variable d'environnement pour Next.js
ENV NODE_ENV=production

# Exposer le port utilisé par Next.js
EXPOSE 3000

# Commande pour lancer l'application
CMD ["pnpm", "start"]
