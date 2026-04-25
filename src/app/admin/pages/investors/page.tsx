import { getPageContent } from '@/app/actions/pages'
import PageBuilderClient from './PageBuilderClient'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function AdminInvestorsPage() {
  const data = await getPageContent('investors')

  if (!data) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold mb-4">Pagina niet gevonden</h1>
        <p>Run de "supabase_page_builder.sql" in je Supabase SQL Editor om deze pagina te activeren.</p>
      </div>
    )
  }

  return <PageBuilderClient initialData={data} />
}
