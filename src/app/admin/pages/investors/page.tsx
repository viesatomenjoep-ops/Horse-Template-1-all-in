import { getPageContent } from '@/app/actions/pages'
import PageBuilderClient from './PageBuilderClient'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function AdminInvestorsPage() {
  let data = await getPageContent('investors')

  if (!data) {
    data = {
      title: 'Invest in Excellence',
      hero_image: '/about-bg.jpg',
      content_blocks: [
        {"id": "1", "type": "heading", "content": "Why Invest in Showjumpers?", "size": "text-4xl"},
        {"id": "2", "type": "text", "content": "The equestrian sport has transitioned from a passion-driven pursuit into a highly professional, multi-billion-dollar global industry. At the pinnacle of this industry sits the showjumping market, where demand for top-tier equine athletes consistently outpaces supply.", "size": "text-lg"},
        {"id": "3", "type": "text", "content": "By partnering with Equivest, you gain direct access to our extensive network in the heart of the equestrian world: the Netherlands, Belgium, and Germany. We meticulously select, train, and export exceptional horses to the United States, where the market commands significant premiums.", "size": "text-lg"},
        {"id": "4", "type": "heading", "content": "Return on Investment (ROI)", "size": "text-4xl"},
        {"id": "5", "type": "text", "content": "Investing in sport horses is classified as an alternative asset class. While it carries inherent risks, the potential returns significantly outpace traditional markets when managed by experts.", "size": "text-lg"}
      ]
    }
  }

  return <PageBuilderClient initialData={data} />
}
