# Étape 1 : Builder
FROM node:20-alpine AS builder

# Installer pnpm globalement
RUN npm install -g pnpm

# Créer le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires à l'installation
COPY package.json pnpm-lock.yaml ./

# Installer les dépendances (en mode production=false pour avoir prisma et next)
RUN pnpm install

# Copier le reste du code
COPY . .

# Générer le client Prisma et build du projet Next.js
RUN npx prisma generate
RUN pnpm build

# Étape 2 : Runner (image légère)
FROM node:20-alpine AS runner

WORKDIR /app

# Installer pnpm globalement
RUN npm install -g pnpm

# Copier uniquement ce qu’il faut pour exécuter
COPY package.json pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Définir la variable d'environnement
ENV NODE_ENV=production
EXPOSE 3000

# Lancer Next.js en production
CMD ["pnpm", "start"]
