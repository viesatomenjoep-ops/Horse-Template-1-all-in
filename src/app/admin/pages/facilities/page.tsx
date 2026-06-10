import { getPageContent } from '@/app/actions/pages'
import PageBuilderClient from '@/components/admin/PageBuilderClient'

export const dynamic = 'force-dynamic'

export default async function AdminFacilitiesPage() {
  let data = await getPageContent('facilities')

  if (!data) {
    data = {
      title: 'Our Facilities',
      hero_image: '/facilities_arena.jpg',
      content_blocks: []
    }
  }

  return <PageBuilderClient initialData={data} pageSlug="facilities" pageTitle="Facilities" />
}
