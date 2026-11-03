// Synchronise les projets du portfolio avec scripts/projects-data.mjs.
//
//   node scripts/seed-projects.mjs                       simulation (ne modifie rien)
//   node scripts/seed-projects.mjs --apply               applique
//   node scripts/seed-projects.mjs --apply --delete-old  applique et supprime les anciens projets
//
// Le fichier MDX de chaque projet doit déjà être déployé : sinon sa page plante.

import "./load-env.mjs";
import { randomUUID } from "node:crypto";
import pg from "pg";
import { projects, projectsToDelete } from "./projects-data.mjs";

const apply = process.argv.includes("--apply");
const deleteOld = process.argv.includes("--delete-old");
const LOCALES = ["fr", "en"];

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
const host = new URL(process.env.DATABASE_URL).host;
console.log(`${apply ? "APPLIQUE" : "SIMULATION"} sur ${host}${deleteOld ? " (avec suppression)" : ""}\n`);

await client.query("BEGIN");
try {
  // 1. Création / mise à jour
  let order = 0;
  const base = Date.now();
  for (const p of projects) {
    const { rows } = await client.query(
      `select "projectId" from "Title" where locale = 'fr' and title = $1 and "projectId" is not null`,
      [p.title.fr]
    );
    let projectId = rows[0]?.projectId;

    if (projectId) {
      for (const locale of LOCALES) {
        await client.query(
          `update "Title" set title = $1, subtitle = $2, description = $3, "updatedAt" = now()
           where "projectId" = $4 and locale = $5`,
          [p.title[locale], p.subtitle[locale], p.description[locale], projectId, locale]
        );
      }
      if ("link" in p) {
        await client.query(`update "Project" set link = $1, "updatedAt" = now() where id = $2`, [p.link, projectId]);
      }
      if (p.githubLink) {
        await client.query(`update "Project" set "githubLink" = $1, "updatedAt" = now() where id = $2`, [p.githubLink, projectId]);
      }
      console.log(`mis à jour : ${p.title.fr}`);
    } else {
      projectId = randomUUID();
      // createdAt échelonné : la liste du site est triée par date de création croissante
      const createdAt = new Date(base + ++order * 60_000);
      await client.query(
        `insert into "Project" (id, "githubLink", images, "createdAt", "updatedAt")
         values ($1, $2, '{}', $3, now())`,
        [projectId, p.githubLink ?? [], createdAt]
      );
      for (const locale of LOCALES) {
        await client.query(
          `insert into "Title" (id, locale, title, subtitle, description, "projectId", "updatedAt")
           values ($1, $2, $3, $4, $5, $6, now())`,
          [randomUUID(), locale, p.title[locale], p.subtitle[locale], p.description[locale], projectId]
        );
      }
      console.log(`créé       : ${p.title.fr}`);
    }
  }

  // 2. Suppression des anciens projets (les clés étrangères sont en SET NULL :
  //    on supprime à la main titres, contenus et réactions pour ne pas laisser d'orphelins)
  if (deleteOld) {
    for (const title of projectsToDelete) {
      const { rows } = await client.query(
        `select "projectId" from "Title" where locale = 'fr' and title = $1 and "projectId" is not null`,
        [title]
      );
      if (rows.length === 0) {
        console.log(`absent     : ${title}`);
        continue;
      }
      const id = rows[0].projectId;
      const counts = {};
      for (const table of ["Reaction", "Content", "Title"]) {
        const r = await client.query(`delete from "${table}" where "projectId" = $1`, [id]);
        counts[table] = r.rowCount;
      }
      await client.query(`delete from "Project" where id = $1`, [id]);
      console.log(`supprimé   : ${title} (${JSON.stringify(counts)})`);
    }
  }

  if (apply) {
    await client.query("COMMIT");
    console.log("\nCOMMIT effectué.");
  } else {
    await client.query("ROLLBACK");
    console.log("\nSimulation terminée : rien n'a été modifié (ROLLBACK). Relance avec --apply.");
  }
} catch (error) {
  await client.query("ROLLBACK");
  console.error("\nERREUR, ROLLBACK :", error.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
