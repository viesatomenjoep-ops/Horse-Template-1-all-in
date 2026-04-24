import { getHorses } from '@/app/actions/horse'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function AdminHorsesPage() {
  let horses = [];
  try {
    horses = await getHorses() || [];
  } catch (error) {
    console.error("Supabase not configured yet.");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Horses Inventory</h1>
        <Link href="/admin/horses/new" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors text-sm font-medium">
          <Plus size={16} />
          Add Horse
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* ADD NEW HORSE CARD */}
        <Link 
          href="/admin/horses/new" 
          className="bg-primary/5 hover:bg-primary/10 border-2 border-dashed border-primary/30 hover:border-primary/50 rounded-2xl flex flex-col items-center justify-center p-8 transition-all duration-200 min-h-[250px] group"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus size={32} className="text-primary" />
          </div>
          <h3 className="text-lg font-bold text-primary">Nieuw Paard Toevoegen</h3>
          <p className="text-sm text-gray-500 text-center mt-2">Maak een nieuw profiel aan in het portfolio</p>
        </Link>

        {/* HORSE CARDS */}
        {horses.length === 0 ? (
          <div className="col-span-full bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 text-center text-gray-500">
            Nog geen paarden gevonden. Klik op "Nieuw Paard Toevoegen" om te beginnen.
          </div>
        ) : (
          horses.map((horse: any) => (
            <div key={horse.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all flex flex-col">
              <div className="relative h-48 bg-gray-100 dark:bg-gray-900">
                {horse.cover_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={horse.cover_image_url} alt={horse.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">Geen foto</div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/90 text-gray-900 shadow-sm backdrop-blur-sm">
                    {horse.status}
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{horse.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{horse.discipline} • {horse.birth_year}</p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-2">
                  <Link 
                    href={`/admin/horses/${horse.id}/edit`} 
                    className="flex-1 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2 rounded-xl text-center transition-colors text-sm"
                  >
                    Bewerken
                  </Link>
                  <form action={async () => {
                    'use server';
                    const { deleteHorse } = await import('@/app/actions/horse');
                    await deleteHorse(horse.id);
                  }} className="flex-none">
                    <button type="submit" className="px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 font-medium rounded-xl transition-colors text-sm">
                      Verwijder
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
