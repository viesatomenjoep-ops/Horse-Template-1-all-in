import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-between text-white pt-24 pb-6">
        <div className="absolute inset-0 opacity-90 overflow-hidden">
          {/* Note: The user needs to add chimi.jpg to the public directory */}
          <Image
            src="/chimi.jpg"
            alt="Elite Jumper Chimi"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-primary/95"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6 md:space-y-8 w-full mt-4 md:mt-[2vh] mb-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-4">
            <span className="w-2 h-2 bg-accent-light rounded-full animate-pulse"></span>
            <span className="text-accent-light uppercase tracking-[0.3em] text-xs sm:text-sm md:text-base font-bold">
              Invest in Elite Showjumpers
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif text-white leading-[1.1] tracking-tight">
            High-yield returns from world-class <span className="text-accent-light italic">equestrian talent.</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-medium text-white/80 max-w-2xl mx-auto leading-relaxed">
            Securing high-yield returns through the acquisition of world-class equestrian talent.
          </p>
          
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/horses"
              className="bg-accent text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-primary transition-all shadow-xl"
            >
              View Portfolio
            </Link>
            <Link
              href="/roi"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white/20 transition-all shadow-xl"
            >
              ROI
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-end opacity-70 mt-12 md:mt-auto pb-4 md:pb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 mb-3 block">
            Scroll to explore
          </span>
          <div className="w-[2px] h-24 md:h-32 bg-white/20 relative overflow-hidden rounded-full mb-[-2rem] md:mb-[-4rem]">
            <div className="w-full h-1/4 bg-white/90 shadow-[0_0_10px_rgba(255,255,255,1)] absolute top-0 left-0 rounded-full animate-[mouse-scroll_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
