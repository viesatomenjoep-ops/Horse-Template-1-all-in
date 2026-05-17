-- 1. Create facilities table
CREATE TABLE IF NOT EXISTS facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Box', 'Stapmolen', 'Rijbak', 'Paddock', 'Weide', 'Overig')),
    status TEXT DEFAULT 'Available',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Update horses table for Stable Management
-- We add these columns as IF NOT EXISTS so the script is safe to run multiple times.
ALTER TABLE horses 
ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES admin_permissions(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS current_box_id UUID REFERENCES facilities(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS passport_number TEXT,
ADD COLUMN IF NOT EXISTS chip_number TEXT,
ADD COLUMN IF NOT EXISTS management_status TEXT DEFAULT 'Active' CHECK (management_status IN ('Active', 'Resting', 'Rehabilitation', 'Sold', 'Deceased')),
ADD COLUMN IF NOT EXISTS tack_info TEXT;

-- 3. Create tasks (Digitaal Whiteboard) table
CREATE TABLE IF NOT EXISTS stable_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
    assigned_user_id UUID REFERENCES admin_permissions(id) ON DELETE SET NULL,
    task_type TEXT NOT NULL CHECK (task_type IN ('Training', 'Medisch', 'Voeding', 'Verzorging', 'Overig')),
    title TEXT NOT NULL,
    status TEXT DEFAULT 'To-do' CHECK (status IN ('To-do', 'Bezig', 'Klaar')),
    scheduled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. Create feeding_schedules table
CREATE TABLE IF NOT EXISTS feeding_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    horse_id UUID REFERENCES horses(id) ON DELETE CASCADE UNIQUE,
    roughage TEXT, -- e.g. "3 plakken hooi"
    concentrates TEXT, -- e.g. "2 scheppen sportbrok"
    supplements TEXT,
    medication TEXT,
    instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. Row Level Security Policies
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE stable_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE feeding_schedules ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users (staff, grooms, managers) to view and manage these tables
DROP POLICY IF EXISTS "Authenticated users can view facilities" ON facilities;
CREATE POLICY "Authenticated users can view facilities" ON facilities FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage facilities" ON facilities;
CREATE POLICY "Authenticated users can manage facilities" ON facilities FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can view tasks" ON stable_tasks;
CREATE POLICY "Authenticated users can view tasks" ON stable_tasks FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage tasks" ON stable_tasks;
CREATE POLICY "Authenticated users can manage tasks" ON stable_tasks FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can view feeding schedules" ON feeding_schedules;
CREATE POLICY "Authenticated users can view feeding schedules" ON feeding_schedules FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage feeding schedules" ON feeding_schedules;
CREATE POLICY "Authenticated users can manage feeding schedules" ON feeding_schedules FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. Triggers for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_stable_tasks_modtime ON stable_tasks;
CREATE TRIGGER update_stable_tasks_modtime
BEFORE UPDATE ON stable_tasks
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

DROP TRIGGER IF EXISTS update_feeding_schedules_modtime ON feeding_schedules;
CREATE TRIGGER update_feeding_schedules_modtime
BEFORE UPDATE ON feeding_schedules
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- 7. Insert some initial dummy facilities (Boxes) if table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM facilities LIMIT 1) THEN
    INSERT INTO facilities (name, type) VALUES 
    ('Box 1', 'Box'),
    ('Box 2', 'Box'),
    ('Stapmolen 1', 'Stapmolen'),
    ('Buitenrijbak', 'Rijbak');
  END IF;
END $$;
