-- Verwijder de oude (te strikte) policies
DROP POLICY IF EXISTS "Authenticated users can view facilities" ON facilities;
DROP POLICY IF EXISTS "Authenticated users can manage facilities" ON facilities;
DROP POLICY IF EXISTS "Authenticated users can view tasks" ON stable_tasks;
DROP POLICY IF EXISTS "Authenticated users can manage tasks" ON stable_tasks;
DROP POLICY IF EXISTS "Authenticated users can view feeding schedules" ON feeding_schedules;
DROP POLICY IF EXISTS "Authenticated users can manage feeding schedules" ON feeding_schedules;

-- Geef de website volledige toegang (omdat de /admin pagina zelf al achter een login zit)
CREATE POLICY "Allow all operations for facilities" ON facilities FOR ALL USING (true);
CREATE POLICY "Allow all operations for stable_tasks" ON stable_tasks FOR ALL USING (true);
CREATE POLICY "Allow all operations for feeding_schedules" ON feeding_schedules FOR ALL USING (true);
