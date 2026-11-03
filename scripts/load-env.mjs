// Charge .env.local (base et secrets de développement) avant .env.
// dotenv n'écrase jamais une variable déjà définie : .env.local l'emporte donc sur .env,
// et une variable passée en ligne de commande l'emporte sur les deux.
import dotenv from "dotenv";

dotenv.config({ path: ".env.local", quiet: true });
dotenv.config({ quiet: true });
