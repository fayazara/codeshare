import { createClient as createLibSQLClient } from "@libsql/client/http";
import { drizzle as drizzleLibSQL } from "drizzle-orm/libsql";

let _db = null;

export * as tables from '~/server/database/schema'

export const useDB = () => {
  if (!_db) {
    if (process.env.TURSO_DB_URL && process.env.TURSO_DB_TOKEN) {
      _db = drizzleLibSQL(
        createLibSQLClient({
          url: process.env.TURSO_DB_URL,
          authToken: process.env.TURSO_DB_TOKEN,
        })
      );
      console.log("Database initiated:", process.env.TURSO_DB_URL);
    } else {
      throw new Error("No database configured for production or development");
    }
  }
  return _db;
};
