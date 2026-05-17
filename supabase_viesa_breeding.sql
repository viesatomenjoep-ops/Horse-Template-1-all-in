-- ==========================================
-- VIESA STABLE MANAGEMENT - BREEDING EXPANSION
-- ==========================================

-- Voeg scan_image_url toe aan breeding_logs voor scan/echo foto's
ALTER TABLE breeding_logs ADD COLUMN IF NOT EXISTS scan_image_url TEXT;

-- Backup RLS bypass
ALTER TABLE breeding_logs DISABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE breeding_logs TO anon, authenticated, service_role;
