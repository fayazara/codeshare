import { useValidatedBody, z } from "h3-zod";
import { nanoid } from "nanoid";

export default eventHandler(async (event) => {
  const { title, body, language } = await useValidatedBody(event, {
    title: z.string().min(1).max(50),
    body: z.string().min(1),
    language: z.string().min(1).max(50),
  });
  const uid = nanoid(10);
  const snippet = await useDB()
    .insert(tables.snippets)
    .values({
      title,
      body,
      uid,
      language,
      createdAt: new Date(),
    })
    .returning()
    .get();

  return snippet;
});
