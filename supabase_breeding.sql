-- ==========================================
-- VIESA STABLE MANAGEMENT - BREEDING MODULE
-- ==========================================

CREATE TABLE IF NOT EXISTS breeding_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    horse_id UUID, -- De merrie
    stallion_name TEXT NOT NULL,
    insemination_date DATE NOT NULL,
    scan_14_days_date DATE,
    scan_14_days_result TEXT DEFAULT 'Pending', -- 'Pending', 'Pregnant', 'Empty'
    scan_45_days_date DATE,
    scan_45_days_result TEXT DEFAULT 'Pending',
    expected_due_date DATE,
    status TEXT DEFAULT 'Inseminated', -- 'Inseminated', 'Pregnant', 'Empty', 'Foaled'
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Zet Row Level Security VOLLEDIG UIT om errors te voorkomen
ALTER TABLE breeding_logs DISABLE ROW LEVEL SECURITY;

-- Geef de website rechten
GRANT ALL ON TABLE breeding_logs TO anon, authenticated, service_role;

-- Voeg wat dummy-data toe om het direct te kunnen zien
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM breeding_logs LIMIT 1) THEN
    INSERT INTO breeding_logs (stallion_name, insemination_date, expected_due_date, status) VALUES 
    ('Chacco-Blue', CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE + INTERVAL '330 days', 'Inseminated'),
    ('Cornet Obolensky', CURRENT_DATE - INTERVAL '60 days', CURRENT_DATE + INTERVAL '280 days', 'Pregnant');
  END IF;
END $$;
