import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center sm:p-24 bg-background">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl sm:text-7xl font-light text-primary">
          Antigravity <span className="font-semibold italic text-accent">Sport Horses</span>
        </h1>
        <p className="text-xl text-secondary font-light max-w-2xl mx-auto">
          The premier platform for sourcing and managing world-class sport horses.
        </p>
        <div className="pt-8">
          <button className="flex items-center gap-2 mx-auto px-8 py-4 bg-primary text-background uppercase tracking-widest text-sm hover:bg-secondary transition-colors duration-300">
            View Collection
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}
