'use server'

import { createClient } from '@/lib/supabase/server'
import { unstable_noStore as noStore } from 'next/cache'

// Called on the public page when a horse is viewed
export async function incrementHorseView(horseId: string) {
  // Try to use the RPC function first
  const supabase = await createClient()
  await supabase.rpc('increment_horse_view', { horse_id: horseId })
}

// Fetch analytics for the dashboard
export async function getDashboardStats() {
  noStore() // Ensure we don't cache dashboard stats
  const supabase = await createClient()
  
  // Get top viewed horses
  const { data: topHorses } = await supabase
    .from('horses')
    .select('id, name, views, image_url')
    .order('views', { ascending: false, nullsFirst: false })
    .limit(5)
    
  // Get total horses
  const { count: totalHorses } = await supabase
    .from('horses')
    .select('id', { count: 'exact', head: true })
    
  // Get total appointments
  const { count: totalAppointments } = await supabase
    .from('appointments')
    .select('id', { count: 'exact', head: true })

  // Get total quotes
  const { count: totalQuotes } = await supabase
    .from('quotes')
    .select('id', { count: 'exact', head: true })

  // Get inventory data for financial dashboard
  const { data: inventoryData } = await supabase
    .from('inventory_items')
    .select('quantity, purchase_price, selling_price')
    
  let inventoryCost = 0;
  let inventoryValue = 0;
  
  if (inventoryData) {
    inventoryData.forEach(item => {
      const q = Number(item.quantity) || 0;
      const buy = Number(item.purchase_price) || 0;
      const sell = Number(item.selling_price) || 0;
      inventoryCost += (q * buy);
      inventoryValue += (q * sell);
    });
  }

  return {
    topHorses: topHorses || [],
    totalHorses: totalHorses || 0,
    totalAppointments: totalAppointments || 0,
    totalQuotes: totalQuotes || 0,
    inventoryCost,
    inventoryValue,
    inventoryProfit: inventoryValue - inventoryCost
  }
}
