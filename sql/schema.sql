-- ============================================================
-- PetRescueApp – Supabase PostgreSQL Schema
-- Run this entire file in the Supabase SQL Editor
-- ============================================================

-- Enable UUID extension (already enabled on Supabase by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- LOCALITIES
-- Stores GeoJSON FeatureCollection + map viewport metadata
-- ============================================================
CREATE TABLE IF NOT EXISTS localities (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  locality        TEXT NOT NULL,
  locality_unique TEXT NOT NULL UNIQUE,
  center_lat      FLOAT NOT NULL,
  center_lng      FLOAT NOT NULL,
  zoom            INT  NOT NULL DEFAULT 14,
  geojson         JSONB NOT NULL DEFAULT '{"type":"FeatureCollection","features":[]}',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROFILES
-- One row per auth.users entry – created by trigger below
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user','moderator','admin')),
  locality_id UUID REFERENCES localities(id),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- STREETS
-- Named road segments belonging to a locality
-- ============================================================
CREATE TABLE IF NOT EXISTS streets (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  locality_id  UUID NOT NULL REFERENCES localities(id) ON DELETE CASCADE,
  streetname   TEXT NOT NULL,
  display_name TEXT NOT NULL,
  feeder       TEXT DEFAULT '',
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (locality_id, streetname)
);

-- ============================================================
-- ANIMALS
-- Cats and dogs tracked per street
-- ============================================================
CREATE TABLE IF NOT EXISTS animals (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  type        TEXT NOT NULL CHECK (type IN ('cat','dog')),
  identity    INT  NOT NULL DEFAULT 0,   -- 0=stray, 1=pet
  image_path  TEXT,                       -- full Supabase Storage public URL
  street_id   UUID NOT NULL REFERENCES streets(id) ON DELETE CASCADE,
  locality_id UUID NOT NULL REFERENCES localities(id),
  user_id     UUID NOT NULL REFERENCES auth.users(id),
  bio         TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ANIMAL_SPAY
-- One row per animal
-- ============================================================
CREATE TABLE IF NOT EXISTS animal_spay (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id  UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  status     INT  NOT NULL DEFAULT 2,  -- 0=No, 1=Yes, 2=Unknown
  hospital   TEXT,
  spay_date  TEXT,
  cost       NUMERIC
);

-- ============================================================
-- ANIMAL_VACCINES
-- Many rows per animal
-- ============================================================
CREATE TABLE IF NOT EXISTS animal_vaccines (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id       UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  vaccine_name    TEXT NOT NULL,
  date_taken      TEXT DEFAULT '',
  date_due        TEXT DEFAULT '',
  cost            NUMERIC,
  user_id         UUID REFERENCES auth.users(id)
);

-- ============================================================
-- ANIMAL_MISC
-- Miscellaneous medical records per animal
-- ============================================================
CREATE TABLE IF NOT EXISTS animal_misc (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id   UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  ailment     TEXT NOT NULL,
  description TEXT NOT NULL
);

-- ============================================================
-- POSTS
-- Community bulletin board
-- ============================================================
CREATE TABLE IF NOT EXISTS posts (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT NOT NULL,
  text             TEXT NOT NULL,
  user_id          UUID NOT NULL REFERENCES auth.users(id),
  image_path       TEXT,               -- full Supabase Storage public URL
  tag              TEXT NOT NULL,
  urgency          TEXT NOT NULL CHECK (urgency IN ('low','mid','high')),
  status           TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','closed')),
  location_center  FLOAT[] DEFAULT '{}',
  location_zoom    INT  DEFAULT 17,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- COMMENTS
-- Comments on posts
-- ============================================================
CREATE TABLE IF NOT EXISTS comments (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id    UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES auth.users(id),
  text       TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_streets_locality   ON streets(locality_id);
CREATE INDEX IF NOT EXISTS idx_animals_street     ON animals(street_id);
CREATE INDEX IF NOT EXISTS idx_animals_locality   ON animals(locality_id);
CREATE INDEX IF NOT EXISTS idx_posts_user         ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created      ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post      ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_animal_spay_animal ON animal_spay(animal_id);
CREATE INDEX IF NOT EXISTS idx_vaccines_animal    ON animal_vaccines(animal_id);

-- ============================================================
-- TRIGGER: auto-create profile on new auth user
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO profiles (id, name, locality_id)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    (
      SELECT id FROM localities
      WHERE locality_unique = NEW.raw_user_meta_data->>'locality'
      LIMIT 1
    )
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- TRIGGER: update updated_at on posts and comments
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS posts_updated_at ON posts;
CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS comments_updated_at ON comments;
CREATE TRIGGER comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE localities    ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE streets       ENABLE ROW LEVEL SECURITY;
ALTER TABLE animals       ENABLE ROW LEVEL SECURITY;
ALTER TABLE animal_spay   ENABLE ROW LEVEL SECURITY;
ALTER TABLE animal_vaccines ENABLE ROW LEVEL SECURITY;
ALTER TABLE animal_misc   ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments      ENABLE ROW LEVEL SECURITY;

-- Localities: public read, admin write
CREATE POLICY "localities_public_read"  ON localities FOR SELECT USING (true);
CREATE POLICY "localities_admin_insert" ON localities FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "localities_admin_update" ON localities FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Profiles: public read, own update
CREATE POLICY "profiles_public_read"  ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_own_update"   ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_service_insert" ON profiles FOR INSERT WITH CHECK (true);

-- Streets: public read, admin write
CREATE POLICY "streets_public_read"  ON streets FOR SELECT USING (true);
CREATE POLICY "streets_admin_write"  ON streets FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "streets_admin_update" ON streets FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Animals: public read, authenticated insert, own delete
CREATE POLICY "animals_public_read"    ON animals FOR SELECT USING (true);
CREATE POLICY "animals_auth_insert"    ON animals FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "animals_own_delete"     ON animals FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "animals_own_update"     ON animals FOR UPDATE USING (auth.uid() = user_id);

-- Animal sub-tables: follow the parent animal's owner
CREATE POLICY "spay_public_read"   ON animal_spay   FOR SELECT USING (true);
CREATE POLICY "spay_auth_insert"   ON animal_spay   FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "spay_own_update"    ON animal_spay   FOR UPDATE USING (
  EXISTS (SELECT 1 FROM animals WHERE id = animal_id AND user_id = auth.uid())
);

CREATE POLICY "vaccines_public_read"  ON animal_vaccines FOR SELECT USING (true);
CREATE POLICY "vaccines_auth_insert"  ON animal_vaccines FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "misc_public_read"  ON animal_misc FOR SELECT USING (true);
CREATE POLICY "misc_auth_insert"  ON animal_misc FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Posts: public read, authenticated insert, own update/delete
CREATE POLICY "posts_public_read"  ON posts FOR SELECT USING (true);
CREATE POLICY "posts_auth_insert"  ON posts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "posts_own_update"   ON posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "posts_own_delete"   ON posts FOR DELETE USING (auth.uid() = user_id);

-- Comments: public read, authenticated insert, own delete
CREATE POLICY "comments_public_read"  ON comments FOR SELECT USING (true);
CREATE POLICY "comments_auth_insert"  ON comments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "comments_own_delete"   ON comments FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- STORAGE BUCKETS
-- Run these in SQL or create them in the Supabase Dashboard
-- under Storage > New Bucket
-- ============================================================
-- Bucket: post-images    (public)
-- Bucket: animal-images  (public)
--
-- Storage RLS policies (set in Dashboard or via SQL):
-- Allow public reads on both buckets
-- Allow authenticated uploads to their own folder: user_id/*
-- Allow own deletes: user_id/*
