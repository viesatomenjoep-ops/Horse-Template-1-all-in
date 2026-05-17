-- ==========================================
-- VIESA STABLE MANAGEMENT - HEALTH DOCS EXPANSION
-- ==========================================

-- Voeg document_url toe aan health_logs (als deze nog niet bestaat)
ALTER TABLE health_logs ADD COLUMN IF NOT EXISTS document_url TEXT;

-- Zorg ervoor dat iedereen er weer bij kan (als backup)
GRANT ALL ON TABLE health_logs TO anon, authenticated, service_role;
