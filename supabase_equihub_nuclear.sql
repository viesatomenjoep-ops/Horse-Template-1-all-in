-- 1. Create facilities table
CREATE TABLE IF NOT EXISTS facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'Box',
    status TEXT DEFAULT 'Available',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Update horses table (zonder harde restricties om errors te voorkomen)
ALTER TABLE horses ADD COLUMN IF NOT EXISTS owner_id UUID;
ALTER TABLE horses ADD COLUMN IF NOT EXISTS current_box_id UUID;
ALTER TABLE horses ADD COLUMN IF NOT EXISTS passport_number TEXT;
ALTER TABLE horses ADD COLUMN IF NOT EXISTS chip_number TEXT;
ALTER TABLE horses ADD COLUMN IF NOT EXISTS management_status TEXT DEFAULT 'Active';
ALTER TABLE horses ADD COLUMN IF NOT EXISTS tack_info TEXT;

-- 3. Create stable_tasks (puur en simpel, geen harde relaties die de boel kunnen slopen)
CREATE TABLE IF NOT EXISTS stable_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    horse_id UUID,
    assigned_user_id UUID,
    task_type TEXT NOT NULL DEFAULT 'Training',
    title TEXT NOT NULL,
    status TEXT DEFAULT 'To-do',
    scheduled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. Create feeding_schedules
CREATE TABLE IF NOT EXISTS feeding_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    horse_id UUID,
    roughage TEXT,
    concentrates TEXT,
    supplements TEXT,
    medication TEXT,
    instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. Zet Row Level Security VOLLEDIG UIT voor deze tabellen
ALTER TABLE facilities DISABLE ROW LEVEL SECURITY;
ALTER TABLE stable_tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE feeding_schedules DISABLE ROW LEVEL SECURITY;

-- 6. Geef expliciete lees/schrijf rechten aan de API van de website
GRANT ALL ON TABLE facilities TO anon, authenticated, service_role;
GRANT ALL ON TABLE stable_tasks TO anon, authenticated, service_role;
GRANT ALL ON TABLE feeding_schedules TO anon, authenticated, service_role;

-- 7. Voeg wat test-boxen toe (zodat het scherm in het CMS gelijk vol staat)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM facilities LIMIT 1) THEN
    INSERT INTO facilities (name, type) VALUES 
    ('Box 1', 'Box'),
    ('Box 2', 'Box'),
    ('Box 3', 'Box'),
    ('Stapmolen 1', 'Stapmolen'),
    ('Buitenrijbak', 'Rijbak');
  END IF;
END $$;
