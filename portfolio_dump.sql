--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Homebrew)
-- Dumped by pg_dump version 14.15 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ReactionType; Type: TYPE; Schema: public; Owner: postgres_portfolio
--

CREATE TYPE public."ReactionType" AS ENUM (
    'CLAPPING',
    'THINKING',
    'AMAZED'
);


ALTER TYPE public."ReactionType" OWNER TO postgres_portfolio;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Blog; Type: TABLE; Schema: public; Owner: postgres_portfolio
--

CREATE TABLE public."Blog" (
    id text NOT NULL,
    images text[],
    pinned boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "nbShares" integer DEFAULT 0 NOT NULL,
    views integer DEFAULT 0 NOT NULL,
    location text NOT NULL
);


ALTER TABLE public."Blog" OWNER TO postgres_portfolio;

--
-- Name: Content; Type: TABLE; Schema: public; Owner: postgres_portfolio
--

CREATE TABLE public."Content" (
    id text NOT NULL,
    locale text NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "tilId" text,
    "projectId" text
);


ALTER TABLE public."Content" OWNER TO postgres_portfolio;

--
-- Name: Project; Type: TABLE; Schema: public; Owner: postgres_portfolio
--

CREATE TABLE public."Project" (
    id text NOT NULL,
    link text,
    images text[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "nbShares" integer DEFAULT 0 NOT NULL,
    "githubLink" text[],
    views integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."Project" OWNER TO postgres_portfolio;

--
-- Name: Reaction; Type: TABLE; Schema: public; Owner: postgres_portfolio
--

CREATE TABLE public."Reaction" (
    id text NOT NULL,
    type public."ReactionType" NOT NULL,
    "sessionId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "projectId" text,
    "blogId" text
);


ALTER TABLE public."Reaction" OWNER TO postgres_portfolio;

--
-- Name: Til; Type: TABLE; Schema: public; Owner: postgres_portfolio
--

CREATE TABLE public."Til" (
    id text NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    tags text[],
    "linkDoc" text,
    code text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    language text DEFAULT 'ts'::text NOT NULL
);


ALTER TABLE public."Til" OWNER TO postgres_portfolio;

--
-- Name: Title; Type: TABLE; Schema: public; Owner: postgres_portfolio
--

CREATE TABLE public."Title" (
    id text NOT NULL,
    locale text NOT NULL,
    title text NOT NULL,
    subtitle text,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "projectId" text,
    "blogId" text,
    "tilId" text
);


ALTER TABLE public."Title" OWNER TO postgres_portfolio;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres_portfolio
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres_portfolio;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres_portfolio
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres_portfolio;

--
-- Data for Name: Blog; Type: TABLE DATA; Schema: public; Owner: postgres_portfolio
--

COPY public."Blog" (id, images, pinned, "createdAt", "updatedAt", "nbShares", views, location) FROM stdin;
4ab8f729-93e7-4ab3-9486-00e92f4d1655	{}	t	2025-05-06 05:26:06.087	2025-05-08 08:04:37.875	0	0	France
6f24aaa9-47f1-4417-863b-e2bc96f7917a	{https://example.com/images/nestjs-auth-api.jpg}	f	2025-05-06 09:41:36.816	2025-05-08 08:04:37.875	0	0	France
acb8bd89-1710-4b18-98d6-d4872f77da0a	{https://example.com/images/nextjs-auth-profile.jpg}	f	2025-05-06 09:02:52.493	2025-05-08 08:04:37.875	0	0	France
\.


--
-- Data for Name: Content; Type: TABLE DATA; Schema: public; Owner: postgres_portfolio
--

COPY public."Content" (id, locale, content, "createdAt", "updatedAt", "tilId", "projectId") FROM stdin;
1e8f2dbb-a6ad-4063-84e9-6af3d2934dc5	en	Bonwazadiler is a clone of the popular French marketplace Le Bon Coin that I developed to improve my full-stack development skills. The project uses Next.js for the front-end and Express.js for the back-end. The main features include multi-provider authentication, listing creation and search, image uploading, and a messaging system between users.	2025-05-05 10:07:05.471	2025-05-05 10:06:11.005	\N	d5d6393f-3156-417f-8511-7081d27c838a
777f6a4f-355d-471d-b5e3-9c060769fa73	fr	Bonwazadiler est un clone du site populaire Le Bon Coin que j'ai développé pour améliorer mes compétences en développement full-stack. Le projet utilise Next.js pour le front-end et Express.js pour le back-end. Les fonctionnalités principales incluent l'authentification multi-provider, la création et la recherche d'annonces, le téléchargement d'images et un système de messagerie entre utilisateurs.	2025-05-05 10:07:05.471	2025-05-05 10:50:40.595	\N	d5d6393f-3156-417f-8511-7081d27c838a
e685f107-5c7b-4516-8a57-abdb22bbc12e	fr	Matunda est une application mobile native conçue pour les amateurs de trading et d''investissement. Elle permet de consulter les cours des actions et indices en temps réel, de créer des listes de suivi personnalisées, et d''effectuer des transactions virtuelles. Développée avec Expo pour le front-end et NestJS pour le back-end, l''application se distingue par son interface intuitive et ses fonctionnalités avancées d''analyse de marché.	2025-05-05 11:07:26.079	2025-05-05 11:05:57.472	\N	28d1de6f-825a-4042-8a58-1eb005d366fd
ed361286-e192-4b51-ad4a-ba4acd523c98	en	Matunda is a native mobile application designed for trading and investment enthusiasts. It allows users to consult stock and index prices in real-time, create custom watchlists, and perform virtual transactions. Developed with Expo for the front-end and NestJS for the back-end, the application stands out for its intuitive interface and advanced market analysis features.	2025-05-05 11:07:26.079	2025-05-05 11:05:57.978	\N	28d1de6f-825a-4042-8a58-1eb005d366fd
20180bfd-5fb9-4e6c-b2a7-6f9efe9efe61	fr	Ce projet consistait à développer un site web personnalisé pour un artiste des beaux-arts à partir d''une maquette fournie par le client. Bien que WordPress ne soit pas ma spécialité principale, j''ai relevé le défi en utilisant Elementor pour créer une mise en page complexe et artistique, tout en ajoutant des fonctionnalités personnalisées en JavaScript. Le site comprend des galeries d''œuvres responsives, une biographie interactive, et diverses optimisations pour les médias et la sécurité.	2025-05-05 11:29:33.099	2025-05-05 11:28:52.167	\N	54296c1d-a6a4-4293-8517-44a46a608850
4e635cde-cf3b-49e3-8413-d15c919002aa	en	This project involved developing a custom website for a fine arts artist based on a mockup provided by the client. Although WordPress is not my main specialty, I took on the challenge using Elementor to create a complex and artistic layout, while adding custom JavaScript functionalities. The site includes responsive artwork galleries, an interactive biography, and various optimizations for media and security.	2025-05-05 11:29:33.099	2025-05-05 11:28:58.677	\N	54296c1d-a6a4-4293-8517-44a46a608850
7b14c55d-f8b4-4e78-b2a2-c17220e9c6bb	en	Garage V. Parrot is a web application developed for my final study project. It allows an automotive garage to present its services, display used vehicles for sale, and manage customer reviews. The administration section offers different access levels (administrator and employee) with specific permissions. The front-end is developed in React.js, while the back-end uses Symfony and PHP with JWT authentication. Images are hosted on Amazon S3 to optimize performance.	2025-05-05 11:50:13.402	2025-05-05 11:50:35.447	\N	9d53126f-510d-4c3a-92ce-0ad79e187f0b
2e301a5c-6863-446b-8e1c-3185a9df921f	fr	Garage V. Parrot est une application web développée pour mon projet de fin d''études. Elle permet à un garage automobile de présenter ses services, d''afficher des véhicules d''occasion à vendre, et de gérer les avis clients. La partie administration offre différents niveaux d''accès (administrateur et employé) avec des permissions spécifiques. Le front-end est développé en React.js, tandis que le back-end utilise Symfony et PHP avec authentification JWT. Les images sont hébergées sur Amazon S3 pour optimiser les performances.	2025-05-05 11:50:13.402	2025-05-05 11:50:35.447	\N	9d53126f-510d-4c3a-92ce-0ad79e187f0b
601a24ec-b167-4ed1-8489-6746f26527cc	fr	Ce projet de réseau social a été développé avec React Vite pour le front-end et Express.js pour le back-end. L'application offre toutes les fonctionnalités essentielles d'un réseau social moderne : partage de photos et vidéos, système de likes et commentaires, gestion des relations d'amitié, et notifications en temps réel. Ce projet m'a permis d'apprendre à utiliser Redux et Zustand pour la gestion d'état avancée et d'approfondir mes connaissances en développement d'API avec Express.js.	2025-05-05 12:04:18.042	2025-05-05 12:03:00.404	\N	a269cc10-4f94-47e8-a663-4a5ca1acbfb2
491f21bf-75d9-4861-9ed2-cbd5c4e2e2d3	en	This social network project was developed with React Vite for the front-end and Express.js for the back-end. The application offers all the essential features of a modern social network: photo and video sharing, like and comment system, friendship relationship management, and real-time notifications. This project allowed me to learn how to use Redux and Zustand for advanced state management and to deepen my knowledge in API development with Express.js.	2025-05-05 12:04:18.042	2025-05-05 12:03:00.909	\N	a269cc10-4f94-47e8-a663-4a5ca1acbfb2
652f1a43-de41-4b14-9479-7988abd78b33	fr	Ce projet a été développé entièrement en PHP pur sans utiliser de framework, dans le cadre de ma formation pour comprendre les mécanismes sous-jacents des frameworks web. Il s'agit d'un système de gestion pour le KGB permettant d''administrer les missions, les agents et les planques. Le front-end utilise HTML, CSS et JavaScript vanilla avec des fonctionnalités de filtrage dynamique et des requêtes asynchrones. Le back-end implémente manuellement une architecture MVC, un système de routage personnalisé et une gestion sécurisée des sessions.	2025-05-05 12:17:59.291	2025-05-05 12:16:49.039	\N	bd996611-034d-4bf3-af14-bb7c93c8b85e
efe7877b-51ff-4d92-a7b4-d107e236d4b1	en	This project was developed entirely in pure PHP without using any framework, as part of my training to understand the underlying mechanisms of web frameworks. It is a management system for the KGB allowing to administer missions, agents, and safehouses. The front-end uses HTML, CSS, and vanilla JavaScript with dynamic filtering capabilities and asynchronous requests. The back-end manually implements an MVC architecture, a custom routing system, and secure session management.	2025-05-05 12:17:59.291	2025-05-05 12:16:49.642	\N	bd996611-034d-4bf3-af14-bb7c93c8b85e
45c73792-d1b0-4fa0-b344-2a486ff91b05	fr	## Pourquoi utiliser createEntityAdapter?\n\n`createEntityAdapter` est un outil essentiel de Redux Toolkit qui simplifie la gestion des données normalisées dans votre store Redux. Lorsque vous travaillez avec des collections d'objets (comme des utilisateurs, des articles, des commentaires), normaliser ces données est une pratique recommandée.\n\n### Avantages principaux:\n\n- **Structure cohérente**: Format standardisé `{ ids: [], entities: {} }` pour toutes vos entités\n- **Fonctions CRUD prêtes à l'emploi**: Ajout, mise à jour, suppression sans boilerplate\n- **Sélecteurs performants**: Accès optimisé aux données avec mémorisation\n- **Support d'Immer**: Syntaxe de mutation sécurisée\n- **Tri automatique**: Conservation de l'ordre des éléments\n\n## Structure des données\n\nL'adaptateur d'entités stocke vos données dans un format normalisé:\n\n```js\n{\n  // Les IDs uniques de chaque élément (doivent être des chaînes ou des nombres)\n  ids: ["a", "b", "c"],\n  // Une table de correspondance entre les IDs et les objets d'entité\n  entities: {\n    "a": { id: "a", title: "Premier livre" },\n    "b": { id: "b", title: "Deuxième livre" },\n    "c": { id: "c", title: "Troisième livre" }\n  },\n  // Vous pouvez ajouter vos propres champs supplémentaires\n  loading: "idle"\n}\n```\n\n## Fonctions CRUD\n\n`createEntityAdapter` génère automatiquement des fonctions pour manipuler vos données:\n\n```js\n// Ajouter des éléments\nadapter.addOne(state, entity)\nadapter.addMany(state, entities)\n\n// Mettre à jour des éléments\nadapter.updateOne(state, { id, changes })\nadapter.updateMany(state, updates)\n\n// Manipuler l'ensemble\nadapter.setAll(state, entities)\nadapter.removeOne(state, id)\nadapter.removeMany(state, ids)\nadapter.removeAll(state)\n```\n\n## Utilisation avec createSlice\n\nL'intégration avec `createSlice` est particulièrement élégante:\n\n```js\n// Vous pouvez utiliser les fonctions de l'adaptateur directement comme réducteurs\nbookAdded: booksAdapter.addOne,\n\n// Ou les appeler dans vos propres réducteurs\nbooksReceived(state, action) {\n  booksAdapter.setAll(state, action.payload.books);\n  state.loading = 'idle';\n}\n```\n\nCette approche réduit considérablement le code répétitif tout en maintenant une structure de données optimale.	2025-05-06 10:33:06.308	2025-05-06 10:33:06.308	f4fb469f-c3e2-4b98-8d82-98a3eff69138	\N
b108f371-8f6e-4562-b371-3a55c53bcf7c	en	## Why use createEntityAdapter?\n\n`createEntityAdapter` is an essential Redux Toolkit utility that simplifies managing normalized data in your Redux store. When working with collections of objects (like users, articles, comments), normalizing this data is a recommended practice.\n\n### Key benefits:\n\n- **Consistent structure**: Standardized `{ ids: [], entities: {} }` format for all your entities\n- **Ready-to-use CRUD functions**: Add, update, delete without boilerplate\n- **Performant selectors**: Optimized data access with memoization\n- **Immer support**: Safe mutation syntax\n- **Automatic sorting**: Maintain item order\n\n## Data structure\n\nThe entity adapter stores your data in a normalized format:\n\n```js\n{\n  // Unique IDs of each item (must be strings or numbers)\n  ids: ["a", "b", "c"],\n  // A lookup table mapping IDs to entity objects\n  entities: {\n    "a": { id: "a", title: "First book" },\n    "b": { id: "b", title: "Second book" },\n    "c": { id: "c", title: "Third book" }\n  },\n  // You can add your own additional fields\n  loading: "idle"\n}\n```\n\n## CRUD Functions\n\n`createEntityAdapter` automatically generates functions to manipulate your data:\n\n```js\n// Add items\nadapter.addOne(state, entity)\nadapter.addMany(state, entities)\n\n// Update items\nadapter.updateOne(state, { id, changes })\nadapter.updateMany(state, updates)\n\n// Manipulate the whole set\nadapter.setAll(state, entities)\nadapter.removeOne(state, id)\nadapter.removeMany(state, ids)\nadapter.removeAll(state)\n```\n\n## Usage with createSlice\n\nIntegration with `createSlice` is particularly elegant:\n\n```js\n// You can use adapter functions directly as reducers\nbookAdded: booksAdapter.addOne,\n\n// Or call them in your own reducers\nbooksReceived(state, action) {\n  booksAdapter.setAll(state, action.payload.books);\n  state.loading = 'idle';\n}\n```\n\nThis approach significantly reduces repetitive code while maintaining an optimal data structure.	2025-05-06 10:33:06.325	2025-05-06 10:33:06.325	f4fb469f-c3e2-4b98-8d82-98a3eff69138	\N
dbcfcc94-a246-438b-8898-6bf075d8940d	fr	## Les décorateurs personnalisés dans NestJS\n\nNestJS est un framework Node.js qui utilise abondamment les décorateurs TypeScript pour simplifier la configuration et le développement. Les décorateurs permettent d'ajouter des métadonnées aux classes et méthodes, ce qui est particulièrement utile pour l'authentification et l'autorisation.\n\n### Pourquoi utiliser des décorateurs composites?\n\n- **Réutilisabilité**: Évitez la répétition de code en combinant plusieurs comportements\n- **Lisibilité**: Simplifiez le code des contrôleurs pour le rendre plus expressif\n- **Modularité**: Séparez les préoccupations et facilitez la maintenance\n- **Extensibilité**: Ajoutez facilement de nouvelles fonctionnalités sans modifier le code existant\n\n## Création d'un décorateur d'authentification avec rôles\n\nPour créer un système d'authentification basé sur les rôles, nous avons besoin de:\n\n1. Un décorateur `Roles` pour définir les rôles requis\n2. Une garde `RolesGuard` qui vérifie si l'utilisateur a les rôles nécessaires\n3. Un décorateur composite `Auth` qui combine les deux\n\n### Le décorateur Roles\n\n```typescript\nexport const ROLES_KEY = 'roles';\nexport const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);\n```\n\nCe décorateur utilise `SetMetadata` pour attacher les rôles requis à la méthode ou à la classe.\n\n### La garde RolesGuard\n\n```typescript\nexport class RolesGuard {\n  constructor(private reflector: Reflector) {}\n\n  canActivate(context: ExecutionContext): boolean {\n    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [\n      context.getHandler(),\n      context.getClass(),\n    ]);\n\n    if (!requiredRoles) return true;\n\n    const { user } = context.switchToHttp().getRequest();\n    return requiredRoles.some((role) => user.roles?.includes(role));\n  }\n}\n```\n\nLa garde utilise `Reflector` pour récupérer les métadonnées et vérifier si l'utilisateur a les rôles nécessaires.\n\n### Le décorateur composite Auth avec applyDecorators\n\n```typescript\nexport function Auth(...roles: UserRole[]) {\n  const decorators = [\n    UseGuards(JwtAuthGuard, RolesGuard),\n    ApiBearerAuth('JWT'),\n    ApiUnauthorizedResponse({ description: 'Non autorisé' }),\n  ];\n\n  // Si des rôles sont spécifiés, ajouter le décorateur de rôles\n  if (roles.length > 0) {\n    decorators.push(Roles(...roles));\n  }\n\n  return applyDecorators(...decorators);\n}\n```\n\nCette version améliorée utilise `applyDecorators` de NestJS pour combiner plusieurs décorateurs de manière élégante:\n- Elle active automatiquement les gardes nécessaires\n- Elle ajoute les annotations Swagger pour la documentation API\n- Elle applique conditionnellement le décorateur de rôles\n\n## Utilisation dans un contrôleur\n\n```typescript\n@Controller('users')\nexport class UsersController {\n  @Get()\n  @Auth(UserRole.ADMIN) // Seuls les admins authentifiés peuvent accéder\n  findAll() {\n    return [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];\n  }\n\n  @Get(':id')\n  @Auth() // Tous les utilisateurs authentifiés peuvent accéder\n  findOne(@Param('id') id: string) {\n    return { id: 1, name: 'John' };\n  }\n}\n```\n\nCette approche simplifie considérablement la sécurisation des endpoints en combinant plusieurs aspects de sécurité en un seul décorateur.	2025-05-06 12:06:45.236	2025-05-06 12:06:45.236	66003b35-360c-4464-b341-fdf4b6424c36	\N
aaec1872-0f78-4159-af0e-c077c312d0da	en	## Custom decorators in NestJS\n\nNestJS is a Node.js framework that heavily uses TypeScript decorators to simplify configuration and development. Decorators allow you to add metadata to classes and methods, which is particularly useful for authentication and authorization.\n\n### Why use composite decorators?\n\n- **Reusability**: Avoid code repetition by combining multiple behaviors\n- **Readability**: Simplify controller code to make it more expressive\n- **Modularity**: Separate concerns and facilitate maintenance\n- **Extensibility**: Easily add new features without modifying existing code\n\n## Creating a role-based authentication decorator\n\nTo create a role-based authentication system, we need:\n\n1. A `Roles` decorator to define required roles\n2. A `RolesGuard` that checks if the user has the necessary roles\n3. A composite `Auth` decorator that combines both\n\n### The Roles decorator\n\n```typescript\nexport const ROLES_KEY = 'roles';\nexport const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);\n```\n\nThis decorator uses `SetMetadata` to attach the required roles to the method or class.\n\n### The RolesGuard\n\n```typescript\nexport class RolesGuard {\n  constructor(private reflector: Reflector) {}\n\n  canActivate(context: ExecutionContext): boolean {\n    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [\n      context.getHandler(),\n      context.getClass(),\n    ]);\n\n    if (!requiredRoles) return true;\n\n    const { user } = context.switchToHttp().getRequest();\n    return requiredRoles.some((role) => user.roles?.includes(role));\n  }\n}\n```\n\nThe guard uses `Reflector` to retrieve metadata and check if the user has the necessary roles.\n\n### The composite Auth decorator with applyDecorators\n\n```typescript\nexport function Auth(...roles: UserRole[]) {\n  const decorators = [\n    UseGuards(JwtAuthGuard, RolesGuard),\n    ApiBearerAuth('JWT'),\n    ApiUnauthorizedResponse({ description: 'Unauthorized' }),\n  ];\n\n  // If roles are specified, add the roles decorator\n  if (roles.length > 0) {\n    decorators.push(Roles(...roles));\n  }\n\n  return applyDecorators(...decorators);\n}\n```\n\nThis improved version uses NestJS's `applyDecorators` to elegantly combine multiple decorators:\n- It automatically activates the necessary guards\n- It adds Swagger annotations for API documentation\n- It conditionally applies the roles decorator\n\n## Usage in a controller\n\n```typescript\n@Controller('users')\nexport class UsersController {\n  @Get()\n  @Auth(UserRole.ADMIN) // Only authenticated admins can access\n  findAll() {\n    return [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];\n  }\n\n  @Get(':id')\n  @Auth() // All authenticated users can access\n  findOne(@Param('id') id: string) {\n    return { id: 1, name: 'John' };\n  }\n}\n```\n\nThis approach greatly simplifies securing endpoints by combining multiple security aspects into a single decorator.	2025-05-06 12:06:45.242	2025-05-06 12:06:45.242	66003b35-360c-4464-b341-fdf4b6424c36	\N
90bbd3a6-710b-4a21-86e9-d760408f41b9	fr	## Les splash screens dans Expo\n\nLes splash screens sont les écrans affichés lors du chargement initial d'une application mobile. Ils jouent un rôle crucial dans l'expérience utilisateur en créant une transition fluide entre le moment où l'utilisateur lance l'application et le moment où l'interface principale apparaît.\n\n### Pourquoi optimiser le splash screen?\n\n- **Première impression**: C'est le premier contact visuel de l'utilisateur avec votre application\n- **Perception de vitesse**: Réduire la sensation d'attente même si le chargement reste identique\n- **Branding**: Opportunité d'afficher votre logo et identité visuelle\n- **Continuité**: Créer une transition fluide vers l'UI principale\n\n## Configuration du splash screen dans Expo\n\nExpo simplifie grandement la gestion des splash screens avec le package `expo-splash-screen`. Voici comment procéder:\n\n### 1. Configuration dans app.json\n\n```json\n{\n  "expo": {\n    "splash": {\n      "image": "./assets/splash.png",\n      "resizeMode": "contain",\n      "backgroundColor": "#ffffff"\n    }\n  }\n}\n```\n\nCette configuration de base permet d'afficher une image sur un fond blanc pendant le chargement natif de l'application.\n\n### 2. Contrôler le splash screen depuis le code\n\nL'étape suivante consiste à prendre le contrôle du splash screen pour le maintenir visible pendant que vous préchargez vos ressources:\n\n```typescript\nimport * as SplashScreen from 'expo-splash-screen';\n\n// Empêcher la fermeture automatique du splash screen\nSplashScreen.preventAutoHideAsync();\n```\n\nCette ligne empêche Expo de masquer automatiquement le splash screen dès que le bundle JavaScript est chargé.\n\n### 3. Préchargement des ressources\n\nPendant que le splash screen est affiché, préchargez les ressources essentielles:\n\n```typescript\nasync function prepare() {\n  try {\n    // Préchargement des polices\n    await Font.loadAsync({\n      'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),\n    });\n\n    // Préchargement des images\n    await Asset.loadAsync([\n      require('./assets/images/logo.png'),\n    ]);\n  } catch (e) {\n    console.warn(e);\n  } finally {\n    setAppIsReady(true);\n  }\n}\n```\n\n### 4. Masquer le splash screen au bon moment\n\nUne fois les ressources chargées, vous pouvez masquer le splash screen lorsque votre UI est prête à être affichée:\n\n```typescript\nconst onLayoutRootView = useCallback(async () => {\n  if (appIsReady) {\n    await SplashScreen.hideAsync();\n  }\n}, [appIsReady]);\n\nreturn (\n  <View style={styles.container} onLayout={onLayoutRootView}>\n    {/* Contenu de l'application */}\n  </View>\n);\n```\n\nL'utilisation de `onLayout` garantit que l'UI est entièrement rendue avant que le splash screen ne disparaisse.\n\n## Conseils avancés\n\n- **Animation de transition**: Créez une animation qui reprend des éléments du splash screen pour une transition fluide\n- **Placeholder UI**: Affichez une UI simplifiée pendant que les données sont chargées\n- **Cohérence visuelle**: Assurez-vous que le splash screen reflète le design de votre application\n- **Tests sur différents appareils**: Les temps de chargement varient selon les appareils\n\nEn optimisant votre splash screen, vous améliorez non seulement la perception de performance de votre application, mais vous créez également une expérience plus professionnelle et soignée pour vos utilisateurs.	2025-05-06 12:56:48.112	2025-05-06 12:56:48.112	d2e3ae32-6805-403f-95a0-adb072424891	\N
ef1d001c-286e-4730-a54f-a19688a28d60	en	## Splash screens in Expo\n\nSplash screens are the screens displayed during the initial loading of a mobile application. They play a crucial role in the user experience by creating a smooth transition between the moment the user launches the application and when the main interface appears.\n\n### Why optimize the splash screen?\n\n- **First impression**: It's the user's first visual contact with your application\n- **Perception of speed**: Reduce the feeling of waiting even if the loading time remains the same\n- **Branding**: Opportunity to display your logo and visual identity\n- **Continuity**: Create a smooth transition to the main UI\n\n## Configuring splash screens in Expo\n\nExpo greatly simplifies splash screen management with the `expo-splash-screen` package. Here's how to proceed:\n\n### 1. Configuration in app.json\n\n```json\n{\n  "expo": {\n    "splash": {\n      "image": "./assets/splash.png",\n      "resizeMode": "contain",\n      "backgroundColor": "#ffffff"\n    }\n  }\n}\n```\n\nThis basic configuration displays an image on a white background during the native loading of the application.\n\n### 2. Control the splash screen from code\n\nThe next step is to take control of the splash screen to keep it visible while you preload your resources:\n\n```typescript\nimport * as SplashScreen from 'expo-splash-screen';\n\n// Prevent the splash screen from auto-hiding\nSplashScreen.preventAutoHideAsync();\n```\n\nThis line prevents Expo from automatically hiding the splash screen as soon as the JavaScript bundle is loaded.\n\n### 3. Preloading resources\n\nWhile the splash screen is displayed, preload the essential resources:\n\n```typescript\nasync function prepare() {\n  try {\n    // Preloading fonts\n    await Font.loadAsync({\n      'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),\n    });\n\n    // Preloading images\n    await Asset.loadAsync([\n      require('./assets/images/logo.png'),\n    ]);\n  } catch (e) {\n    console.warn(e);\n  } finally {\n    setAppIsReady(true);\n  }\n}\n```\n\n### 4. Hide the splash screen at the right time\n\nOnce the resources are loaded, you can hide the splash screen when your UI is ready to be displayed:\n\n```typescript\nconst onLayoutRootView = useCallback(async () => {\n  if (appIsReady) {\n    await SplashScreen.hideAsync();\n  }\n}, [appIsReady]);\n\nreturn (\n  <View style={styles.container} onLayout={onLayoutRootView}>\n    {/* Application content */}\n  </View>\n);\n```\n\nUsing `onLayout` ensures that the UI is fully rendered before the splash screen disappears.\n\n## Advanced tips\n\n- **Transition animation**: Create an animation that incorporates elements from the splash screen for a smooth transition\n- **Placeholder UI**: Display a simplified UI while data is loading\n- **Visual consistency**: Ensure the splash screen reflects your application's design\n- **Testing on different devices**: Loading times vary across devices\n\nBy optimizing your splash screen, you not only improve the perceived performance of your application but also create a more professional and polished experience for your users.	2025-05-06 12:56:48.119	2025-05-06 12:56:48.119	d2e3ae32-6805-403f-95a0-adb072424891	\N
\.


--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: postgres_portfolio
--

COPY public."Project" (id, link, images, "createdAt", "updatedAt", "nbShares", "githubLink", views) FROM stdin;
d5d6393f-3156-417f-8511-7081d27c838a	\N	{}	2025-05-05 10:03:03.792	2025-05-08 11:40:41.632	0	{https://github.com/DanielAkim2000/backbonwaz.git,https://github.com/DanielAkim2000/Bonwazadiler.git}	0
54296c1d-a6a4-4293-8517-44a46a608850	https://pobalu.com	{}	2025-05-05 11:20:35.252	2025-05-08 11:40:41.632	0	\N	0
28d1de6f-825a-4042-8a58-1eb005d366fd	https://expo.dev/preview/update?message=Am%C3%A9lioration%20de%20la%20gestion%20des%20actifs%20et%20des%20composants%20d'interface%20utilisateur%20%3A%20ajout%20de%20v%C3%A9rifications%20de%20s%C3%A9curit%C3%A9%20pour%20les%20do&updateRuntimeVersion=1.0.0&createdAt=2025-05-04T03%3A38%3A27.123Z&slug=exp&projectId=13ef8c37-72f2-4273-bcb7-a232c8857c0c&group=734df3db-a880-41dd-bb97-258e60782bfc	{}	2025-05-05 10:59:34.566	2025-05-08 11:44:44.503	0	{}	0
a269cc10-4f94-47e8-a663-4a5ca1acbfb2	\N	{}	2025-05-05 11:47:17.734	2025-05-08 11:51:29.223	0	{https://github.com/DanielAkim2000/ReseauxSocialProjet.git}	1
9d53126f-510d-4c3a-92ce-0ad79e187f0b	\N	{}	2025-05-05 11:47:34.582	2025-05-08 11:34:31.021	0	{https://github.com/DanielAkim2000/GarageParrotBackEnd.git,https://github.com/DanielAkim2000/GarageParrotFrontEnd.git}	0
bd996611-034d-4bf3-af14-bb7c93c8b85e	\N	{}	2025-05-05 12:14:27.595	2025-05-08 11:40:41.632	0	{https://github.com/DanielAkim2000/ProjetPhpPOO.git}	0
\.


--
-- Data for Name: Reaction; Type: TABLE DATA; Schema: public; Owner: postgres_portfolio
--

COPY public."Reaction" (id, type, "sessionId", "createdAt", "updatedAt", "projectId", "blogId") FROM stdin;
\.


--
-- Data for Name: Til; Type: TABLE DATA; Schema: public; Owner: postgres_portfolio
--

COPY public."Til" (id, date, tags, "linkDoc", code, "createdAt", "updatedAt", language) FROM stdin;
f4fb469f-c3e2-4b98-8d82-98a3eff69138	2025-05-06 10:33:06.23	{Redux,"Redux Toolkit",EntityAdapter,Normalisation,"State Management"}	https://redux-toolkit.js.org/api/createEntityAdapter	import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';\n\n// Créer un adaptateur d'entités pour nos livres\nconst booksAdapter = createEntityAdapter({\n  // Configurer une fonction selectId personnalisée (optionnel)\n  selectId: (book) => book.bookId,\n  // Définir un comparateur pour trier automatiquement l'état (optionnel)\n  sortComparer: (a, b) => a.title.localeCompare(b.title),\n});\n\n// Créer un slice avec l'état initial de l'adaptateur\nconst booksSlice = createSlice({\n  name: 'books',\n  initialState: booksAdapter.getInitialState({\n    loading: 'idle',\n  }),\n  reducers: {\n    // Utiliser les fonctions de l'adaptateur directement comme réducteurs\n    bookAdded: booksAdapter.addOne,\n    booksReceived(state, action) {\n      booksAdapter.setAll(state, action.payload.books);\n      state.loading = 'idle';\n    },\n  },\n});\n\n// Obtenir les sélecteurs pour accéder aux données\nconst booksSelectors = booksAdapter.getSelectors((state) => state.books);	2025-05-06 10:33:06.23	2025-05-06 10:33:06.23	ts
66003b35-360c-4464-b341-fdf4b6424c36	2025-04-29 00:00:00	{NestJS,Decorators,Authentication,Authorization,TypeScript}	https://docs.nestjs.com/custom-decorators	import { applyDecorators, UseGuards } from '@nestjs/common';\nimport { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';\nimport { JwtAuthGuard } from '../guards/jwt-auth.guard';\nimport { RolesGuard } from '../guards/roles.guard';\nimport { Roles } from './roles.decorator';\nimport { UserRole } from '@/modules/users/entities/user.entity';\n\n/**\n * Décorateur combiné pour gérer à la fois l'authentification JWT et les rôles.\n *\n * Exemples d'utilisation:\n * - @Auth() - Authentification uniquement\n * - @Auth(Role.ADMIN) - Authentification + rôle ADMIN requis\n * - @Auth(Role.ADMIN, Role.MODERATOR) - Authentification + rôle ADMIN ou MODERATOR requis\n */\nexport function Auth(...roles: UserRole[]) {\n  const decorators = [\n    UseGuards(JwtAuthGuard, RolesGuard),\n    ApiBearerAuth('JWT'),\n    ApiUnauthorizedResponse({ description: 'Non autorisé' }),\n  ];\n\n  // Si des rôles sont spécifiés, ajouter le décorateur de rôles\n  if (roles.length > 0) {\n    decorators.push(Roles(...roles));\n  }\n\n  return applyDecorators(...decorators);\n}\n\n// Exemple d'utilisation dans un contrôleur\n@Controller('users')\nexport class UsersController {\n  @Get()\n  @Auth(UserRole.ADMIN) // Seuls les admins authentifiés peuvent accéder\n  findAll() {\n    return [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];\n  }\n\n  @Get(':id')\n  @Auth() // Tous les utilisateurs authentifiés peuvent accéder\n  findOne(@Param('id') id: string) {\n    return { id: 1, name: 'John' };\n  }\n\n  @Post()\n  @Auth(UserRole.ADMIN, UserRole.MODERATOR) // Admins ou modérateurs\n  create(@Body() createUserDto: any) {\n    return { id: 2, name: 'Jane' };\n  }\n}	2025-05-06 12:06:45.205	2025-05-06 12:06:45.205	typescript
d2e3ae32-6805-403f-95a0-adb072424891	2025-05-06 00:00:00	{"React Native",Expo,Mobile,UI,"Splash Screen"}	https://docs.expo.dev/guides/splash-screens/	import { useCallback, useEffect, useState } from 'react';\nimport { StyleSheet, Text, View } from 'react-native';\nimport * as SplashScreen from 'expo-splash-screen';\nimport * as Font from 'expo-font';\nimport { Asset } from 'expo-asset';\n\n// Empêcher la fermeture automatique du splash screen\nSplashScreen.preventAutoHideAsync();\n\nexport default function App() {\n  const [appIsReady, setAppIsReady] = useState(false);\n\n  // Chargement des ressources avant de masquer le splash screen\n  useEffect(() => {\n    async function prepare() {\n      try {\n        // Préchargement des ressources nécessaires\n        await Font.loadAsync({\n          'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),\n          'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),\n        });\n\n        // Préchargement des images\n        await Asset.loadAsync([\n          require('./assets/images/logo.png'),\n          require('./assets/images/background.jpg'),\n        ]);\n\n        // Simuler un délai réseau\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      } catch (e) {\n        console.warn(e);\n      } finally {\n        // Indiquer que l'application est prête\n        setAppIsReady(true);\n      }\n    }\n\n    prepare();\n  }, []);\n\n  // Fonction pour masquer le splash screen\n  const onLayoutRootView = useCallback(async () => {\n    if (appIsReady) {\n      // Masquer le splash screen avec une animation\n      await SplashScreen.hideAsync();\n    }\n  }, [appIsReady]);\n\n  if (!appIsReady) {\n    return null;\n  }\n\n  return (\n    <View style={styles.container} onLayout={onLayoutRootView}>\n      <Text style={styles.text}>L'application est chargée!</Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    alignItems: 'center',\n    justifyContent: 'center',\n    backgroundColor: '#f5f5f5',\n  },\n  text: {\n    fontSize: 18,\n    fontFamily: 'Montserrat-Bold',\n  },\n});	2025-05-06 12:56:48.099	2025-05-06 12:56:48.099	typescript
\.


--
-- Data for Name: Title; Type: TABLE DATA; Schema: public; Owner: postgres_portfolio
--

COPY public."Title" (id, locale, title, subtitle, description, "createdAt", "updatedAt", "projectId", "blogId", "tilId") FROM stdin;
283eafb2-7cac-4c81-ad1d-5ff238b87d84	en	Creating an Autocomplete Search Component in React	Public API + debounce + accessibility	Practical guide to create a performant, accessible and optimized search component in React with TypeScript	2025-05-06 05:29:37.663	2025-05-06 05:26:14.629	\N	4ab8f729-93e7-4ab3-9486-00e92f4d1655	\N
38fd09bd-e82c-49b9-8be8-95687614eeeb	fr	Créer une page de profil utilisateur avec authentification protégée dans Next.js (App Router + Middleware + API Route)	Apprenez à créer un système d'authentification complet avec Next.js	Un guide étape par étape pour mettre en place une page de profil utilisateur entièrement protégée dans une application Next.js en utilisant l'App Router, les Middleware et les API Routes.	2025-05-06 09:02:52.538	2025-05-06 09:02:52.538	\N	acb8bd89-1710-4b18-98d6-d4872f77da0a	\N
9450dfad-a783-4592-b253-cc1d4d779bf3	fr	Bonwazadiler	Clone du Bon Coin	Un projet full-stack utilisant Next.js et Express qui reproduit les fonctionnalités principales du Bon Coin	2025-05-05 10:05:37.557	2025-05-05 10:39:03.845	d5d6393f-3156-417f-8511-7081d27c838a	\N	\N
95d4b6ac-7e37-422c-a24b-114fd7e66b00	en	Bonwazadiler	Le Bon Coin clone	A full-stack project using Next.js and Express that replicates the main features of the French marketplace Le Bon Coin	2025-05-05 10:05:37.557	2025-05-05 10:39:03.845	d5d6393f-3156-417f-8511-7081d27c838a	\N	\N
d577d916-eb4e-4c95-bd9e-bd7f818e4f24	en	Matunda	Mobile application for stock market consultation and trading	A mobile application developed with Expo and NestJS to track stock prices, create watchlists and view financial news	2025-05-05 11:01:42.824	2025-05-05 11:00:00.682	28d1de6f-825a-4042-8a58-1eb005d366fd	\N	\N
5c5c2e2e-6db4-4d48-992a-51663e4491b5	fr	Matunda	Application mobile de consultation et trading boursier	Une application mobile développée avec Expo et NestJS pour suivre les cours des actions, créer des listes de suivi et consulter les actualités financières	2025-05-05 11:01:42.824	2025-05-05 11:10:23.774	28d1de6f-825a-4042-8a58-1eb005d366fd	\N	\N
81aa4643-395a-4058-add4-6a5df89ddc38	en	Creating a Protected User Profile Page with Authentication in Next.js (App Router + Middleware + API Route)	Learn how to create a complete authentication system with Next.js	A step-by-step guide to setting up a fully protected user profile page in a Next.js application using App Router, Middleware, and API Routes.	2025-05-06 09:02:52.549	2025-05-06 09:02:52.549	\N	acb8bd89-1710-4b18-98d6-d4872f77da0a	\N
1ddddf1e-072f-4256-9625-8a59547d776b	fr	Pobalu	Site WordPress personnalisé avec Elementor	Développement d'un site vitrine pour un artiste des beaux-arts selon une maquette précise, réalisé avec WordPress et Elementor	2025-05-05 11:23:21.511	2025-05-05 11:33:54.618	54296c1d-a6a4-4293-8517-44a46a608850	\N	\N
212fc562-b92f-4c77-9e60-3bc3936b6ef5	en	Pobalu	Custom WordPress site with Elementor	Development of a showcase website for a fine arts artist according to a precise mockup, created with WordPress and Elementor	2025-05-05 11:23:21.511	2025-05-05 11:33:54.618	54296c1d-a6a4-4293-8517-44a46a608850	\N	\N
d18fb345-b97c-4984-a964-82d2f685b10e	fr	Garage-V.Parrot	Application web complète pour un garage automobile	Projet de fin d''études : site vitrine et système d''administration pour un garage automobile, développé avec React.js et Symfony	2025-05-05 11:49:22.49	2025-05-05 11:47:54.387	9d53126f-510d-4c3a-92ce-0ad79e187f0b	\N	\N
a6587dec-a66a-4c47-bc47-06929d53bd3e	en	Garage-V.Parrot	Complete web application for an automotive garage	Final study project: showcase website and administration system for an automotive garage, developed with React.js and Symfony	2025-05-05 11:49:22.49	2025-05-05 11:47:57.555	9d53126f-510d-4c3a-92ce-0ad79e187f0b	\N	\N
83af3efb-f256-49be-9ac0-0bff1d068d33	en	Social-Network	Interactive social platform with React and Express	Social network application allowing content sharing, user interactions, and friendship relationship management	2025-05-05 12:02:28.464	2025-05-05 12:01:11.353	a269cc10-4f94-47e8-a663-4a5ca1acbfb2	\N	\N
86803985-8b79-4ed9-9f62-5058c2142878	fr	Reseau-Social	Plateforme sociale interactive avec React et Express	Application de réseau social permettant le partage de contenu, les interactions entre utilisateurs et la gestion des relations d'amitié	2025-05-05 12:02:28.464	2025-05-05 12:06:54.201	a269cc10-4f94-47e8-a663-4a5ca1acbfb2	\N	\N
b672e936-577b-45b4-87d9-af6d95efc2dd	fr	KGB	Application PHP pure sans framework	Système de gestion développé en PHP pur pour administrer les missions, agents et planques d'une agence de renseignement	2025-05-05 12:16:43.502	2025-05-05 12:15:14.781	bd996611-034d-4bf3-af14-bb7c93c8b85e	\N	\N
b21dd855-28a6-464c-853f-9946f203128c	en	KGB	Pure PHP application without framework	Management system developed in pure PHP to administer missions, agents, and safehouses of an intelligence agency	2025-05-05 12:16:43.502	2025-05-05 12:15:26.99	bd996611-034d-4bf3-af14-bb7c93c8b85e	\N	\N
a7dce6af-3b5b-40c9-bdf8-be64cf83f1c0	fr	Créer un composant de recherche avec autocomplétion en React	API publique + debounce + accessibilité	Guide pratique pour créer un composant de recherche performant, accessible et optimisé en React avec TypeScript	2025-05-06 05:29:37.663	2025-05-06 05:26:10.575	\N	4ab8f729-93e7-4ab3-9486-00e92f4d1655	\N
aceed164-ad9d-4b83-a3c4-50e644ab7bee	fr	Créer une API REST sécurisée avec NestJS, JWT et rôles utilisateur (Admin, User)	Apprenez à implémenter un système d'authentification et d'autorisation complet avec NestJS	Un guide complet pour créer une API REST sécurisée avec NestJS, en implémentant l'authentification JWT et un système de rôles utilisateur (Admin et User).	2025-05-06 09:41:36.831	2025-05-06 09:41:36.831	\N	6f24aaa9-47f1-4417-863b-e2bc96f7917a	\N
6f47c4a1-bba6-4960-a984-e7d6518216c3	en	Creating a Secure REST API with NestJS, JWT and User Roles (Admin, User)	Learn how to implement a complete authentication and authorization system with NestJS	A comprehensive guide to creating a secure REST API with NestJS, implementing JWT authentication and a user role system (Admin and User).	2025-05-06 09:41:36.835	2025-05-06 09:41:36.835	\N	6f24aaa9-47f1-4417-863b-e2bc96f7917a	\N
e38b0511-9bfd-4442-a46a-38a448206818	fr	NestJS: Création de décorateurs personnalisés composites pour l'authentification	Combiner plusieurs décorateurs pour créer un système d'authentification avec contrôle de rôles	\N	2025-05-06 12:06:45.232	2025-05-06 10:09:42.976	\N	\N	66003b35-360c-4464-b341-fdf4b6424c36
033b4860-ae70-4f4d-8e60-90444c88bbe4	en	NestJS: Creating composite custom decorators for authentication	Combining multiple decorators to create a role-based authentication system	\N	2025-05-06 12:06:45.232	2025-05-06 10:09:42.976	\N	\N	66003b35-360c-4464-b341-fdf4b6424c36
4a0c746c-fcdd-4155-9e73-9c57f47e43a1	fr	createEntityAdapter: Simplifier la gestion d'entités normalisées	Une API puissante pour manipuler des collections d'objets dans Redux	\N	2025-05-06 12:11:58.882	2025-05-06 10:14:09.525	\N	\N	f4fb469f-c3e2-4b98-8d82-98a3eff69138
d6e9d180-b822-4126-beee-757c5657568e	en	createEntityAdapter: Simplify normalized entity management	A powerful API for manipulating object collections in Redux	\N	2025-05-06 12:11:58.882	2025-05-06 10:14:09.525	\N	\N	f4fb469f-c3e2-4b98-8d82-98a3eff69138
6a09bd46-89a0-443b-94cc-23cc86eabf8d	fr	Expo: Créer des splash screens personnalisés avec préchargement des ressources	Optimiser l'expérience de démarrage de vos applications React Native	\N	2025-05-06 12:56:48.105	2025-05-06 12:56:48.105	\N	\N	d2e3ae32-6805-403f-95a0-adb072424891
4225be9a-943b-4e0b-b070-2e2c332ec6a5	en	Expo: Creating custom splash screens with resource preloading	Optimize the startup experience of your React Native applications	\N	2025-05-06 12:56:48.105	2025-05-06 12:56:48.105	\N	\N	d2e3ae32-6805-403f-95a0-adb072424891
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres_portfolio
--

COPY public."User" (id, email, password, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres_portfolio
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
4fc939af-c420-4774-8bd1-9e0e2c2d3509	cb2d8ba85d667b50c18baa4f642a1b574ba68a0bee8d7ad2281df6035e8a3475	2025-05-05 10:46:21.601082+02	20250505084621_init	\N	\N	2025-05-05 10:46:21.429151+02	1
3fd822ff-fb70-498d-a279-d1e2f81d9025	85b262f46e2e3a2ea2b0693b76ca4f35c6774147e6983decefc503bfecd98e0a	2025-05-05 13:27:06.446959+02	20250505112705_modification_pour_bien_inclure_les_relation	\N	\N	2025-05-05 13:27:06.354907+02	1
cf407147-1680-4e31-bf36-f34d79b406b9	48a058e2fe0d44f7bf790576c7776ba7d15327cf2148a1d7b9adb9bde558d906	2025-05-05 14:30:42.116537+02	20250505123041_ajout_du_nombre_de_share_dans_le_model_project	\N	\N	2025-05-05 14:30:42.059202+02	1
3ee9788a-c17b-4c35-9e6c-5d579dae3dac	0cdcb6bdfde3797067a5823e8662f02896344c42645be9c8cb51334fb3a58342	2025-05-05 14:44:40.18107+02	20250505124439_ajout_du_nombre_de_views_pour_les_projects_et_les_blog_ajout_du_nombre_de_shares_sur_le_blog_aussi	\N	\N	2025-05-05 14:44:40.154825+02	1
f1cadd22-e85e-4dae-86cd-62abae031964	aec86469811d0f9e3186c0503a8d826e34f780c20a5119455397292ffb8fc856	2025-05-06 01:37:38.33457+02	20250505233737_mise_a_jour_de_l_unicite_de_la_reaction_par_type_de_reaction_session_id_et_projectid	\N	\N	2025-05-06 01:37:38.22677+02	1
54e80f39-c07f-44c5-8489-cc6a2ded52e9	cffc4a81fad35de9ff25de48be19b37df83bbc756b727c06b9597f34c2d2ce6e	2025-05-06 07:05:59.587572+02	20250506050559_ajout_de_la_location_dans_les_blog	\N	\N	2025-05-06 07:05:59.486146+02	1
2cd1ddf0-102a-4578-b842-450f32f3bf2f	4ddcb67041affa2720ab6203d3fed0f9182e2d583445d7219768b2a5c2c58663	2025-05-06 11:07:16.27715+02	20250506090715_ajout_du_language_pour_til	\N	\N	2025-05-06 11:07:16.208056+02	1
c6de8674-50a6-4975-83eb-5e3070d320b7	5502b44c655fcd1214f533e459651e3b350ae178ec4d4e80b578fb3c09e0156d	2025-05-08 13:58:03.165999+02	20250508115802_suppression_de_la_table_translation_qui_sert_a_rien	\N	\N	2025-05-08 13:58:03.141185+02	1
\.


--
-- Name: Blog Blog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres_portfolio
--

ALTER TABLE ONLY public."Blog"
    ADD CONSTRAINT "Blog_pkey" PRIMARY KEY (id);


--
-- Name: Content Content_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres_portfolio
--

ALTER TABLE ONLY public."Content"
    ADD CONSTRAINT "Content_pkey" PRIMARY KEY (id);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres_portfolio
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: Reaction Reaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres_portfolio
--

ALTER TABLE ONLY public."Reaction"
    ADD CONSTRAINT "Reaction_pkey" PRIMARY KEY (id);


--
-- Name: Til Til_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres_portfolio
--

ALTER TABLE ONLY public."Til"
    ADD CONSTRAINT "Til_pkey" PRIMARY KEY (id);


--
-- Name: Title Title_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres_portfolio
--

ALTER TABLE ONLY public."Title"
    ADD CONSTRAINT "Title_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres_portfolio
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres_portfolio
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Blog_pinned_idx; Type: INDEX; Schema: public; Owner: postgres_portfolio
--

CREATE INDEX "Blog_pinned_idx" ON public."Blog" USING btree (pinned DESC);


--
-- Name: Content_tilId_locale_key; Type: INDEX; Schema: public; Owner: postgres_portfolio
--

CREATE UNIQUE INDEX "Content_tilId_locale_key" ON public."Content" USING btree ("tilId", locale);


--
-- Name: Reaction_sessionId_type_blogId_key; Type: INDEX; Schema: public; Owner: postgres_portfolio
--

CREATE UNIQUE INDEX "Reaction_sessionId_type_blogId_key" ON public."Reaction" USING btree ("sessionId", type, "blogId");


--
-- Name: Reaction_sessionId_type_projectId_key; Type: INDEX; Schema: public; Owner: postgres_portfolio
--

CREATE UNIQUE INDEX "Reaction_sessionId_type_projectId_key" ON public."Reaction" USING btree ("sessionId", type, "projectId");


--
-- Name: Title_projectId_locale_key; Type: INDEX; Schema: public; Owner: postgres_portfolio
--

CREATE UNIQUE INDEX "Title_projectId_locale_key" ON public."Title" USING btree ("projectId", locale);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres_portfolio
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Content Content_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres_portfolio
--

ALTER TABLE ONLY public."Content"
    ADD CONSTRAINT "Content_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Content Content_tilId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres_portfolio
--

ALTER TABLE ONLY public."Content"
    ADD CONSTRAINT "Content_tilId_fkey" FOREIGN KEY ("tilId") REFERENCES public."Til"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Reaction Reaction_blogId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres_portfolio
--

ALTER TABLE ONLY public."Reaction"
    ADD CONSTRAINT "Reaction_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES public."Blog"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Reaction Reaction_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres_portfolio
--

ALTER TABLE ONLY public."Reaction"
    ADD CONSTRAINT "Reaction_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Title Title_blogId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres_portfolio
--

ALTER TABLE ONLY public."Title"
    ADD CONSTRAINT "Title_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES public."Blog"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Title Title_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres_portfolio
--

ALTER TABLE ONLY public."Title"
    ADD CONSTRAINT "Title_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Title Title_tilId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres_portfolio
--

ALTER TABLE ONLY public."Title"
    ADD CONSTRAINT "Title_tilId_fkey" FOREIGN KEY ("tilId") REFERENCES public."Til"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

