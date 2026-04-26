import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPageContent } from '@/app/actions/pages'
import RoiCalculatorTabs from '@/components/roi/RoiCalculatorTabs'

export const revalidate = 3600

export const metadata = {
  title: 'Invest in Showjumpers | Equivest Worldwide',
  description: 'Discover the lucrative opportunity of investing in premium showjumpers from Europe (NL, BE, GER) for the US market.',
}

export default async function InvestorsPage() {
  let pageData = await getPageContent('investors')

  // Default hardcoded layout if database is empty/not setup
  if (!pageData) {
    pageData = {
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

  const { title, hero_image, content_blocks } = pageData

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen pt-24 pb-20">
      
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src={hero_image || "/about-bg.jpg"}
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <span className="text-accent uppercase tracking-[0.3em] font-bold text-sm mb-4 block">Exclusive Opportunity</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Dynamic Blocks */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 space-y-12">
        {content_blocks.map((block: any, idx: number) => {
          if (block.type === 'heading') {
            return <h2 key={block.id || idx} className={`${block.size || 'text-4xl'} font-serif font-bold text-primary dark:text-white pt-8`}>{block.content}</h2>
          }
          if (block.type === 'text') {
            return <p key={block.id || idx} className={`${block.size || 'text-base'} text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap`}>{block.content}</p>
          }
          if (block.type === 'quote') {
            return (
              <blockquote key={block.id || idx} className="border-l-4 border-accent pl-6 py-4 my-8 text-xl md:text-2xl italic font-serif text-gray-700 dark:text-gray-300 bg-accent/5 rounded-r-lg">
                "{block.content}"
              </blockquote>
            )
          }
          if (block.type === 'bullet-list') {
            const items = block.content.split('\n').filter((item: string) => item.trim() !== '')
            return (
              <ul key={block.id || idx} className="list-disc list-inside space-y-3 my-6 text-gray-600 dark:text-gray-300 text-lg">
                {items.map((item: string, i: number) => (
                  <li key={i} className="leading-relaxed">{item.replace(/^- /, '')}</li>
                ))}
              </ul>
            )
          }
          if (block.type === 'cta') {
            return (
              <div key={block.id || idx} className="my-8 flex justify-start">
                <Link href={block.image_url || '/contact'} className="px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-primary transition-colors shadow-md">
                  {block.content || 'Neem Contact Op'}
                </Link>
              </div>
            )
          }
          if (block.type === 'divider') {
            return <hr key={block.id || idx} className="my-16 border-t-2 border-gray-100 dark:border-gray-800" />
          }
          if (block.type === 'image') {
            return (
              <div key={block.id || idx} className="relative w-full rounded-xl overflow-hidden my-8 shadow-lg bg-gray-50 dark:bg-gray-800">
                <Image src={block.content} alt="Content" width={1200} height={800} className="w-full h-auto object-contain" />
              </div>
            )
          }
          if (block.type === 'image-text') {
            const isImageLeft = block.size === 'image-left'
            return (
              <div key={block.id || idx} className={`flex flex-col ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center my-12`}>
                {block.image_url && (
                  <div className="w-full md:w-1/2 relative rounded-xl overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-800">
                    <Image src={block.image_url} alt="Section Image" width={800} height={600} className="w-full h-auto object-contain" />
                  </div>
                )}
                <div className={`w-full ${block.image_url ? 'md:w-1/2' : ''}`}>
                  <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {block.content}
                  </p>
                </div>
              </div>
            )
          }
          return null
        })}
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 mb-32">
        <div className="bg-primary dark:bg-gray-800 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-accent rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-accent rounded-full blur-3xl opacity-20"></div>
          
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 relative z-10">Ready to Enter the Arena?</h2>
          <p className="text-primary-foreground/80 dark:text-gray-300 max-w-2xl mx-auto mb-10 text-lg relative z-10">
            Whether you are looking to fully own a top prospect or join an exclusive investment syndicate, we provide a transparent, turnkey solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link href="/contact" className="px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-white hover:text-accent transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
              Request Investment Deck <ArrowRight size={20} />
            </Link>
            <Link href="/investors/portfolio" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              View Private Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="border-t border-gray-100 dark:border-gray-800 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-primary dark:text-white">ROI Calculator</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Calculate your potential Return on Investment based on historical data and projected horse development strategies.</p>
          </div>
          <RoiCalculatorTabs lang="en" />
        </div>
      </div>

    </div>
  )
}
