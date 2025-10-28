import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import pool from './db.js';
import dotenv from 'dotenv';
import { CONTROL_PROMPT, EXPERIMENTAL_PROMPT } from './prompts.js';
import { rowsToCsv } from './utils.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Create participant
app.post('/api/participant', async (req, res) => {
  try {
    const id = uuidv4();
    const { consent_at, demographic } = req.body;
    await pool.query(`insert into participants (id, consent_at, age_category, gender, nationality, education, occupation, recruitment_experience, recruitment_role) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`, [id, consent_at, demographic?.age, demographic?.gender, demographic?.nationality, demographic?.education, demographic?.occupation, demographic?.recruitment_experience, demographic?.recruitment_role]);
    res.json({ participant_id: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Save scales (attari, tai)
app.post('/api/scales', async (req, res) => {
  try {
    const { participant_id, attari, tai } = req.body;
    await pool.query('update participants set attari=$1, tai=$2 where id=$3', [attari, tai, participant_id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Screening & baseline
app.post('/api/screening', async (req, res) => {
  try {
    const { participant_id, screening_text, baseline_use } = req.body;
    const excluded = (screening_text || '').trim().toLowerCase() === 'no';
    await pool.query('update participants set screening_text=$1, baseline_use=$2 where id=$3', [screening_text, baseline_use, participant_id]);
    if (excluded) return res.json({ excluded: true });
    const condition = Math.random() < 0.5 ? 'control' : 'experimental';
    await pool.query('update participants set condition=$1 where id=$2', [condition, participant_id]);
    res.json({ excluded: false, condition });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { participant_id, round, user_message } = req.body;
    const r = await pool.query('select condition, screening_text, chat from participants where id=$1', [participant_id]);
    const row = r.rows[0];
    if (!row) return res.status(404).json({ error: 'participant not found' });
    const condition = row.condition || 'control';
    const screening_text = row.screening_text || '';
    const systemPrompt = condition === 'control' ? CONTROL_PROMPT : EXPERIMENTAL_PROMPT + `\nContext: ${screening_text}`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Round ${round} user: ${user_message}` }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 350
    });
    const reply = completion.choices[0].message.content;

    const existingChat = row.chat || [];
    const updated = existingChat.concat([{ round, user_message, reply, ts: new Date() }]);
    await pool.query('update participants set chat=$1 where id=$2', [updated, participant_id]);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Complete
app.post('/api/complete', async (req, res) => {
  try {
    const { participant_id, post_use, post_change } = req.body;
    await pool.query('update participants set post_use=$1, post_change=$2, completed=true where id=$3', [post_use, post_change, participant_id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Admin export
app.get('/api/admin/export', async (req, res) => {
  try {
    const token = req.headers['x-admin-token'];
    if (token !== process.env.ADMIN_EXPORT_TOKEN) return res.status(401).send('unauthorized');
    const data = await pool.query('select * from participants');
    const csv = rowsToCsv(data.rows);
    res.setHeader('Content-Type', 'text/csv');
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

app.listen(process.env.PORT||3000, () => console.log('Server running'));
