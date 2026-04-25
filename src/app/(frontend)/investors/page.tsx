import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp, ShieldCheck, Globe, ArrowRight, BarChart3, Target, Award } from 'lucide-react'

export const metadata = {
  title: 'Invest in Showjumpers | Equivest Worldwide',
  description: 'Discover the lucrative opportunity of investing in premium showjumpers from Europe (NL, BE, GER) for the US market.',
}

export default function InvestorsPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen pt-24 pb-20">
      
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/about-bg.jpg" // Using an existing background, fallback will rely on the overlay
            alt="Showjumper clearing a high fence"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <span className="text-accent uppercase tracking-[0.3em] font-bold text-sm mb-4 block">Exclusive Opportunity</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Invest in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#aa8022]">Excellence</span>
          </h1>
          <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
            Capitalize on the premium European showjumping market. We source elite talent from the Netherlands, Belgium, and Germany for the high-demand North American circuit.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center border border-gray-100 dark:border-gray-700">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-serif font-bold text-primary dark:text-white">Why Invest in Showjumpers?</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The equestrian sport has transitioned from a passion-driven pursuit into a highly professional, multi-billion-dollar global industry. At the pinnacle of this industry sits the showjumping market, where demand for top-tier equine athletes consistently outpaces supply.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              By partnering with Equivest, you gain direct access to our extensive network in the heart of the equestrian world: the Netherlands, Belgium, and Germany. We meticulously select, train, and export exceptional horses to the United States, where the market commands significant premiums.
            </p>
          </div>
          <div className="w-full md:w-1/3 grid grid-cols-1 gap-6">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700 flex items-start gap-4">
              <Globe className="text-accent shrink-0 w-8 h-8" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Global Arbitrage</h3>
                <p className="text-sm text-gray-500 mt-1">Acquiring at the source (EU) and supplying the highest-paying market (USA).</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700 flex items-start gap-4">
              <TrendingUp className="text-accent shrink-0 w-8 h-8" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Proven Track Record</h3>
                <p className="text-sm text-gray-500 mt-1">Decades of experience in identifying unpolished diamonds and developing them into grand prix champions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters / Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 space-y-32">
        
        {/* Chapter 1: The Market Dynamics */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <span className="text-6xl font-serif text-gray-200 dark:text-gray-800 font-bold">01</span>
            <h2 className="text-4xl font-serif font-bold text-primary dark:text-white">The Market Dynamics</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              The United States hosts some of the most prestigious and lucrative equestrian competitions in the world, including the Winter Equestrian Festival in Wellington, Florida. However, the breeding and initial development of showjumpers is overwhelmingly concentrated in Europe—specifically the Netherlands (KWPN), Belgium (BWP, Zangersheide), and Germany (Holsteiner, Hanoverian).
            </p>
            <p>
              This geographic divide creates a powerful economic opportunity. American buyers are constantly searching for "made" horses—talented, well-trained, and ready to compete. They are willing to pay a substantial premium for horses that have been expertly curated, vetted, and imported.
            </p>
            <blockquote className="border-l-4 border-accent pl-6 py-2 my-8 bg-gray-50 dark:bg-gray-800/50 italic rounded-r-lg">
              "We bridge the gap between European breeding excellence and American competitive ambition."
            </blockquote>
          </div>
        </section>

        {/* Chapter 2: Return on Investment */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <span className="text-6xl font-serif text-gray-200 dark:text-gray-800 font-bold">02</span>
            <h2 className="text-4xl font-serif font-bold text-primary dark:text-white">Return on Investment (ROI)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
              <p>
                Investing in sport horses is classified as an alternative asset class. While it carries inherent risks, the potential returns significantly outpace traditional markets when managed by experts.
              </p>
              <p>
                <strong>Value Creation:</strong> A horse's value increases exponentially as it moves up the competitive levels. A talented 5-year-old acquired in Europe can double or triple in value within 12 to 24 months of professional training and successful competition exposure in the US.
              </p>
              <p>
                <strong>Typical ROI:</strong> Historically, well-managed syndicates and individual investments in our curated horses have yielded annualized returns ranging from <strong>15% to 35%</strong>, depending on the specific strategy (short-term flipping vs. long-term development).
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><BarChart3 className="text-accent" /> Investment Strategies</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5"><span className="text-accent text-xs font-bold">1</span></div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">The 'Flipper' (6-12 Months)</h4>
                    <p className="text-sm text-gray-500">Acquiring a ready-to-compete horse in Europe, importing it, showing it locally in the US, and selling immediately for an arbitrage profit.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5"><span className="text-accent text-xs font-bold">2</span></div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">The 'Developer' (1-3 Years)</h4>
                    <p className="text-sm text-gray-500">Investing in young, raw talent (ages 4-6). Adding significant value through professional training before selling to the premium amateur market.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Chapter 3: Risk Management */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <span className="text-6xl font-serif text-gray-200 dark:text-gray-800 font-bold">03</span>
            <h2 className="text-4xl font-serif font-bold text-primary dark:text-white">Risk Management</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              Like any high-yield investment, dealing with live animals involves risk. Equivest distinguishes itself through rigorous risk mitigation protocols that protect our investors' capital.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 not-prose">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <ShieldCheck className="w-10 h-10 text-accent mb-4" />
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Stringent Vetting</h4>
                <p className="text-sm text-gray-500">Every horse undergoes comprehensive clinical and radiographic examinations by top-tier European veterinarians before acquisition.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <Target className="w-10 h-10 text-accent mb-4" />
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Diversification</h4>
                <p className="text-sm text-gray-500">We offer fractional ownership (syndication), allowing investors to spread their capital across multiple horses to minimize individual risk.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <Award className="w-10 h-10 text-accent mb-4" />
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Full Insurance</h4>
                <p className="text-sm text-gray-500">All investment horses are fully insured for mortality and major medical, protecting the base capital against unforeseen circumstances.</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
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
            <Link href="/contact" className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center">
              Schedule a Call
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
