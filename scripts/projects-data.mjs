// Projets affichés sur le portfolio.
// Le titre sert aussi de nom de fichier : content/<locale>/projects/<title>.mdx
// (lettres, chiffres, espaces, points, tirets et underscores uniquement).

export const projects = [
  {
    title: { fr: "Matunda", en: "Matunda" },
    subtitle: {
      fr: "Écosystème d'investissement dans les actions africaines : API, application mobile, back-office, site et supervision",
      en: "Investment ecosystem for African stocks: API, mobile app, back-office, website and monitoring",
    },
    description: {
      fr: "Un projet que je développe seul pour mon oncle : une API NestJS, une application mobile Expo, un back-office et un site vitrine Next.js, et une supervision Prometheus et Grafana.",
      en: "A project I build on my own for my uncle: a NestJS API, an Expo mobile app, a Next.js back-office and marketing site, and Prometheus and Grafana monitoring.",
    },
    link: null, // ancien lien de prévisualisation Expo, périmé
    update: true, // existe déjà en base : on met à jour les textes, on garde id, vues et réactions
  },
  {
    title: { fr: "ft_transcendence", en: "ft_transcendence" },
    subtitle: {
      fr: "Plateforme web d'échecs 3D et de babyfoot, en équipe de cinq",
      en: "3D chess and foosball web platform, in a team of five",
    },
    description: {
      fr: "Échecs 3D en temps réel contre un ami ou une IA, babyfoots physiques de 42 Paris organisés par l'application, chat, classement Elo et tournois. React 19, NestJS 11, PostgreSQL, Three.js.",
      en: "Real-time 3D chess against a friend or an AI, the physical foosball tables of 42 Paris organised by the app, chat, Elo ranking and tournaments. React 19, NestJS 11, PostgreSQL, Three.js.",
    },
    githubLink: ["https://github.com/DanielAkim2000/ft_transcendence"],
  },
  {
    title: { fr: "minishell", en: "minishell" },
    subtitle: {
      fr: "Un shell inspiré de bash, en C, en binôme",
      en: "A bash-inspired shell, in C, as a pair",
    },
    description: {
      fr: "Lexer, parser, expander et exécuteur : pipes, redirections, heredocs, opérateurs logiques, sous-shells, jokers et builtins.",
      en: "Lexer, parser, expander and executor: pipes, redirections, heredocs, logical operators, subshells, wildcards and builtins.",
    },
    githubLink: ["https://github.com/DanielAkim2000/minishell"],
  },
  {
    title: { fr: "ft_irc", en: "ft_irc" },
    subtitle: {
      fr: "Un serveur IRC en C++98, en équipe de trois",
      en: "An IRC server in C++98, in a team of three",
    },
    description: {
      fr: "Serveur multi-clients basé sur epoll et des entrées-sorties non bloquantes : canaux, modes, invitations, messages privés.",
      en: "Multi-client server based on epoll and non-blocking I/O: channels, modes, invitations, private messages.",
    },
    githubLink: ["https://github.com/DanielAkim2000/ft_irc"],
  },
  {
    title: { fr: "cub3D", en: "cub3D" },
    subtitle: {
      fr: "Un moteur 3D en raycasting, en C avec la MiniLibX, en binôme",
      en: "A raycasting 3D engine, in C with MiniLibX, as a pair",
    },
    description: {
      fr: "Un labyrinthe vu à la première personne façon Wolfenstein 3D : textures, minimap, portes, sprites animés et caméra à la souris.",
      en: "A first-person maze in the style of Wolfenstein 3D: textures, minimap, doors, animated sprites and mouse camera.",
    },
    githubLink: ["https://github.com/DanielAkim2000/cub3D"],
  },
  {
    title: { fr: "philosophers", en: "philosophers" },
    subtitle: {
      fr: "Le problème des philosophes qui dînent : threads, mutex et sémaphores",
      en: "The dining philosophers problem: threads, mutexes and semaphores",
    },
    description: {
      fr: "Une simulation concurrente sans interblocage ni accès concurrent aux données, en deux versions : threads avec mutex, processus avec sémaphores.",
      en: "A concurrent simulation with no deadlock or data race, in two versions: threads with mutexes, processes with semaphores.",
    },
    githubLink: ["https://github.com/DanielAkim2000/philosophers"],
  },
  {
    title: { fr: "push_swap", en: "push_swap" },
    subtitle: {
      fr: "Trier une pile avec un jeu d'instructions limité",
      en: "Sorting a stack with a limited instruction set",
    },
    description: {
      fr: "Un algorithme de tri qui combine plus longue sous-suite croissante et algorithme Turk pour produire le moins d'opérations possible, avec un checker en bonus.",
      en: "A sorting algorithm combining longest increasing subsequence and the Turk algorithm to output as few operations as possible, with a bonus checker.",
    },
    githubLink: ["https://github.com/DanielAkim2000/push_swap"],
  },
  {
    title: { fr: "pipex", en: "pipex" },
    subtitle: {
      fr: "Recréer les pipelines du shell en C",
      en: "Recreating shell pipelines in C",
    },
    description: {
      fr: "Processus, pipes et redirections pour reproduire cmd1 | cmd2, avec plusieurs pipes et here_doc en bonus.",
      en: "Processes, pipes and redirections to reproduce cmd1 | cmd2, with multiple pipes and here_doc as a bonus.",
    },
    githubLink: ["https://github.com/DanielAkim2000/pipex"],
  },
  {
    title: { fr: "fractol", en: "fractol" },
    subtitle: {
      fr: "Un explorateur de fractales en C avec la MiniLibX",
      en: "A fractal explorer in C with MiniLibX",
    },
    description: {
      fr: "Mandelbrot, Julia et Burning Ship, avec zoom à la molette, palettes de couleurs et profondeur d'itération adaptative.",
      en: "Mandelbrot, Julia and Burning Ship, with mouse-wheel zoom, colour palettes and adaptive iteration depth.",
    },
    githubLink: ["https://github.com/DanielAkim2000/fractol"],
  },
  {
    title: { fr: "Libft", en: "Libft" },
    subtitle: {
      fr: "Ma propre bibliothèque C, le premier projet de 42",
      en: "My own C library, the first 42 project",
    },
    description: {
      fr: "Les fonctions de la libc réimplémentées, des listes chaînées et des utilitaires que je réutilise dans tous mes projets.",
      en: "Reimplemented libc functions, linked lists and utilities I reuse in all my projects.",
    },
    githubLink: ["https://github.com/DanielAkim2000/libft-42"],
  },
  {
    title: { fr: "ft_printf", en: "ft_printf" },
    subtitle: {
      fr: "Réimplémenter printf en C avec des fonctions variadiques",
      en: "Reimplementing printf in C with variadic functions",
    },
    description: {
      fr: "Toutes les conversions de printf, plus les drapeaux, la largeur et la précision en bonus.",
      en: "All printf conversions, plus flags, width and precision as a bonus.",
    },
    githubLink: ["https://github.com/DanielAkim2000/ft_printf"],
  },
  {
    title: { fr: "get_next_line", en: "get_next_line" },
    subtitle: {
      fr: "Lire un fichier ligne par ligne en C",
      en: "Reading a file line by line in C",
    },
    description: {
      fr: "Une fonction qui renvoie une ligne à la fois grâce à une variable statique, avec la prise en charge de plusieurs descripteurs en bonus.",
      en: "A function that returns one line at a time using a static variable, with support for several descriptors as a bonus.",
    },
    githubLink: ["https://github.com/DanielAkim2000/get_next_line"],
  },
  {
    title: { fr: "CPP-Modules", en: "CPP-Modules" },
    subtitle: {
      fr: "Les modules C++98 de 42, du module 00 au module 09",
      en: "The 42 C++98 modules, from module 00 to module 09",
    },
    description: {
      fr: "Classes, héritage, polymorphisme, exceptions, templates et STL, à travers dix modules d'exercices.",
      en: "Classes, inheritance, polymorphism, exceptions, templates and the STL, across ten modules of exercises.",
    },
    githubLink: [
      "https://github.com/DanielAkim2000/cpp00",
      "https://github.com/DanielAkim2000/cpp01",
      "https://github.com/DanielAkim2000/cpp02",
      "https://github.com/DanielAkim2000/cpp03",
      "https://github.com/DanielAkim2000/cpp04",
      "https://github.com/DanielAkim2000/cpp05",
      "https://github.com/DanielAkim2000/cpp06",
      "https://github.com/DanielAkim2000/cpp07",
      "https://github.com/DanielAkim2000/cpp08",
      "https://github.com/DanielAkim2000/cpp09",
    ],
  },
  {
    title: { fr: "inception", en: "inception" },
    subtitle: {
      fr: "Une infrastructure Docker : NGINX, WordPress et MariaDB",
      en: "A Docker infrastructure: NGINX, WordPress and MariaDB",
    },
    description: {
      fr: "Trois services conteneurisés avec Docker Compose, un point d'entrée unique en TLS, des secrets et des volumes nommés.",
      en: "Three containerised services with Docker Compose, a single TLS entry point, secrets and named volumes.",
    },
    githubLink: ["https://github.com/DanielAkim2000/inception"],
  },
];

// Anciens projets à retirer du site (titre français).
export const projectsToDelete = ["Bonwazadiler", "Reseau-Social", "Garage-V.Parrot", "KGB"];
