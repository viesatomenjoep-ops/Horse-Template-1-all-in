require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const dummyNames = [
    'Springprofessional 22',
    'Springprofessional 1',
    'Springende Pro 2',
    'Springende Pro 3',
    'Springende Pro 4',
    'Springende Pro 5',
    'Springende Pro 6',
    'Springprofessional 18',
    'Springprofessional 19',
    'Springprofessional 20',
    'Springprofessional 21',
    'Dressuurster 11',
    'Springende Pro 7',
    'Springende Pro 8',
    'Springende Pro 9',
    'Luna - Levisto x Balou du Rouet',
    'Springprofessional 10',
    'Dressuurster 1',
    'Dressuurster 2',
    'Dressuurster 3',
    'Dressuurster 4',
    'Dressuurster 5',
    'Dressuurster 6',
    'Dressuurster 7',
    'Dressuurster 8',
    'Dressuurster 9',
    'Dressuurster 10',
    'Springprofessional 11',
    'Springprofessional 12',
    'Springprofessional 13',
    'Springprofessional 14',
    'Springprofessional 15',
    'Springende professional 16',
    'Springprofessional 17'
  ];

  console.log("Deleting dummy horses...");
  const { data, error } = await supabase.from('horses').delete().in('name', dummyNames);
  
  if (error) {
    console.error("Error deleting horses:", error);
  } else {
    console.log("Deletion successful.");
  }
}
run();
