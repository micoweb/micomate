import OpenAI from "openai";

export default async function handler(request) {
  console.log("START");

  try {
    console.log("Checking API key:", !!process.env.OPENAI_API_KEY);

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    console.log("Before OpenAI call");

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      input: "Say hello in one sentence"
    });

    console.log("After OpenAI call");

    return Response.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("ERROR:", error);

    return Response.json({
      error: error?.message,
      detail: String(error)
    }, { status: 500 });
  }
}
