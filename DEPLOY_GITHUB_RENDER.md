MICOMATE — GitHub + Render deployment

1. Upload this folder's contents to a GitHub repository.
2. DO NOT upload .env or any OpenAI API key.
3. On Render, create a Web Service from the GitHub repository.
4. Build Command: npm install
5. Start Command: npm start
6. Add Environment Variable:
   OPENAI_API_KEY = your new OpenAI API key
7. Deploy.
8. Open the Render URL and test MICO.

Important:
- If an API key was previously placed inside a ZIP/GitHub repository, revoke that key and create a new one.
- Never put the API key inside index.html or client-side JavaScript.
