import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function test() {
  console.log("Testing tasks fetch...")
  const { data: tasks, error: tasksError } = await supabase
    .from('stable_tasks')
    .select('*')
    .order('scheduled_at', { ascending: true })

  console.log("Tasks Error:", tasksError)
  console.log("Tasks Data Length:", tasks ? tasks.length : 0)

  console.log("\nTesting horses fetch...")
  const { data: horses, error: horsesError } = await supabase
    .from('horses')
    .select('*')
    .limit(1)

  console.log("Horses Error:", horsesError)
  console.log("Horses Data Length:", horses ? horses.length : 0)
}
test()
