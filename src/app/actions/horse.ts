'use server'

import { createClient } from '@/lib/supabase/server'
import { createPublicClient } from '@/lib/supabase/public'
import { revalidatePath } from 'next/cache'

export async function getHorses() {
  const supabase = createPublicClient()
  const { data, error } = await supabase.from('horses').select('*').order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data
}

export async function getPublicHorses() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    // If logged in (investor/admin), show ALL horses on the public page too
    const { data, error } = await supabase.from('horses').select('*').order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return data
  } else {
    // If not logged in, only show sales horses
    const { data, error } = await supabase.from('horses').select('*').eq('category', 'sales').order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return data
  }
}

export async function getInvestmentHorses() {
  // Requires user auth to view investment horses
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized: Only for private investors")

  // Investors can see ALL horses (both sales and investment)
  const { data, error } = await supabase.from('horses').select('*').order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data
}

export async function getHorse(id: string) {
  const supabase = createPublicClient()
  
  // Try with media first
  const { data: horse, error } = await supabase
    .from('horses')
    .select('*, horse_media(*), horse_results(*)')
    .eq('id', id)
    .single()
  
  if (error) {
     // Fallback if the media relation fails for ANY reason
     const fallback = await supabase.from('horses').select('*, horse_results(*)').eq('id', id).single()
     if (fallback.error) throw new Error(fallback.error.message)
     return { ...fallback.data, media: [] }
  }

  if (!horse) throw new Error("Horse not found")
  return horse
}

export async function createHorse(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to create a horse.' }
  }
  
  const rawData = {
    name: formData.get('name') as string,
    category: formData.get('category') as string || 'sales',
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
    doc_vet_check: formData.get('doc_vet_check') as string || null,
    doc_xrays: formData.get('doc_xrays') as string || null,
    doc_passport: formData.get('doc_passport') as string || null,
    link_fei: formData.get('link_fei') as string || null,
    link_horsetelex: formData.get('link_horsetelex') as string || null,
    link_video: formData.get('link_video') as string || null,
  }

  const { data, error } = await supabase.from('horses').insert([rawData]).select().single()
  
  if (error) {
    console.error("Supabase insert error details:", error)
    return { error: `Database error: ${error.message} (Code: ${error.code})` }
  }
  
  revalidatePath('/admin/horses')
  revalidatePath('/horses')
  
  return { success: true, data }
}

export async function updateHorseStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('horses').update({ status }).eq('id', id)
  
  if (error) return { error: error.message }
  
  revalidatePath('/admin/horses')
  revalidatePath(`/horses/${id}`)
  return { success: true }
}

export async function updateHorse(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'You must be logged in to update a horse.' }
  
  const rawData: any = {
    name: formData.get('name') as string,
    category: formData.get('category') as string || 'sales',
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
    doc_vet_check: formData.get('doc_vet_check') as string || null,
    doc_xrays: formData.get('doc_xrays') as string || null,
    doc_passport: formData.get('doc_passport') as string || null,
    link_fei: formData.get('link_fei') as string || null,
    link_horsetelex: formData.get('link_horsetelex') as string || null,
    link_video: formData.get('link_video') as string || null,
  }

  const coverImageUrl = formData.get('cover_image_url') as string
  if (coverImageUrl) {
    rawData.cover_image_url = coverImageUrl
  }

  const { data, error } = await supabase.from('horses').update(rawData).eq('id', id).select().single()
  
  if (error) return { error: error.message || 'Unknown database error' }
  
  revalidatePath('/admin/horses')
  revalidatePath('/horses')
  revalidatePath(`/horses/${id}`)
  
  return { success: true, data }
}

export async function deleteHorse(id: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'You must be logged in to delete a horse.' }
  
  const { error } = await supabase.from('horses').delete().eq('id', id)
  
  if (error) return { error: error.message }
  
  revalidatePath('/admin/horses')
  revalidatePath('/horses')
  
  return { success: true }
}
