'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getHorses() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('horses').select('*').order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data
}

export async function getHorse(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('horses').select('*, media(*)').eq('id', id).single()
  if (error) throw new Error(error.message)
  return data
}

export async function createHorse(formData: FormData) {
  const supabase = await createClient()
  
  const rawData = {
    name: formData.get('name') as string,
    price_category: formData.get('price_category') as string,
    birth_year: parseInt(formData.get('birth_year') as string),
    gender: formData.get('gender') as string,
    height_cm: parseInt(formData.get('height_cm') as string) || null,
    discipline: formData.get('discipline') as string,
    experience_level: formData.get('experience_level') as string,
    sire: formData.get('sire') as string,
    dam_sire: formData.get('dam_sire') as string,
    description: formData.get('description') as string,
    status: formData.get('status') as string,
    cover_image_url: formData.get('cover_image_url') as string || null,
  }

  const { data, error } = await supabase.from('horses').insert([rawData]).select().single()
  
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/horses')
  revalidatePath('/(frontend)/horses')
  
  return data
}

export async function updateHorseStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('horses').update({ status }).eq('id', id)
  
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/horses')
  revalidatePath(`/(frontend)/horses/${id}`)
}
