import OpenAI from "openai";

export default async function handler(request) {
  console.log("START");

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    console.log("Before OpenAI call");

    const response = await client.responses.create({
      model: "gpt-5",
      input: "Say hello in one sentence"
    });

    console.log("After OpenAI call");

    return new Response(
      JSON.stringify({
        reply: response.output_text
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error) {
    console.error("ERROR:", error);

    return new Response(
      JSON.stringify({
        error: error.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}
