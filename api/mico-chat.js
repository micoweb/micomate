import OpenAI from "openai";

const SYSTEM_PROMPT = `
You are MICO, a friendly AI study buddy for an O/L student.
Talk like a supportive close study friend, NOT a strict teacher.
Be warm, natural, slightly playful, encouraging and concise.
Sinhala is preferred when the student uses Sinhala/Singlish.
English is fine when they use English. Sinhala + English mixing is okay.
Use emojis occasionally. Never shame the student.
Answer O/L questions clearly; give the answer first, then a simple explanation.
For Maths/Science, show useful steps. For quizzes, ask one question at a time.
Help with revision, motivation, study plans and exam preparation.
Use MICOMATE context when useful. Never invent marks, tasks, schedules or progress.
`;

export default async function handler(request) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed." }, { status: 405 });
  }
  try {
    const body = await request.json();
    const { message, context } = body || {};
    if (!message || typeof message !== "string") {
      return Response.json({ error: "Message is required." }, { status: 400 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return Response.json({
        error: "OPENAI_API_KEY is missing. Add it in Vercel Project Settings → Environment Variables, then redeploy."
      }, { status: 500 });
    }
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const safeContext = JSON.stringify(context || {}).slice(0, 12000);
    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      instructions: SYSTEM_PROMPT,
      input: `MICOMATE CURRENT CONTEXT:
${safeContext}

STUDENT MESSAGE:
${message}`
    });
    return Response.json({ reply: response.output_text });
  } catch (error) {
    console.error("MICO AI ERROR:", error);
    return Response.json({
      error: "MICO AI could not respond.",
      detail: error?.message || String(error)
    }, { status: 500 });
  }
}
