-- ============================================
-- Supabase Schema for Music Player App
-- Run this in your Supabase SQL Editor
-- ============================================

-- Artists table
create table if not exists artists (
  id text primary key,
  name text not null,
  avatar_url text,
  genre text,
  created_at timestamptz default now()
);

-- Songs table
create table if not exists songs (
  id text primary key,
  title text not null,
  artist_name text not null,
  artist_id text references artists(id) on delete set null,
  genre text,
  cover_url text,
  audio_url text,
  lyrics text[],
  created_at timestamptz default now()
);

-- Liked songs table
create table if not exists liked_songs (
  id uuid primary key default gen_random_uuid(),
  song_id text references songs(id) on delete cascade,
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_songs_genre on songs(genre);
create index if not exists idx_songs_artist_id on songs(artist_id);
create index if not exists idx_liked_songs_song_id on liked_songs(song_id);

-- Enable Row Level Security (allow public read for now)
alter table artists enable row level security;
alter table songs enable row level security;
alter table liked_songs enable row level security;

create policy "Public read access" on artists for select using (true);
create policy "Public read access" on songs for select using (true);
create policy "Public read access" on liked_songs for select using (true);
create policy "Public insert access" on liked_songs for insert with check (true);
create policy "Public delete access" on liked_songs for delete using (true);

-- ============================================
-- Storage Buckets (create these in Supabase Dashboard > Storage)
-- 1. "audio"  — for MP3/WAV files (public bucket)
-- 2. "covers" — for album art images (public bucket)
--
-- After uploading, your URLs will look like:
--   https://<project>.supabase.co/storage/v1/object/public/audio/song-file.mp3
--   https://<project>.supabase.co/storage/v1/object/public/covers/cover-image.jpg
-- ============================================

-- ============================================
-- Sample Data (optional — replace URLs with your Supabase Storage URLs)
-- ============================================

insert into artists (id, name, avatar_url, genre) values
  ('artist-1', 'M83', 'https://your-project.supabase.co/storage/v1/object/public/covers/m83.jpg', 'Electronic'),
  ('artist-2', 'The Weeknd', 'https://your-project.supabase.co/storage/v1/object/public/covers/weeknd.jpg', 'Pop'),
  ('artist-3', 'Daft Punk', 'https://your-project.supabase.co/storage/v1/object/public/covers/daftpunk.jpg', 'Electronic')
on conflict (id) do nothing;

insert into songs (id, title, artist_name, artist_id, genre, cover_url, audio_url, lyrics) values
  ('song-1', 'Midnight City', 'M83', 'artist-1', 'Electronic',
   'https://your-project.supabase.co/storage/v1/object/public/covers/midnight-city.jpg',
   'https://your-project.supabase.co/storage/v1/object/public/audio/midnight-city.mp3',
   ARRAY['Waiting in a car', 'Waiting for a ride in the dark', 'The city storm is coming in']),
  ('song-2', 'Blinding Lights', 'The Weeknd', 'artist-2', 'Pop',
   'https://your-project.supabase.co/storage/v1/object/public/covers/blinding-lights.jpg',
   'https://your-project.supabase.co/storage/v1/object/public/audio/blinding-lights.mp3',
   ARRAY['I been tryna call', 'I been on my own for long enough']),
  ('song-3', 'Get Lucky', 'Daft Punk', 'artist-3', 'Electronic',
   'https://your-project.supabase.co/storage/v1/object/public/covers/get-lucky.jpg',
   'https://your-project.supabase.co/storage/v1/object/public/audio/get-lucky.mp3',
   ARRAY['Like the legend of the phoenix', 'All ends with beginnings'])
on conflict (id) do nothing;
