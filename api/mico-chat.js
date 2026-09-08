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
  console.log("Output text:", response.output_text);

  return new Response(
    JSON.stringify({
      reply: response.output_text
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

} catch (error) {
  console.error("ERROR:", error);

  return new Response(
    JSON.stringify({
      error: error?.message,
      detail: String(error)
    }),
    {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
