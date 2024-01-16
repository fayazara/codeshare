import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const snippets = sqliteTable("snippets", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  language: text("language").default("plaintext").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
