-- ==========================================
-- VIESA STABLE MANAGEMENT - ULTIMATE EXPANSION
-- ==========================================

-- 1. HORSES TABLE EXTENSIONS (Profielen, Hoogte, Gewicht, etc.)
ALTER TABLE horses 
ADD COLUMN IF NOT EXISTS height TEXT,
ADD COLUMN IF NOT EXISTS weight TEXT,
ADD COLUMN IF NOT EXISTS breed TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS gender TEXT,
ADD COLUMN IF NOT EXISTS color TEXT;

-- 2. FEEDING SCHEDULES EXTENSION (Plaatjes / Schema uploads)
ALTER TABLE feeding_schedules
ADD COLUMN IF NOT EXISTS feeding_image_url TEXT;

-- 3. TASKS EXTENSION (Uploads in taken)
ALTER TABLE stable_tasks
ADD COLUMN IF NOT EXISTS attachment_url TEXT;

-- 4. FACILITIES EXTENSION (Specifieke locaties zoals Manege, Weide, Paddock)
ALTER TABLE facilities
ADD COLUMN IF NOT EXISTS location_type TEXT DEFAULT 'Box'; -- 'Box', 'Manege', 'Weide', 'Paddock', 'Stapmolen'

-- 5. OPNIEUW RLS UITZETTEN VOOR ADMIN GEMAK TIJDENS ONTWIKKELING
ALTER TABLE horses DISABLE ROW LEVEL SECURITY;
ALTER TABLE feeding_schedules DISABLE ROW LEVEL SECURITY;
ALTER TABLE stable_tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE facilities DISABLE ROW LEVEL SECURITY;
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE horses TO anon, authenticated, service_role;
GRANT ALL ON TABLE feeding_schedules TO anon, authenticated, service_role;
GRANT ALL ON TABLE stable_tasks TO anon, authenticated, service_role;
GRANT ALL ON TABLE facilities TO anon, authenticated, service_role;
GRANT ALL ON TABLE contacts TO anon, authenticated, service_role;
