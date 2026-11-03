// Crée (ou réinitialise) le compte administrateur du back-office.
//
//   ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/seed-admin.mjs
//   node scripts/seed-admin.mjs --reset-password     remplace le mot de passe d'un compte existant
//
// ADMIN_EMAIL et ADMIN_PASSWORD viennent de l'environnement (.env.local en développement).
// Sur une base distante, un mot de passe faible ou d'exemple est refusé.

import "./load-env.mjs";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import pg from "pg";

const resetPassword = process.argv.includes("--reset-password");
const email = process.env.ADMIN_EMAIL?.trim();
const password = process.env.ADMIN_PASSWORD;

function fail(message) {
  console.error(`Erreur : ${message}`);
  process.exit(1);
}

if (!process.env.DATABASE_URL) fail("DATABASE_URL n'est pas définie.");
if (!email || !password) fail("ADMIN_EMAIL et ADMIN_PASSWORD sont obligatoires.");
if (password.length < 8) fail("le mot de passe doit faire au moins 8 caractères.");

const { hostname } = new URL(process.env.DATABASE_URL);
const isLocal = ["localhost", "127.0.0.1", "::1", "[::1]"].includes(hostname);
if (!isLocal && (password.length < 12 || password === "change-me")) {
  fail(`base distante (${hostname}) : choisis un mot de passe d'au moins 12 caractères, pas celui de l'exemple.`);
}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

try {
  const { rows } = await client.query(`select id from "User" where email = $1`, [email]);
  const hash = await bcrypt.hash(password, 12);

  if (rows.length > 0) {
    if (!resetPassword) {
      fail(`le compte ${email} existe déjà (ajoute --reset-password pour changer son mot de passe).`);
    }
    await client.query(`update "User" set password = $1, "updatedAt" = now() where id = $2`, [hash, rows[0].id]);
    console.log(`Mot de passe réinitialisé pour ${email} sur ${hostname}.`);
  } else {
    await client.query(`insert into "User" (id, email, password, "updatedAt") values ($1, $2, $3, now())`, [
      randomUUID(),
      email,
      hash,
    ]);
    console.log(`Compte ${email} créé sur ${hostname}.`);
  }
} finally {
  await client.end();
}
