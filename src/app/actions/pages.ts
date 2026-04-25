'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getPageContent(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('site_pages').select('*').eq('slug', slug).single()
  
  if (error || !data) {
    console.error("Page fetch error:", error?.message)
    return null
  }
  return data
}

export async function updatePageContent(slug: string, updateData: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('site_pages').update(updateData).eq('slug', slug)
  
  if (error) {
    throw new Error(error.message)
  }
  
  revalidatePath(`/${slug}`)
  revalidatePath(`/admin/pages/${slug}`)
  return { success: true }
}
