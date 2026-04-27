import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy, Briefcase, Eye, ChevronDown } from "lucide-react";

export const metadata = {
  title: "Instagram | Equivest Worldwide",
  description: "Explore the possibilities at Equivest Worldwide.",
};

export default function InstagramLandingPage() {
  return (
    <main className="bg-[#fdfbf7] min-h-screen text-primary overflow-x-hidden selection:bg-accent selection:text-white">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/chimi.jpg"
            alt="Equivest Elite Showjumper"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-[#fdfbf7]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center mt-20">
          <div className="w-24 h-24 bg-white rounded-full p-2 mb-8 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            <Image 
              src="/logo.png" 
              alt="Equivest Logo" 
              width={80} 
              height={80} 
              className="object-contain w-full h-full"
            />
          </div>
          <span className="text-accent-light uppercase tracking-[0.3em] text-xs font-bold mb-4">
            Welcome to
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 tracking-tight leading-tight">
            Equivest <br /><span className="italic text-accent-light">Worldwide</span>
          </h1>
          <p className="text-white/80 max-w-sm text-sm md:text-base mb-10 leading-relaxed">
            High-yield returns from world-class equestrian talent. Discover the possibilities below.
          </p>
          
          <div className="animate-bounce mt-10">
            <ChevronDown className="text-white/50 w-8 h-8" />
          </div>
        </div>
      </section>

      {/* 2. Scrollable Sections - The "Possibilities" */}
      <div className="relative z-20 -mt-10 px-4 md:px-6 space-y-6 pb-24 max-w-2xl mx-auto">
        
        {/* Possibility 1: Portfolio */}
        <Link href="/horses" className="group block relative overflow-hidden rounded-[2rem] bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
          <div className="h-48 relative overflow-hidden">
            <Image src="/chimi.jpg" alt="Portfolio" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 flex items-center gap-2">
              <Trophy size={14} className="text-white" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">Elite Athletes</span>
            </div>
          </div>
          <div className="p-8">
            <h2 className="text-2xl font-serif font-bold mb-2 group-hover:text-accent transition-colors">Explore the Sport Portfolio</h2>
            <p className="text-gray-600 text-sm mb-6">
              View our exclusive collection of premium showjumpers currently securing top results in the global arena.
            </p>
            <div className="flex items-center text-sm font-bold uppercase tracking-widest text-accent">
              View Horses <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Possibility 2: Become an Investor */}
        <Link href="/investors" className="group block relative overflow-hidden rounded-[2rem] bg-primary text-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
          <div className="absolute inset-0 bg-[url('/chimi.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay group-hover:opacity-20 transition-opacity duration-500"></div>
          <div className="relative p-8 md:p-10">
            <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full border border-white/20">
              <Briefcase className="text-accent-light" size={20} />
            </div>
            <h2 className="text-2xl font-serif font-bold mb-2">Want to <span className="text-accent italic">Invest?</span></h2>
            <p className="text-white/70 text-sm mb-8 leading-relaxed">
              Join an exclusive network of investors acquiring elite equestrian talent. Our proven track record maximizes both sport success and financial returns.
            </p>
            <div className="flex items-center text-sm font-bold uppercase tracking-widest text-white">
              Request Access <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Possibility 3: References / Success */}
        <Link href="/references" className="group block relative overflow-hidden rounded-[2rem] bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100">
          <div className="p-8 flex items-start gap-6">
            <div className="flex-shrink-0 w-14 h-14 bg-[#fdfbf7] rounded-full border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Eye className="text-accent" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold mb-2 group-hover:text-accent transition-colors">Proven Success</h2>
              <p className="text-gray-600 text-sm mb-4">
                Discover our proudest alumni and global track record in the equestrian sport.
              </p>
              <div className="flex items-center text-xs font-bold uppercase tracking-widest text-primary group-hover:text-accent transition-colors">
                View References <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>

      </div>

      {/* Footer / Minimal Info */}
      <footer className="py-10 text-center flex flex-col items-center">
        <div className="w-10 h-10 mb-4 opacity-50">
          <Image src="/logo.png" alt="Equivest" width={40} height={40} className="object-contain" />
        </div>
        <Link 
          href="/"
          className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-accent transition-colors mb-2"
        >
          Visit Main Website
        </Link>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
          © {new Date().getFullYear()} Equivest Worldwide
        </p>
      </footer>

    </main>
  );
}
