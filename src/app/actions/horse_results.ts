'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getHorseResults(horseId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('horse_results')
    .select('*')
    .eq('horse_id', horseId)
    .order('date', { ascending: false })
  
  if (error) throw new Error(error.message)
  return data || []
}

export async function addHorseResult(formData: FormData) {
  const supabase = await createClient()
  const horseId = formData.get('horseId') as string
  
  const resultData = {
    horse_id: horseId,
    date: formData.get('date') as string,
    event_name: formData.get('eventName') as string,
    level: formData.get('level') as string,
    result: formData.get('result') as string,
    video_url: formData.get('videoUrl') as string || null,
  }

  const { error } = await supabase.from('horse_results').insert([resultData])
  if (error) throw new Error(error.message)
    
  revalidatePath(`/admin/horses/${horseId}/edit`)
  revalidatePath(`/horses/${horseId}`)
}

export async function deleteHorseResult(id: string, horseId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('horse_results').delete().eq('id', id)
  if (error) throw new Error(error.message)
  
  revalidatePath(`/admin/horses/${horseId}/edit`)
  revalidatePath(`/horses/${horseId}`)
}
