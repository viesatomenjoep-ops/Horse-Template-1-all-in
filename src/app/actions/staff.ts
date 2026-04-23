'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// --- EMPLOYEES ---

export async function getEmployees() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('employees').select('*').order('full_name')
  if (error) throw new Error(error.message)
  return data
}

export async function addEmployee(formData: FormData) {
  const supabase = await createClient()
  const fullName = formData.get('full_name') as string
  const pinCode = formData.get('pin_code') as string

  if (!fullName || !pinCode) return { error: 'Name and PIN are required' }

  const { error } = await supabase.from('employees').insert([{ full_name: fullName, pin_code: pinCode }])
  if (error) {
    console.error("Error adding employee:", error)
    return { error: error.message }
  }

  revalidatePath('/admin/staff')
  return { success: true }
}

export async function removeEmployee(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('employees').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/staff')
  return { success: true }
}

export async function staffLogin(pin: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('employees').select('*').eq('pin_code', pin).single()
  
  if (error || !data) return { error: 'Invalid PIN' }
  return { success: true, employee: data }
}

// --- LOGS (TIME TRACKING) ---

export async function clockIn(employeeId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('employee_logs').insert([{ employee_id: employeeId, action: 'clock_in' }])
  if (error) return { error: error.message }
  revalidatePath('/staff')
  revalidatePath('/admin/staff')
  return { success: true }
}

export async function clockOut(employeeId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('employee_logs').insert([{ employee_id: employeeId, action: 'clock_out' }])
  if (error) return { error: error.message }
  revalidatePath('/staff')
  revalidatePath('/admin/staff')
  return { success: true }
}

export async function getLogs(month: number, year: number) {
  const supabase = await createClient()
  // Generate start and end dates for the month
  const startDate = new Date(year, month - 1, 1).toISOString()
  const endDate = new Date(year, month, 0, 23, 59, 59).toISOString()

  const { data, error } = await supabase
    .from('employee_logs')
    .select('*, employees(full_name)')
    .gte('timestamp', startDate)
    .lte('timestamp', endDate)
    .order('timestamp', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function getLastAction(employeeId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('employee_logs')
    .select('*')
    .eq('employee_id', employeeId)
    .order('timestamp', { ascending: false })
    .limit(1)
    .single()
  
  if (error && error.code !== 'PGRST116') return null // Ignore 'no rows found' error
  return data
}

export async function getTodayHours(employeeId: string) {
  const supabase = await createClient()
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todayEnd = new Date()
  todayEnd.setHours(23, 59, 59, 999)

  const { data, error } = await supabase
    .from('employee_logs')
    .select('*')
    .eq('employee_id', employeeId)
    .gte('timestamp', todayStart.toISOString())
    .lte('timestamp', todayEnd.toISOString())
    .order('timestamp', { ascending: true })

  if (error || !data) return 0

  let totalMs = 0
  let lastIn: Date | null = null

  data.forEach((log: any) => {
    if (log.action === 'clock_in') {
      lastIn = new Date(log.timestamp)
    } else if (log.action === 'clock_out' && lastIn) {
      totalMs += new Date(log.timestamp).getTime() - lastIn.getTime()
      lastIn = null
    }
  })

  if (lastIn) {
    totalMs += new Date().getTime() - lastIn.getTime()
  }

  return totalMs
}

// --- TASKS ---

export async function getTasks(date: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('daily_tasks')
    .select('*, completed_by_emp:employees!completed_by(full_name)')
    .eq('task_date', date)
    .order('created_at', { ascending: true })

  if (error) throw new Error(error.message)
  return data
}

export async function addTask(formData: FormData) {
  const supabase = await createClient()
  const description = formData.get('description') as string
  const taskDate = formData.get('task_date') as string

  if (!description || !taskDate) return { error: 'Description and Date required' }

  const { error } = await supabase.from('daily_tasks').insert([{ description, task_date: taskDate }])
  if (error) return { error: error.message }

  revalidatePath('/admin/staff')
  revalidatePath('/staff')
  return { success: true }
}

export async function toggleTaskComplete(taskId: string, employeeId: string, isCompleted: boolean) {
  const supabase = await createClient()
  
  const updateData = isCompleted 
    ? { is_completed: true, completed_by: employeeId, completed_at: new Date().toISOString() }
    : { is_completed: false, completed_by: null, completed_at: null }

  const { error } = await supabase.from('daily_tasks').update(updateData).eq('id', taskId)
  if (error) return { error: error.message }

  revalidatePath('/staff')
  revalidatePath('/admin/staff')
  return { success: true }
}
