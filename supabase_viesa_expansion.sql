-- ==========================================
-- VIESA STABLE MANAGEMENT - EXPANSION PACK
-- ==========================================

-- 1. Contacts & Teams (Dierenartsen, Hoefsmeden, Eigenaren, Personeel)
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'Other', -- 'Vet', 'Farrier', 'Owner', 'Transporter', 'Staff', 'Other'
    email TEXT,
    phone TEXT,
    company TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Health & Medical Logs (Medisch Dossier per paard)
CREATE TABLE IF NOT EXISTS health_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    horse_id UUID,
    type TEXT NOT NULL DEFAULT 'Vet Check', -- 'Vaccination', 'Deworming', 'Dentist', 'Farrier', 'Vet Check', 'Surgery', 'Other'
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    contact_id UUID, -- Koppeling naar de dierenarts/hoefsmid in contacts
    description TEXT,
    cost DECIMAL,
    next_due_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Documents (Centrale Documenten opslag)
CREATE TABLE IF NOT EXISTS stable_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    horse_id UUID, -- Als NULL, dan is het een algemeen stal-document
    title TEXT NOT NULL,
    file_type TEXT NOT NULL DEFAULT 'Other', -- 'Passport', 'X-Ray', 'Vet Report', 'Contract', 'Invoice', 'Other'
    file_url TEXT NOT NULL,
    expiry_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. Zet Row Level Security VOLLEDIG UIT om "Permission Denied" errors te voorkomen
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE health_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE stable_documents DISABLE ROW LEVEL SECURITY;

-- 5. Geef expliciete lees/schrijf rechten aan de API
GRANT ALL ON TABLE contacts TO anon, authenticated, service_role;
GRANT ALL ON TABLE health_logs TO anon, authenticated, service_role;
GRANT ALL ON TABLE stable_documents TO anon, authenticated, service_role;

-- 6. Voeg wat test-data toe zodat het CMS meteen leeft
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM contacts LIMIT 1) THEN
    INSERT INTO contacts (name, role, company) VALUES 
    ('Dr. Jansen', 'Vet', 'Dierenkliniek De Paardenkamp'),
    ('Piet Smid', 'Farrier', 'Smederij Piet'),
    ('Stal Transport B.V.', 'Transporter', 'Stal Transport B.V.');
  END IF;
END $$;
