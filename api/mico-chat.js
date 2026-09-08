import OpenAI from "openai";

const SYSTEM_PROMPT = `...`;

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
      return Response.json(
        { error: "OPENAI_API_KEY is missing." },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const safeContext = JSON.stringify(context || {}).slice(0, 12000);

    const response = await client.responses.create({
      model: "gpt-5",
      instructions: SYSTEM_PROMPT,
      input: `MICOMATE CURRENT CONTEXT:
${safeContext}

STUDENT MESSAGE:
${message}`
    });

    return Response.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("MICO AI ERROR:", error);

    return Response.json(
      {
        error: error?.message || "Unknown error",
        detail: String(error)
      },
      { status: 500 }
    );
  }
}
