import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.equivestworldwide.com'
  
  // Base static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/horses`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/investors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/references`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]

  // Dynamic Horse pages
  try {
    const supabase = await createClient()
    const { data: horses } = await supabase
      .from('horses')
      .select('id, updated_at')
      .eq('status', 'Available')

    if (horses) {
      const horseRoutes: MetadataRoute.Sitemap = horses.map((horse) => ({
        url: `${baseUrl}/horses/${horse.id}`,
        lastModified: horse.updated_at ? new Date(horse.updated_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }))
      
      return [...routes, ...horseRoutes]
    }
  } catch (err) {
    console.error("Failed to generate dynamic sitemap routes:", err)
  }

  return routes
}
