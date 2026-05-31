import { getHorse } from '@/app/actions/horse'
import { ArrowLeft, Ruler, Calendar, Shield, Trophy, FileText, Link as LinkIcon, Video, FileCheck, Stethoscope, TrendingUp, CheckCircle2, DollarSign, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ViewTracker from '@/components/frontend/ViewTracker'
import VideoModal from '@/components/frontend/VideoModal'
import { Metadata } from 'next'

import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params
  try {
    const horse = await getHorse(params.id)
    if (!horse) return { title: 'Horse Not Found | Equivest' }
    
    const desc = horse.description ? horse.description.substring(0, 150) + '...' : `Elite ${horse.discipline} available at Equivest. View pedigree, videos, and investment details.`
    return {
      title: `${horse.name} | Premium ${horse.discipline} | Equivest`,
      description: desc,
      openGraph: {
        title: `${horse.name} | Premium ${horse.discipline}`,
        description: desc,
        images: horse.cover_image_url ? [horse.cover_image_url] : [],
      }
    }
  } catch (e) {
    return { title: 'Equivest | Premium Sport Horses' }
  }
}

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

  const rawPrice = horse.price_category || '';
  const isPartial = rawPrice.includes('(Partial Ownership)');
  const cleanPrice = rawPrice.replace(' (Partial Ownership)', '');

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: horse.name,
    image: horse.cover_image_url ? [horse.cover_image_url] : [],
    description: horse.description || `Elite ${horse.discipline} available at Equivest.`,
    brand: {
      '@type': 'Brand',
      name: 'Equivest'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: (cleanPrice && cleanPrice !== 'Price on Request') ? cleanPrice.replace(/[^0-9]/g, '000') : '0',
      availability: horse.status === 'Available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://www.equivestworldwide.com/horses/${horse.id}`
    }
  }

  return (
    <div className="bg-white dark:bg-[#0A192F] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <ViewTracker horseId={horse.id} />
      {/* Hero Cover Image in a Frame */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative w-full h-[50vh] min-h-[400px] lg:h-[70vh] bg-white dark:bg-gray-900 rounded-3xl flex justify-center items-center overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
          <img 
            src={horse.cover_image_url || '/logo.png'} 
            alt={horse.name}
            className={`relative z-10 w-full h-full ${horse.cover_image_url ? 'object-contain' : 'object-contain p-20 opacity-30'}`}
          />
          
          {/* Back Button */}
          <div className="absolute top-6 left-6 z-30">
            <Link 
              href="/horses"
              className="inline-flex items-center px-5 py-2.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-900 dark:text-white rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-sm font-medium text-sm border border-gray-200 dark:border-gray-700 group"
            >
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to the collection
            </Link>
          </div>
        </div>
      </div>

      {/* Horse Name and Title (Moved below image) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8">
          <p className="text-accent font-bold uppercase tracking-widest text-lg md:text-xl mb-3">{horse.discipline}</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white">{horse.name}</h1>
        </div>
      </div>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12 xl:gap-16">
          
          {/* Main Details (Left/Middle) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-gray-200 dark:border-gray-800">
              <div className="flex flex-col items-start gap-2">
                <Calendar className="text-accent w-6 h-6" />
                <span className="text-xs uppercase tracking-widest text-gray-500">Birth Year</span>
                <span className="font-medium text-lg text-primary dark:text-white">{horse?.birth_year || '-'}</span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Shield className="text-accent w-6 h-6" />
                <span className="text-xs uppercase tracking-widest text-gray-500">Gender</span>
                <span className="font-medium text-lg text-primary dark:text-white">{horse?.gender || '-'}</span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Ruler className="text-accent w-6 h-6" />
                <span className="text-xs uppercase tracking-widest text-gray-500">Height</span>
                <span className="font-medium text-lg text-primary dark:text-white">{horse?.height_cm ? `${horse.height_cm} cm` : 'TBD'}</span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Trophy className="text-accent w-6 h-6" />
                <span className="text-xs uppercase tracking-widest text-gray-500">Level</span>
                <span className="font-medium text-lg text-primary dark:text-white">{horse?.experience_level || '-'}</span>
              </div>
            </div>

            {/* Pedigree */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-primary dark:text-white mb-6">Pedigree</h2>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
                <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 pr-6">
                  <span className="text-sm text-gray-500 uppercase tracking-widest block mb-1">Sire</span>
                  <span className="text-xl font-medium text-primary dark:text-white">{horse?.sire || 'Unknown'}</span>
                </div>
                <div className="w-1/2 pl-6">
                  <span className="text-sm text-gray-500 uppercase tracking-widest block mb-1">Dam Sire</span>
                  <span className="text-xl font-medium text-primary dark:text-white">{horse?.dam_sire || 'Unknown'}</span>
                </div>
              </div>
            </div>

            {/* Investor ROI Section */}
            {canSeeROI && (horse?.estimated_roi || horse?.investment_rationale) && (
              <InvestmentProspect roi={horse.estimated_roi} rationale={horse.investment_rationale} />
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
                    {horse?.doc_vet_check ? (
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
                    {horse?.doc_xrays ? (
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
                    {horse?.doc_passport ? (
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
                    {horse?.link_fei ? (
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
                    {horse?.link_horsetelex ? (
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
                    {horse?.link_video ? (
                      <VideoModal videoUrl={horse.link_video} title={`${horse.name} - General Video`} className="text-sm text-accent hover:underline text-left">
                        Watch Video
                      </VideoModal>
                    ) : (
                      <span className="text-sm text-gray-400">Pending</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Competition Results */}
            {horse?.horse_results && Array.isArray(horse.horse_results) && horse.horse_results.length > 0 && (
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
                              {r.date ? new Date(r.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                            </td>
                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{r.event_name || '-'}</td>
                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{r.level || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-accent font-bold">{r.result || '-'}</td>
                            <td className="px-6 py-4 text-center">
                              {r.video_url ? (
                                <VideoModal videoUrl={r.video_url} title={`${horse.name} - ${r.event_name || 'Competition Video'}`} className="inline-flex p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                                  <Video size={16} />
                                </VideoModal>
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
            {horse?.description && typeof horse.description === 'string' && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-primary dark:text-white mb-6">About {horse.name}</h2>
                <div className="text-gray-600 dark:text-gray-300">
                  {formatDescription(horse.description as string)}
                </div>
              </div>
            )}
            
            {/* Future Media Gallery placeholder */}
            {(horse?.media || horse?.horse_media) && Array.isArray(horse.media || horse.horse_media) && (horse.media || horse.horse_media).length > 0 && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-primary dark:text-white mb-6">Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {(horse.media || horse.horse_media).map((item: any) => (
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
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">Price</h3>
                <p className="text-3xl font-serif font-bold text-primary dark:text-white">
                  {cleanPrice && !isNaN(Number(cleanPrice)) ? `€${Number(cleanPrice).toLocaleString()}` : (cleanPrice || 'Price on Request')}
                </p>
                {isPartial && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-md text-sm font-semibold text-accent">
                    <Sparkles size={14} /> Available for Partial Ownership
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Link 
                  href={`/contact?horse=${horse?.id}`} 
                  className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg text-base font-medium text-white transition-all duration-300 bg-primary hover:bg-secondary shadow-md hover:shadow-lg"
                >
                  Inquire about {horse?.name}
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

// ---------- Helper & Sub-Components ----------

function formatDescription(text: string) {
  if (!text) return null;
  // If user already put newlines, respect them but wrap in nicer paragraphs
  if (text.includes('\n')) {
    return text.split('\n').map((p, i) => (
      p.trim() ? <p key={i} className="mb-6 leading-relaxed text-lg sm:text-xl">{p}</p> : <br key={i} />
    ));
  }
  
  // Otherwise, split by sentences and group into smaller paragraphs
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const paragraphs = [];
  let currentP = "";
  for (let i = 0; i < sentences.length; i++) {
    currentP += sentences[i] + " ";
    if ((i + 1) % 3 === 0 || i === sentences.length - 1) {
      paragraphs.push(currentP.trim());
      currentP = "";
    }
  }
  
  return paragraphs.map((p, i) => (
    <p key={i} className="mb-6 leading-relaxed text-lg sm:text-xl">{p}</p>
  ));
}

function parseRationale(text: string) {
  if (!text) return { intro: '', highlights: [] as string[], revenue: [] as string[] }
  const introMatch = text.match(/\[INTRO\]([\s\S]*?)(?=\[HIGHLIGHTS\]|\[REVENUE\]|$)/)
  const highlightsMatch = text.match(/\[HIGHLIGHTS\]([\s\S]*?)(?=\[INTRO\]|\[REVENUE\]|$)/)
  const revenueMatch = text.match(/\[REVENUE\]([\s\S]*?)(?=\[INTRO\]|\[HIGHLIGHTS\]|$)/)
  return {
    intro: introMatch ? introMatch[1].trim() : text,
    highlights: highlightsMatch ? highlightsMatch[1].trim().split('\n').filter(l => l.trim()) : [],
    revenue: revenueMatch ? revenueMatch[1].trim().split('\n').filter(l => l.trim()) : [],
  }
}

function InvestmentProspect({ roi, rationale }: { roi?: string | null; rationale?: string | null }) {
  const { intro, highlights, revenue } = parseRationale(rationale || '')
  const isStructured = highlights.length > 0 || revenue.length > 0

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 border-2 border-green-500/30 rounded-2xl p-8 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />
      <h2 className="text-2xl font-serif font-bold text-green-800 dark:text-green-400 mb-6 flex items-center gap-3">
        <TrendingUp className="text-green-600 dark:text-green-500" /> Investment Prospect
      </h2>

      <div className="space-y-6">
        {/* ROI Badge */}
        {roi && (
          <div className="inline-flex items-center gap-3 bg-white/70 dark:bg-gray-900/60 rounded-xl px-5 py-3 border border-green-500/20">
            <DollarSign className="text-green-600 dark:text-green-400" size={20} />
            <div>
              <span className="text-xs font-bold text-green-700 dark:text-green-500 uppercase tracking-widest block">Estimated ROI</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">{roi}</span>
            </div>
          </div>
        )}

        {/* Intro paragraph */}
        {intro && (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">{intro}</p>
        )}

        {isStructured && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Key Highlights */}
            {highlights.length > 0 && (
              <div className="bg-white/60 dark:bg-gray-900/40 rounded-xl p-5 border border-green-500/20">
                <h3 className="text-sm font-bold text-green-700 dark:text-green-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Sparkles size={14} /> Key Highlights
                </h3>
                <ul className="space-y-2">
                  {highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle2 size={15} className="text-green-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Revenue Pathways */}
            {revenue.length > 0 && (
              <div className="bg-white/60 dark:bg-gray-900/40 rounded-xl p-5 border border-green-500/20">
                <h3 className="text-sm font-bold text-green-700 dark:text-green-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <DollarSign size={14} /> Revenue Pathways
                </h3>
                <ul className="space-y-2">
                  {revenue.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <ArrowRight size={14} className="text-green-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
