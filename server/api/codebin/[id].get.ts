import { z, zh } from "h3-zod";
import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  try {
    const { id } = await zh.useValidatedParams(event, { id: z.string() });
    const snippet = await useDB()
      .select()
      .from(tables.snippets)
      .where(eq(tables.snippets.uid, id))
      .get();
    return snippet;
  } catch (error) {
    return error;
  }
});
