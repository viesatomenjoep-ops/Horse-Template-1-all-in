-- Add a sort_order column to the horses table
ALTER TABLE horses ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Optional: Initialize sort_order to match the current chronological order so the current display isn't changed abruptly
WITH ordered_horses AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) as new_order
  FROM horses
)
UPDATE horses
SET sort_order = ordered_horses.new_order
FROM ordered_horses
WHERE horses.id = ordered_horses.id;
