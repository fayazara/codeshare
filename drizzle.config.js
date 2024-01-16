import "dotenv/config";
const { TURSO_DB_URL, TURSO_DB_TOKEN } = process.env;

const turso = {
  driver: "turso",
  dbCredentials: {
    url: TURSO_DB_URL,
    authToken: TURSO_DB_TOKEN,
  },
};

export default {
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
  ...turso,
};
