# Portfolio

Mon portfolio de développeur : projets, blog et notes « TIL » (Today I Learned) avec extraits de code. Site multilingue, avec un contenu facile à enrichir depuis la base de données.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## ✨ Fonctionnalités

📁 **Projets** : fiches projet avec images, liens, description et titres traduits par langue

📝 **Blog** : articles avec épinglage, images et lieu

💡 **TIL** : notes courtes avec extrait de code, langage, tags et lien vers la documentation

👏 **Réactions** : trois réactions (applaudir, réfléchir, impressionné) par visiteur, avec compteurs de vues et de partages

🌍 **Internationalisation** avec next-intl, contenus stockés par langue

🌗 **Thème clair / sombre** avec next-themes

🎞️ **Animations** avec Framer Motion et Lottie, contenu riche en MDX

## 🧱 Stack technique

⚛️ **Front-end** : Next.js 15 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4, Radix UI, shadcn/ui, lucide-react

🧠 **État et données** : TanStack Query, Zustand, React Hook Form, Zod

🗄️ **Back-end** : Server Actions Next.js, Prisma 6, PostgreSQL

🚢 **Déploiement** : Docker (build multi-étapes, image Node 20 Alpine)

## 🚀 Lancer le projet en local

Prérequis : Node.js, pnpm et une base PostgreSQL.

```bash
pnpm install
```

Créer un fichier `.env` à la racine avec au minimum l'URL de la base :

```bash
DATABASE_URL="postgresql://utilisateur:motdepasse@localhost:5432/portfolio"
```

Générer le client Prisma, appliquer les migrations puis démarrer :

```bash
pnpm prisma:generate:prod
pnpm prisma:migrate:prod
pnpm dev
```

Le site est alors disponible sur http://localhost:3000.

## 🧰 Scripts

`pnpm dev` : serveur de développement (Turbopack)

`pnpm build` puis `pnpm start` : build et serveur de production

`pnpm lint` : analyse ESLint

`pnpm prisma:studio` : interface Prisma pour parcourir la base

## 🐳 Docker

Le `Dockerfile` construit l'application en deux étapes (build, puis image d'exécution légère basée sur Node 20 Alpine). La variable `DATABASE_URL` est fournie au lancement du conteneur :

```bash
docker build -t portfolio .
docker run -p 3000:3000 --env-file .env portfolio
```

## 👤 Auteur

**Daniel Akim**, développeur web & IA basé à Cergy-Pontoise.

[Mon profil GitHub](https://github.com/DanielAkim2000)
