-- Supabase SQL Schema for Psychological Study
-- Run this in your Supabase SQL editor

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create participants table
create table participants (
  id uuid primary key default uuid_generate_v4(),
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

-- Create indexes for better performance
create index idx_participants_condition on participants(condition);
create index idx_participants_completed on participants(completed);
create index idx_participants_created_at on participants(created_at);

-- Enable Row Level Security (RLS)
alter table participants enable row level security;

-- Create a policy that allows all operations (adjust as needed for your security requirements)
create policy "Allow all operations on participants" on participants
  for all using (true);

-- Grant necessary permissions
grant all on participants to authenticated;
grant all on participants to anon;
