"use client";

import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <section className="py-24 bg-[#fdfbf7] dark:bg-[#0a0a0a] relative z-10 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-primary/5 dark:bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white dark:bg-[#111] rounded-[2.5rem] p-8 md:p-16 shadow-2xl border border-gray-100 dark:border-gray-800 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-8">
            <Mail className="w-8 h-8 text-accent" />
          </div>
          
          <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold block mb-4">Exclusive Insights</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary dark:text-white mb-6 leading-tight">
            Join Our <span className="italic text-accent">Newsletter</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stay informed with the latest updates on our elite sport horses, world-class facilities, and exclusive equestrian investment opportunities directly in your inbox.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
            <div className="relative flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-full px-6 py-4 pr-32 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="absolute right-2 top-2 bottom-2 bg-accent text-white px-6 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-primary transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {status === "loading" ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : status === "success" ? (
                  "Subscribed!"
                ) : (
                  <>
                    Subscribe
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
            {status === "success" && (
              <p className="absolute -bottom-8 left-0 right-0 text-sm font-medium text-green-600 dark:text-green-400 animate-in fade-in slide-in-from-bottom-2">
                Thank you for subscribing to our newsletter!
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
