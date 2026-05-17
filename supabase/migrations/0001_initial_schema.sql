-- Create enum types
CREATE TYPE price_category AS ENUM ('€10k-25k', '€25k-50k', '€50k-100k', 'Price on Request');
CREATE TYPE horse_gender AS ENUM ('Mare', 'Gelding', 'Stallion');
CREATE TYPE horse_discipline AS ENUM ('Dressage', 'Showjumping', 'Hunter', 'Eventing');
CREATE TYPE horse_status AS ENUM ('Available', 'Under Offer / Vet Check', 'Sold');
CREATE TYPE media_type AS ENUM ('image', 'video', 'document');
CREATE TYPE lead_status AS ENUM ('New', 'Contacted', 'Closed');

-- Create horses table
CREATE TABLE horses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price_category price_category NOT NULL,
  birth_year INTEGER NOT NULL,
  gender horse_gender NOT NULL,
  height_cm INTEGER,
  discipline horse_discipline NOT NULL,
  experience_level TEXT,
  sire TEXT,
  dam_sire TEXT,
  description TEXT,
  status horse_status DEFAULT 'Available' NOT NULL,
  cover_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create media table
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  type media_type NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  horse_id UUID REFERENCES horses(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT,
  message TEXT NOT NULL,
  status lead_status DEFAULT 'New' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE horses ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (Read-only)
CREATE POLICY "Public profiles are viewable by everyone." ON horses
  FOR SELECT USING (true);

CREATE POLICY "Public media is viewable by everyone." ON media
  FOR SELECT USING (true);

-- Leads can be created by anyone (public inquiry form)
CREATE POLICY "Anyone can insert a lead." ON leads
  FOR INSERT WITH CHECK (true);

-- Create policies for authenticated admins (All access)
-- Assuming admin users are authenticated via Supabase Auth
CREATE POLICY "Admins can manage horses." ON horses
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins can manage media." ON media
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins can view and manage leads." ON leads
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
