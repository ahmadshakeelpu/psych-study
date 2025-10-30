# Psychological Study - AI in Recruitment

A psychological study application with Express.js backend API and Next.js frontend for studying attitudes towards AI in recruitment processes.

## Project Structure

```
psych-study/
├── backend/                  # Express.js API server
│   ├── package.json
│   ├── server.js
│   ├── .env.example
│   └── ...
├── nextjs-frontend/          # Next.js React frontend
│   ├── package.json
│   ├── .env.example
│   └── ...
└── supabase-schema.sql       # Database schema
```

## Quick Start

### 1. Install all dependencies
```bash
npm install
cd backend && npm install
cd ../nextjs-frontend && npm install
```

**Or use the setup script:**
```bash
npm run setup
```

### 2. Set up environment variables

**Backend:**
```bash
cd backend
# Edit .env with your actual credentials (Supabase URL, API Keys, etc.)
```

**Frontend:**
```bash
cd nextjs-frontend
# Edit .env.local with your actual credentials
```

### 3. Set up database
Run the SQL in `supabase-schema.sql` in your Supabase dashboard.

### 4. Start Development Servers

**Option 1 - Run both servers with one command (Recommended):**
```bash
npm run dev
```

**Option 2 - Run separately:**
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend  
npm run dev:frontend
```

## Development

### Backend (Express.js)
- **Directory:** `backend/`
- **Port:** 3001
- **Environment:** `backend/.env`
- **Start:** `cd backend && npm start`

### Frontend (Next.js)
- **Directory:** `nextjs-frontend/`
- **Port:** 3000
- **Environment:** `nextjs-frontend/.env.local`
- **Start:** `cd nextjs-frontend && npm run dev`
- **Build:** `cd nextjs-frontend && npm run build`

## Study Flow

1. **Consent Page** - Study information and consent
2. **Demographics** - Age, gender, nationality, education, occupation, recruitment experience
3. **ATTARI Questionnaire** - 12-item attitudes towards AI scale
4. **TAI Questionnaire** - Threats of AI scale (4 randomly selected items)
5. **Screening** - Concerns about AI in recruitment + baseline assessment
6. **Pre-randomization** - Instructions for conversation
7. **Chat Interface** - 3-round conversation with AI chatbot
8. **Post-test** - Primary and secondary dependent variables
9. **Thank You** - Study completion

## Environment Variables

**Backend (`backend/.env`):**
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
PORT=3001
ADMIN_EXPORT_TOKEN=your_secure_token
NODE_ENV=development
```

**Frontend (`nextjs-frontend/.env.local`):**
```env
NEXT_PUBLIC_API_BASE=http://localhost:3001/api
NODE_ENV=development
```

## Deployment

### Backend
Deploy the `backend/` folder to your preferred Node.js hosting service (Heroku, Railway, etc.).

### Frontend
Deploy the `nextjs-frontend/` folder to Vercel, Netlify, or your preferred hosting service.

## License

This project is for academic research purposes.