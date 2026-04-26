import { getHorse } from '@/app/actions/horse'
import { ArrowLeft, Ruler, Calendar, Shield, Trophy, FileText, Link as LinkIcon, Video, FileCheck, Stethoscope, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ViewTracker from '@/components/frontend/ViewTracker'

import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export default async function HorseDetailPage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  let horse = null
  
  try {
    horse = await getHorse(params.id)
  } catch (error) {
    notFound()
  }

  if (!horse) notFound()

  let canSeeROI = false

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const cookieStore = await cookies()
    const isInvestor = cookieStore.get('investor_auth')?.value === 'true'
    canSeeROI = !!user || isInvestor
  } catch (err) {
    console.error("Auth check failed on horse detail:", err)
    // Fallback safely to false
  }

  return (
    <div className="bg-gray-50 dark:bg-[#0A192F] min-h-screen">
      <ViewTracker horseId={horse.id} />
      {/* Hero Cover Image */}
      <div className="relative w-full h-[50vh] min-h-[400px] lg:h-[70vh]">
        <img 
          src={horse.cover_image_url || 'https://via.placeholder.com/1920x1080?text=No+Image'} 
          alt={horse.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
        
        <div className="absolute top-8 left-4 sm:left-8 z-10">
          <Link href="/horses" className="inline-flex items-center gap-2 text-white/90 hover:text-white hover:underline decoration-accent underline-offset-4 transition-all drop-shadow-md font-medium text-sm">
            <ArrowLeft size={18} />
            Back to Collection
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 lg:p-16 max-w-7xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-serif font-bold text-white drop-shadow-lg mb-4">{horse.name}</h1>
          <p className="text-xl sm:text-2xl text-accent font-light drop-shadow-md">{horse.discipline}</p>
        </div>
      </div>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12 xl:gap-16">
          
          {/* Main Details (Left/Middle) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-gray-200 dark:border-gray-800">
              <div className="flex flex-col items-start gap-2">
                <Calendar className="text-accent w-6 h-6" />
                <span className="text-xs uppercase tracking-widest text-gray-500">Birth Year</span>
                <span className="font-medium text-lg text-primary dark:text-white">{horse.birth_year}</span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Shield className="text-accent w-6 h-6" />
                <span className="text-xs uppercase tracking-widest text-gray-500">Gender</span>
                <span className="font-medium text-lg text-primary dark:text-white">{horse.gender}</span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Ruler className="text-accent w-6 h-6" />
                <span className="text-xs uppercase tracking-widest text-gray-500">Height</span>
                <span className="font-medium text-lg text-primary dark:text-white">{horse.height_cm ? `${horse.height_cm} cm` : 'TBD'}</span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Trophy className="text-accent w-6 h-6" />
                <span className="text-xs uppercase tracking-widest text-gray-500">Level</span>
                <span className="font-medium text-lg text-primary dark:text-white">{horse.experience_level || '-'}</span>
              </div>
            </div>

            {/* Pedigree */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-primary dark:text-white mb-6">Pedigree</h2>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
                <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 pr-6">
                  <span className="text-sm text-gray-500 uppercase tracking-widest block mb-1">Sire</span>
                  <span className="text-xl font-medium text-primary dark:text-white">{horse.sire || 'Unknown'}</span>
                </div>
                <div className="w-1/2 pl-6">
                  <span className="text-sm text-gray-500 uppercase tracking-widest block mb-1">Dam Sire</span>
                  <span className="text-xl font-medium text-primary dark:text-white">{horse.dam_sire || 'Unknown'}</span>
                </div>
              </div>
            </div>

            {/* Investor ROI Section */}
            {canSeeROI && (horse.estimated_roi || horse.investment_rationale) && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 border-2 border-green-500/30 rounded-2xl p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl"></div>
                <h2 className="text-2xl font-serif font-bold text-green-800 dark:text-green-400 mb-6 flex items-center">
                  <TrendingUp className="mr-3 text-green-600 dark:text-green-500" /> Investment Prospect
                </h2>
                
                <div className="space-y-6">
                  {horse.estimated_roi && (
                    <div className="bg-white/60 dark:bg-gray-900/50 rounded-xl p-4 border border-green-500/20">
                      <span className="text-sm font-bold text-green-700 dark:text-green-500 uppercase tracking-widest block mb-1">Estimated ROI</span>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{horse.estimated_roi}</span>
                    </div>
                  )}
                  
                  {horse.investment_rationale && (
                    <div>
                      <span className="text-sm font-bold text-green-700 dark:text-green-500 uppercase tracking-widest block mb-2">Why this horse?</span>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        {horse.investment_rationale}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Documents & Links */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-primary dark:text-white mb-6">Horse Documents & Links</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Vet Check */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 flex items-center shadow-sm">
                  <Stethoscope className="w-8 h-8 text-accent mr-4" />
                  <div className="flex flex-col">
                    <span className="font-medium text-primary dark:text-white">Vet Check / Keuring</span>
                    {horse.doc_vet_check ? (
                      <a href={horse.doc_vet_check} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">View Document</a>
                    ) : (
                      <span className="text-sm text-gray-400">Pending</span>
                    )}
                  </div>
                </div>

                {/* X-Rays */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 flex items-center shadow-sm">
                  <FileText className="w-8 h-8 text-accent mr-4" />
                  <div className="flex flex-col">
                    <span className="font-medium text-primary dark:text-white">X-Rays</span>
                    {horse.doc_xrays ? (
                      <a href={horse.doc_xrays} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">View Document</a>
                    ) : (
                      <span className="text-sm text-gray-400">Pending</span>
                    )}
                  </div>
                </div>

                {/* Passport Scan */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 flex items-center shadow-sm">
                  <FileCheck className="w-8 h-8 text-accent mr-4" />
                  <div className="flex flex-col">
                    <span className="font-medium text-primary dark:text-white">Passport Scan</span>
                    {horse.doc_passport ? (
                      <a href={horse.doc_passport} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">View Document</a>
                    ) : (
                      <span className="text-sm text-gray-400">Pending</span>
                    )}
                  </div>
                </div>

                {/* FEI / Lifescore */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 flex items-center shadow-sm">
                  <LinkIcon className="w-8 h-8 text-accent mr-4" />
                  <div className="flex flex-col">
                    <span className="font-medium text-primary dark:text-white">FEI / Lifescore</span>
                    {horse.link_fei ? (
                      <a href={horse.link_fei} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">View Profile</a>
                    ) : (
                      <span className="text-sm text-gray-400">Pending</span>
                    )}
                  </div>
                </div>

                {/* HorseTelex */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 flex items-center shadow-sm">
                  <LinkIcon className="w-8 h-8 text-accent mr-4" />
                  <div className="flex flex-col">
                    <span className="font-medium text-primary dark:text-white">HorseTelex</span>
                    {horse.link_horsetelex ? (
                      <a href={horse.link_horsetelex} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">View Pedigree</a>
                    ) : (
                      <span className="text-sm text-gray-400">Pending</span>
                    )}
                  </div>
                </div>

                {/* Video */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 flex items-center shadow-sm">
                  <Video className="w-8 h-8 text-accent mr-4" />
                  <div className="flex flex-col">
                    <span className="font-medium text-primary dark:text-white">Video</span>
                    {horse.link_video ? (
                      <a href={horse.link_video} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">Watch Video</a>
                    ) : (
                      <span className="text-sm text-gray-400">Pending</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Competition Results */}
            {horse.horse_results && horse.horse_results.length > 0 && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-primary dark:text-white mb-6 flex items-center">
                  <Trophy className="mr-3 text-accent" /> Competition Results
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                      <thead className="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                          <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Event</th>
                          <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Level</th>
                          <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Result</th>
                          <th className="px-6 py-4 text-center font-medium text-gray-500 uppercase tracking-wider">Video</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {horse.horse_results.map((r: any) => (
                          <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100 font-medium">
                              {new Date(r.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </td>
                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{r.event_name}</td>
                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{r.level}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-accent font-bold">{r.result}</td>
                            <td className="px-6 py-4 text-center">
                              {r.video_url ? (
                                <a href={r.video_url} target="_blank" rel="noopener noreferrer" className="inline-flex p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors" title="Watch Video">
                                  <Video size={16} />
                                </a>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            {horse.description && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-primary dark:text-white mb-6">About {horse.name}</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                  {horse.description.split('\n').map((paragraph: string, idx: number) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
            
            {/* Future Media Gallery placeholder */}
            {horse.media && horse.media.length > 0 && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-primary dark:text-white mb-6">Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {horse.media.map((item: any) => (
                    <div key={item.id} className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden bg-gray-100">
                      {item.type === 'image' ? (
                        <img src={item.url} alt="Gallery item" className="object-cover w-full h-full" />
                      ) : (
                        <video src={item.url} controls className="object-cover w-full h-full" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Inquiry Panel (Right) */}
          <div className="mt-12 lg:mt-0">
            <div className="sticky top-32 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="mb-8">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 ${
                  horse.status === 'Available' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  horse.status === 'Sold' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                  'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                }`}>
                  {horse.status}
                </span>
                
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">Price Category</h3>
                <p className="text-3xl font-serif font-bold text-primary dark:text-white">{horse.price_category}</p>
              </div>

              <div className="space-y-4">
                <Link 
                  href={`/contact?horse=${horse.id}`} 
                  className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg text-base font-medium text-white transition-all duration-300 ${
                    horse.status === 'Available' ? 'bg-primary hover:bg-secondary shadow-md hover:shadow-lg' : 'bg-gray-400 cursor-not-allowed opacity-70'
                  }`}
                  aria-disabled={horse.status !== 'Available'}
                >
                  {horse.status === 'Available' ? `Inquire about ${horse.name}` : 'Not Available'}
                </Link>
                <p className="text-center text-xs text-gray-500">
                  Serious inquiries only. Vetting and trials available upon request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
