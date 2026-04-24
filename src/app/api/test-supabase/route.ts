import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  
  // Test insert
  const { data: employees } = await supabase.from('employees').select('id').limit(1)
  if (!employees || employees.length === 0) return NextResponse.json({ error: 'No employees' })
  
  const insertRes = await supabase.from('staff_schedules').insert([{
    employee_id: employees[0].id,
    shift_date: '2026-05-01',
    start_time: '08:00',
    end_time: '17:00',
    shift_type: 'Test Shift'
  }]).select()

  // Test select
  const selectRes = await supabase.from('staff_schedules').select('*, employees(full_name)')
  const selectResAliased = await supabase.from('staff_schedules').select('*, employee:employees(full_name)')

  return NextResponse.json({
    insert: insertRes,
    select: selectRes,
    selectAliased: selectResAliased
  })
}
