MICOMATE — Vercel deployment

1. Push/upload these files to GitHub.
2. Never upload .env or an OpenAI API key.
3. Import the GitHub repository into Vercel.
4. Use the Hobby plan for personal/non-commercial use.
5. Project Settings → Environment Variables:
   OPENAI_API_KEY = your NEW OpenAI API key
   Apply to Production (and Preview if desired).
6. Redeploy after adding/changing the variable.
7. Test the Vercel URL.

API endpoints:
GET /api/health
POST /api/mico-chat
