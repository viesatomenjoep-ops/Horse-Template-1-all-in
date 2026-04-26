import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPageContent } from '@/app/actions/pages'
import RoiCalculatorTabs from '@/components/roi/RoiCalculatorTabs'
import { Reveal, StaggerContainer, StaggerItem, ParallaxImage } from '@/components/animations/MotionComponents'

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
    <div className="bg-white dark:bg-gray-900 min-h-screen pt-6 pb-20 overflow-hidden">
      
      {/* Hero Section */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal delay={0.2} direction="down">
          <div className="text-center mb-8">
            <span className="text-accent uppercase tracking-[0.3em] font-bold text-sm mb-2 block">Exclusive Opportunity</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary dark:text-white mb-6 leading-tight">
              {title}
            </h1>
          </div>
        </Reveal>
        
        <Reveal delay={0.5} direction="up">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800 h-[400px] sm:h-[500px] md:h-[600px]">
            <ParallaxImage 
              src={hero_image || "/about-bg.jpg"}
              alt="Investment Opportunity"
              className="w-full h-full"
            />
          </div>
        </Reveal>
      </div>

      {/* Dynamic Blocks */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 space-y-12">
        <StaggerContainer delayChildren={0.3} staggerChildren={0.15}>
          {content_blocks.map((block: any, idx: number) => {
            if (block.type === 'heading') {
              return (
                <StaggerItem key={block.id || idx}>
                  <h2 className={`${block.size || 'text-4xl'} font-serif font-bold text-primary dark:text-white pt-8`}>
                    {block.content}
                  </h2>
                </StaggerItem>
              )
            }
            if (block.type === 'text') {
              return (
                <StaggerItem key={block.id || idx}>
                  <p className={`${block.size || 'text-base'} text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap`}>
                    {block.content}
                  </p>
                </StaggerItem>
              )
            }
            if (block.type === 'quote') {
              return (
                <StaggerItem key={block.id || idx}>
                  <blockquote className="border-l-4 border-accent pl-6 py-4 my-8 text-xl md:text-2xl italic font-serif text-gray-700 dark:text-gray-300 bg-accent/5 rounded-r-lg">
                    "{block.content}"
                  </blockquote>
                </StaggerItem>
              )
            }
            if (block.type === 'bullet-list') {
              const items = block.content.split('\n').filter((item: string) => item.trim() !== '')
              return (
                <StaggerItem key={block.id || idx}>
                  <ul className="list-disc list-inside space-y-3 my-6 text-gray-600 dark:text-gray-300 text-lg">
                    {items.map((item: string, i: number) => (
                      <li key={i} className="leading-relaxed">{item.replace(/^- /, '')}</li>
                    ))}
                  </ul>
                </StaggerItem>
              )
            }
            if (block.type === 'cta') {
              return (
                <StaggerItem key={block.id || idx}>
                  <div className="my-12 flex justify-start">
                    <Link href={block.image_url || '/contact'} className="relative group px-8 py-4 bg-accent text-white font-bold rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all">
                      <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                      <span className="relative z-10">{block.content || 'Neem Contact Op'}</span>
                    </Link>
                  </div>
                </StaggerItem>
              )
            }
            if (block.type === 'divider') {
              return (
                <StaggerItem key={block.id || idx}>
                  <hr className="my-16 border-t-2 border-gray-100 dark:border-gray-800" />
                </StaggerItem>
              )
            }
            if (block.type === 'image') {
              return (
                <StaggerItem key={block.id || idx}>
                  <div className="relative w-full rounded-2xl overflow-hidden my-12 shadow-2xl bg-gray-50 dark:bg-gray-800">
                    <ParallaxImage src={block.content} alt="Content" className="w-full h-auto object-contain" />
                  </div>
                </StaggerItem>
              )
            }
            if (block.type === 'image-text') {
              const isImageLeft = block.size === 'image-left'
              return (
                <StaggerItem key={block.id || idx}>
                  <div className={`flex flex-col ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center my-16`}>
                    {block.image_url && (
                      <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden shadow-2xl bg-gray-50 dark:bg-gray-800">
                        <ParallaxImage src={block.image_url} alt="Section Image" className="w-full h-auto object-contain" />
                      </div>
                    )}
                    <div className={`w-full ${block.image_url ? 'md:w-1/2' : ''}`}>
                      <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {block.content}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              )
            }
            return null
          })}
        </StaggerContainer>
      </div>

      {/* CTA Section */}
      <Reveal direction="up" delay={0.2}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 mb-32">
          <div className="bg-primary dark:bg-gray-800 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-accent rounded-full blur-[100px] opacity-40 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-accent/60 rounded-full blur-[100px] opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 relative z-10 tracking-tight">Ready to Enter the Arena?</h2>
            <p className="text-primary-foreground/90 dark:text-gray-300 max-w-2xl mx-auto mb-12 text-xl relative z-10 font-light">
              Whether you are looking to fully own a top prospect or join an exclusive investment syndicate, we provide a transparent, turnkey solution.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <Link href="/contact" className="group px-8 py-5 bg-accent text-white font-bold rounded-full overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="relative z-10">Request Investment Deck</span> <ArrowRight className="relative z-10" size={20} />
              </Link>
              <Link href="/investors/portfolio" className="px-8 py-5 bg-transparent border border-white/30 text-white font-bold rounded-full hover:bg-white/10 hover:border-white transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                View Private Portfolio
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ROI Calculator */}
      <Reveal delay={0.4}>
        <div className="border-t border-gray-100 dark:border-gray-800 pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary dark:text-white">ROI Calculator</h2>
              <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg">Calculate your potential Return on Investment based on historical data and projected horse development strategies.</p>
            </div>
            <RoiCalculatorTabs lang="en" />
          </div>
        </div>
      </Reveal>

    </div>
  )
}
