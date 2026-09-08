export default async function handler() { return Response.json({ ok: true, openaiKeyConfigured: Boolean(process.env.OPENAI_API_KEY) }); }
