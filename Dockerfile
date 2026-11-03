# Étape 1 : Builder
FROM node:20-alpine AS builder

# Même version de pnpm qu'en local (le lockfile et les overrides en dépendent)
RUN npm install -g pnpm@10.30.3

WORKDIR /app

# Copier uniquement les fichiers nécessaires à l'installation
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Installer les dépendances (devDependencies incluses : prisma, typescript, tailwind)
RUN pnpm install --frozen-lockfile

# Copier le reste du code
COPY . .

# Générer le client Prisma et build du projet Next.js.
# prisma.config.ts exige DATABASE_URL : valeur factice, valable pour ces commandes
# seulement (pages dynamiques, aucune requête à la base pendant le build).
RUN DATABASE_URL="postgresql://build:build@localhost:5432/build" npx prisma generate
RUN DATABASE_URL="postgresql://build:build@localhost:5432/build" pnpm build

# Étape 2 : Runner
FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g pnpm@10.30.3

# Next, next-intl, MDX et Prisma ont besoin à l'exécution de la config,
# des messages, du contenu et des migrations : on reprend tout le builder.
COPY --from=builder /app ./

ENV NODE_ENV=production
EXPOSE 3000

# Applique les migrations Prisma (DATABASE_URL fournie par Dokploy) puis lance Next.js
CMD ["sh", "-c", "pnpm prisma:migrate:prod && pnpm start"]
