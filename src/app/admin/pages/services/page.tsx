import { getPageContent } from '@/app/actions/pages'
import PageBuilderClient from '@/components/admin/PageBuilderClient'

export const dynamic = 'force-dynamic'

export default async function AdminServicesPage() {
  let data = await getPageContent('services')

  if (!data) {
    data = {
      title: 'Our Services',
      hero_image: '/wellington_showjumper.png',
      content_blocks: []
    }
  }

  return <PageBuilderClient initialData={data} pageSlug="services" pageTitle="Services" />
}
