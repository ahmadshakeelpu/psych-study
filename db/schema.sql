create extension if not exists pgcrypto;

create table participants (
  id uuid primary key default gen_random_uuid(),
  consent_at timestamptz,
  age_category text,
  gender text,
  nationality text,
  education text,
  occupation text,
  recruitment_experience boolean,
  recruitment_role text,
  attari jsonb,
  tai jsonb,
  screening_text text,
  baseline_use int,
  condition text,
  chat jsonb default '[]',
  post_use int,
  post_change text,
  created_at timestamptz default now(),
  completed boolean default false
);
