export const metadata = {
  title: 'About Us | Antigravity Sport Horses',
  description: 'Learn more about our passion for elite sport horses and our global network.',
}

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl font-serif font-light text-primary dark:text-white">
          Our <span className="font-semibold italic text-accent">Heritage</span>
        </h1>
        <p className="text-lg text-secondary dark:text-gray-400 font-light leading-relaxed">
          At Antigravity Sport Horses, we combine decades of equestrian excellence with an uncompromising eye for talent. We specialize in sourcing, training, and matching world-class sport horses with ambitious riders globally.
        </p>
        <div className="h-64 sm:h-96 w-full relative mt-12 bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
          {/* Placeholder for a luxury image */}
          <span className="text-gray-400 dark:text-gray-600 font-medium tracking-widest uppercase">Luxury Brand Image</span>
        </div>
      </div>
    </div>
  )
}
