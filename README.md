# Portfolio

Mon portfolio de développeur : projets, blog et notes « TIL » (Today I Learned) avec extraits de code. Site multilingue (français et anglais), avec un espace d'administration et des projets 42 que l'on peut **exécuter directement dans le navigateur**.

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma_7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![WebAssembly](https://img.shields.io/badge/WebAssembly-654FF0?style=for-the-badge&logo=webassembly&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## ✨ Fonctionnalités

📁 **Projets** : fiches projet avec liens, description et titres traduits par langue, contenu riche en MDX

📝 **Blog** : articles avec épinglage, images et lieu

💡 **TIL** : notes courtes avec extrait de code, langage, tags et lien vers la documentation

▶️ **Exécution dans le navigateur** : push_swap, Libft, ft_printf, get_next_line et 36 exercices des modules C++ sont compilés en WebAssembly et tournent côté visiteur, sans serveur ni service externe

👏 **Réactions** : trois réactions (applaudir, réfléchir, impressionné) par visiteur, avec compteurs de vues et de partages

🔐 **Espace admin** (`/admin`) : connexion NextAuth, gestion des projets, des articles et des TIL, limitation des tentatives de connexion

🌍 **Internationalisation** avec next-intl, contenus stockés par langue

🌗 **Thème clair / sombre** avec next-themes

🎞️ **Animations** avec Framer Motion et Lottie

## 🧱 Stack technique

⚛️ **Front-end** : Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4, Radix UI, shadcn/ui, lucide-react

🧠 **État et données** : TanStack Query, Zustand, React Hook Form

🗄️ **Back-end** : Server Actions Next.js, NextAuth, Prisma 7 (adaptateur `pg`), PostgreSQL

🧩 **WebAssembly** : Emscripten (dans Docker) et Web Workers

🚢 **Déploiement** : Docker (build multi-étapes, Node 20 Alpine) déployé avec Dokploy, CI GitHub Actions

## 🚀 Lancer le projet en local

Prérequis : Node.js 20.19+ ou 22.12+ (exigé par Prisma 7), pnpm 10 (la version est fixée dans `package.json`) et Docker pour la base de données.

```bash
pnpm install
cp .env.example .env.local   # puis remplacer NEXTAUTH_SECRET (openssl rand -base64 32)
pnpm db:up                   # PostgreSQL 15 local (docker-compose.dev.yml, port 5434)
pnpm db:migrate              # migrations Prisma
pnpm db:seed                 # projets du portfolio
pnpm seed:admin              # compte admin (ADMIN_EMAIL / ADMIN_PASSWORD de .env.local)
pnpm dev
```

Le site est alors disponible sur http://localhost:3000 et l'admin sur http://localhost:3000/admin.

> `.env.local` passe avant `.env` (dans Next.js, Prisma et les scripts) : en développement, utilise toujours une base locale, jamais celle de production.

## 📁 Le contenu des projets

La liste des projets vit à deux endroits :

- **les textes des fiches** dans `content/fr/projects/` et `content/en/projects/` (un fichier MDX par projet, nommé d'après son titre) ;
- **les métadonnées** (titre, sous-titre, description courte, liens GitHub) dans `scripts/projects-data.mjs`.

`pnpm db:seed` (ou `node scripts/seed-projects.mjs`) les synchronise avec la base. Sans `--apply`, le script ne fait qu'une simulation ; `--delete-old` retire les projets listés dans `projectsToDelete`.

> **Limite connue** : l'admin écrit les fichiers MDX sur le disque du conteneur, qui est perdu à chaque redéploiement. En production, ajoute les fiches par git (puis lance le script de synchronisation) plutôt que par l'admin.

## ▶️ Exécuter du C / C++ dans le navigateur

Les programmes compilés sont dans `public/wasm/` et sont **commités** : le build du site n'a pas besoin d'Emscripten.

- `scripts/build-wasm.sh` clone les dépôts publics des projets 42 et les compile avec Emscripten (via Docker). `scripts/build-wasm.sh push_swap` ne compile qu'un projet.
- Pour les bibliothèques sans `main` (Libft, ft_printf, get_next_line), un petit programme de démo se trouve dans `scripts/wasm-demos/`.
- `lib/runner/wasm-registry.ts` associe le titre d'un projet à son programme, et `lib/runner/cpp-exercises.json` décrit les exercices C++.
- Chaque exécution tourne dans un Web Worker neuf, arrêté au bout de 5 secondes.

Il n'y a ni `fork`, ni sockets, ni fenêtre dans le navigateur : minishell, pipex, ft_irc, fractol ou cub3D ne peuvent pas être exécutés ainsi.

## 🧰 Scripts

| Commande | Rôle |
|---|---|
| `pnpm dev` | serveur de développement (Turbopack) |
| `pnpm build` puis `pnpm start` | build et serveur de production |
| `pnpm lint` | analyse ESLint |
| `pnpm db:up` / `pnpm db:down` | démarre / arrête la base PostgreSQL locale |
| `pnpm db:migrate` | applique les migrations Prisma |
| `pnpm db:seed` | synchronise les projets avec la base |
| `pnpm seed:admin` | crée le compte admin (`--reset-password` pour un compte existant) |
| `pnpm prisma:studio` | interface Prisma pour parcourir la base |

## 🐳 Déploiement

Le `Dockerfile` construit l'application en deux étapes. Au démarrage, le conteneur applique les migrations Prisma (`prisma migrate deploy`) puis lance Next.js sur le port 3000.

Variables d'environnement à définir sur l'application (Dokploy) :

| Variable | Rôle |
|---|---|
| `DATABASE_URL` | connexion PostgreSQL |
| `NEXTAUTH_SECRET` | secret de signature des sessions (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | URL publique du site |

Chaque push sur `main` déclenche le build du `Dockerfile` par Dokploy. La CI GitHub Actions (`.github/workflows/ci.yml`) vérifie en parallèle les types, le lint et le build, sans rien déployer.

Pour tester l'image en local :

```bash
docker build -t portfolio .
docker run -p 3000:3000 --env-file .env.local portfolio
```

## 🗂️ Structure

```
app/            pages (App Router) : [locale]/ pour le site, admin/ pour le back-office, api/
actions/        Server Actions (lecture, réactions, admin)
components/     composants (sections, cartes, admin, runner WebAssembly)
content/        fiches MDX des projets et des articles, par langue
lib/            auth, Prisma, utilitaires MDX, runner WebAssembly
messages/       traductions (fr.json, en.json)
prisma/         schéma et migrations
public/wasm/    programmes C / C++ compilés en WebAssembly
scripts/        synchronisation des projets, compte admin, compilation WebAssembly
```

## 👤 Auteur

**Daniel Akim**, développeur web & IA basé à Cergy-Pontoise.

[Mon profil GitHub](https://github.com/DanielAkim2000)
