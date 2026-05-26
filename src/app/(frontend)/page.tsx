import Link from "next/link";
import Image from "next/image";
import { Trophy, ArrowRight, Lock } from "lucide-react";
import ParallaxLogo from "@/components/frontend/ParallaxLogo";
import PartnerSlider from "@/components/frontend/PartnerSlider";
import CareAccordions from "@/components/frontend/CareAccordions";
import PhotoOrbit from "@/components/frontend/PhotoOrbit";

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="flex-1 bg-[#fdfbf7] dark:bg-[#0a0a0a] overflow-x-hidden">
      {/* Shared Background for Hero and Slider */}
      <div className="relative w-full">
        <div className="absolute inset-0 opacity-90 overflow-hidden pointer-events-none">
          <Image
            src="/chimi.jpg"
            alt="Elite Jumper Chimi"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-[#fdfbf7] dark:to-[#0a0a0a]"></div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[180vh] flex flex-col items-center justify-start text-white pt-24 pb-32">
          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6 md:space-y-8 w-full mt-2 mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-4">
              <span className="w-2 h-2 bg-accent-light rounded-full animate-pulse"></span>
              <span className="text-accent-light uppercase tracking-[0.3em] text-xs sm:text-sm md:text-base font-bold">
                Equivest Worldwide
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif text-white leading-[1.1] tracking-tight">
              Global Excellence in <span className="text-accent-light italic">Equestrian Sports.</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-medium text-white/80 max-w-2xl mx-auto leading-relaxed">
              Ranked among the absolute top of American and Belgian trainers and traders. For over 20 years, the premier destination for the most promising showjumpers, hunters, and ponies.
            </p>
            
            <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/references"
                className="bg-accent text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-primary transition-all shadow-xl"
              >
                View Our References
              </Link>
              <Link
                href="/horses"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white/20 transition-all shadow-xl"
              >
                Discover Our Horses
              </Link>
            </div>
          </div>

          <ParallaxLogo />
        </section>

        {/* Supported By Slider */}
        <div className="relative z-30 -mt-16 md:-mt-24 pb-12 md:pb-20">
          <PartnerSlider />
        </div>
      </div>

      {/* WHO WE ARE & OUR MISSION */}
      <section className="pt-16 pb-10 bg-[#fdfbf7] dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section label */}
          <div className="text-center mb-10">
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold block mb-4">Who We Are &amp; Our Mission</span>
            <div className="w-16 h-px bg-accent mx-auto"></div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

            {/* Column 1 — Eye for Quality */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary dark:text-white leading-tight">
                A Rare Eye for Exceptional Quality
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Equivest has guaranteed top-level sport and quality for over two decades. We are proud to belong to the top tier of American and Belgian trainers and traders. Over the years, we have developed a unique and rare instinct for selecting the perfect match. Whether it concerns talented showjumpers, stylish hunters, or reliable ponies: we know exactly what is needed and always hit the mark.
              </p>
              <Link
                href="/horses"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-accent transition-colors shadow-lg group"
              >
                View Our Horses <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Column 2 — Proven Results */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary dark:text-white leading-tight">
                Proven Results Through Superior Care
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Our mission is simple: we exclusively offer the most professional sport horses, paired with management of the highest conceivable level. A top sport horse only performs optimally with the right guidance. That is why all our horses receive the absolute best treatments, premium feed, and carefully tailored supplements.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Everything we have sold and trained over the past 20 years is built on this philosophy of uncompromising quality. Our proven track record speaks for itself. View our references and discover the successful combinations we have brought together worldwide.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* Photo Orbit — scroll-driven orbital gallery */}
      <PhotoOrbit />

      {/* Care & Nutrition Section — full width */}
      <section className="bg-[#fdfbf7] dark:bg-[#0a0a0a] pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CareAccordions />
        </div>
      </section>

      {/* References Section */}
      <ReferencesPreview />

      {/* Investment Inquiry CTA */}
      <section className="relative overflow-hidden bg-primary py-28">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[url('/chimi.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80 pointer-events-none" />
        {/* Glow accent */}
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-accent uppercase tracking-[0.35em] text-xs font-bold block mb-6">Private & Exclusive</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
            Connect with Our <span className="italic text-accent">Elite Network</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-12">
            Ready to explore high-end investment opportunities in the world of showjumping? Our team is available for private consultations and personalized investment plans — tailored to your goals and passion for the sport.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/investors"
              className="inline-flex items-center gap-3 px-10 py-4 bg-accent text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white hover:text-primary transition-all shadow-xl shadow-accent/30 group"
            >
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              Investment Inquiry
            </Link>
            <Link
              href="/contact#plan-visit"
              className="inline-flex items-center gap-3 px-10 py-4 border-2 border-white/30 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Plan to See the Horses
            </Link>
          </div>
        </div>
      </section>

      {/* Live Showjumping News Feed */}
      <WorldOfShowjumpingFeed />

    </main>
  );
}

import { getPublicHorses } from '@/app/actions/horse'
import { getReferences } from '@/app/actions/reference'
import HorseSlideshow from '@/components/frontend/HorseSlideshow'
import ReferencesSlider from '@/components/frontend/ReferencesSlider'



async function ReferencesPreview() {
  let references: any[] = [];
  try {
    references = await getReferences() || [];
  } catch (e) {
    console.error(e);
  }

  if (references.length === 0) {
    references = [
      { id: 'dummy1', horse_name: 'Equivest Royal Flush', url: null, sold_to_country: 'United States' },
      { id: 'dummy2', horse_name: 'Equivest Grand Prix', url: null, sold_to_country: 'Germany' },
      { id: 'dummy3', horse_name: 'Equivest Platinum', url: null, sold_to_country: 'United Arab Emirates' },
      { id: 'dummy4', horse_name: 'Equivest Diamond Z', url: null, sold_to_country: 'Belgium' },
      { id: 'dummy5', horse_name: 'Equivest Champion', url: null, sold_to_country: 'France' },
    ];
  }

  return <ReferencesSlider references={references} />;
}

async function WorldOfShowjumpingFeed() {
  let articles = [];
  try {
    // Note: World of Showjumping blocks direct RSS access via Cloudflare.
    // As a demonstration, we fetch from a reliable equestrian feed or use placeholders if it fails.
    // In production, to get WoSJ specifically, you would need a premium web scraper proxy (like ScrapingBee).
    const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/sport/equestrian/rss.xml', { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (data && data.items) {
        articles = data.items.slice(0, 3);
      }
    }
  } catch (e) {
    console.error('Failed to fetch RSS:', e);
  }

  // Fallback content if the feed is blocked/fails
  if (articles.length === 0) {
    articles = [
      {
        title: "Latest Showjumping Updates & Competition Results",
        pubDate: new Date().toISOString(),
        description: "Stay up to date with the latest 5* Grand Prix results, equestrian news, and top sport horse investments from around the globe.",
        link: "https://www.worldofshowjumping.com/"
      },
      {
        title: "Global Equestrian Markets See Continued Growth",
        pubDate: new Date().toISOString(),
        description: "The international sport horse market continues to show strong resilience and growth, particularly in the high-end hunter and jumper sectors.",
        link: "https://www.worldofshowjumping.com/"
      },
      {
        title: "New Talents Emerging on the European Circuit",
        pubDate: new Date().toISOString(),
        description: "Several exciting young horses have made their debut on the European circuit this season, showing immense potential for the future.",
        link: "https://www.worldofshowjumping.com/"
      }
    ];
  }

  return (
    <section className="py-20 bg-[#fdfbf7] dark:bg-[#0a0a0a] relative z-10 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold block mb-3">Live Feed</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary dark:text-white">
              World of Showjumping <span className="italic text-accent">News</span>
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl text-lg">
              Stay connected with the international equestrian circuit. Weekly live updates on competition results, industry news, and top-tier sport events.
            </p>
          </div>
          <a href="https://www.worldofshowjumping.com/" target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary dark:text-white hover:text-accent transition-colors mt-4 md:mt-0">
            View WoSJ Website <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article: any, i: number) => (
            <a href={article.link} target="_blank" rel="noopener noreferrer" key={i} className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 h-full">
              <span className="text-xs font-bold text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                {new Date(article.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4 group-hover:text-accent transition-colors leading-tight">
                {article.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6 flex-1">
                {article.description.replace(/<[^>]+>/g, '').substring(0, 150)}...
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary dark:text-white group-hover:text-accent transition-colors mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          ))}
        </div>
        
        <div className="mt-10 md:hidden text-center">
          <a href="https://www.worldofshowjumping.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary dark:border-white text-primary dark:text-white font-bold uppercase tracking-widest text-sm rounded-full w-full">
            View WoSJ Website
          </a>
        </div>
      </div>
    </section>
  )
}
