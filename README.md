# Psych Study — Ready to Run

## Overview
This repository contains a frontend (React + Vite) and backend (Node.js + Express) for a psychological experiment with an OpenAI chatbot.

## Quick start
1. Create a Postgres database (Supabase recommended) and run `db/schema.sql`.
2. Configure backend `.env` with `DATABASE_URL` and `OPENAI_API_KEY`.
3. Install & run backend:
   ```
   cd backend
   npm install
   npm start
   ```
4. Configure frontend env: set `VITE_API_BASE` if backend is remote.
5. Install & run frontend:
   ```
   cd frontend
   npm install
   npm run dev
   ```
6. Open browser to the Vite dev URL.

## Notes
- Do NOT commit your real OpenAI API key to version control. Use environment variables.
- The provided code is a complete starting point; you may want to harden security, add rate-limiting, and customize prompts as needed.
