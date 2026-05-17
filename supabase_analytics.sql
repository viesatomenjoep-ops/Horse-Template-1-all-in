-- Add views column to horses table if it doesn't exist
ALTER TABLE horses ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- Create an RPC function to safely increment the views counter
-- This prevents race conditions when multiple users view at the same time
CREATE OR REPLACE FUNCTION increment_horse_view(horse_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE horses
  SET views = views + 1
  WHERE id = horse_id;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions for the function
GRANT EXECUTE ON FUNCTION increment_horse_view(UUID) TO anon, authenticated;

-- Reload schema
NOTIFY pgrst, 'reload schema';
