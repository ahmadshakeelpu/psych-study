import axios from 'axios';
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';
export async function createParticipant(payload){ return (await axios.post(`${BASE}/participant`, payload)).data; }
export async function saveScales(payload){ return (await axios.post(`${BASE}/scales`, payload)).data; }
export async function screening(payload){ return (await axios.post(`${BASE}/screening`, payload)).data; }
export async function chat(payload){ return (await axios.post(`${BASE}/chat`, payload)).data; }
export async function complete(payload){ return (await axios.post(`${BASE}/complete`, payload)).data; }
