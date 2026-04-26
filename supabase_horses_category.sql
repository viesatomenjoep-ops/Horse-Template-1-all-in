-- Add category to horses table to separate Sales and Investment horses
ALTER TABLE horses ADD COLUMN IF NOT EXISTS category text DEFAULT 'sales';

-- Optional: If you want to restrict the values, uncomment below
-- ALTER TABLE horses ADD CONSTRAINT check_horse_category CHECK (category IN ('sales', 'investment'));
