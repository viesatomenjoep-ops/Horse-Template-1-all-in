'use client'

import { useState } from 'react'
import { ChevronDown, Leaf, Wheat, Sprout, FlaskConical, HeartPulse } from 'lucide-react'

const feedItems = [
  {
    icon: <Leaf size={20} className="text-green-500" />,
    label: 'Agrobs Muesli & Mash',
    description: 'Premium, soy-free muesli and mash from Agrobs — naturally dried, high quality forage-based feed.',
  },
  {
    icon: <HeartPulse size={20} className="text-red-400" />,
    label: 'Metazoa MuscleFit HP23',
    description: 'High-performance pellets specifically formulated to support muscle development and recovery in sport horses.',
  },
  {
    icon: <Sprout size={20} className="text-emerald-500" />,
    label: 'Chia & Pumpkin Seeds',
    description: 'Nutrient-dense superfoods rich in omega-3 fatty acids, antioxidants, and zinc — supporting coat, joints, and immunity.',
  },
  {
    icon: <Wheat size={20} className="text-amber-500" />,
    label: 'Hartog\'s Compact Grass & Straight Alfalfa Hay',
    description: 'The cleanest, highest-quality roughage — providing essential fibre and supporting healthy gut function.',
  },
  {
    icon: <FlaskConical size={20} className="text-blue-400" />,
    label: 'Premium Grass Hay',
    description: 'Only the best grass hay available is sourced — selected for its nutritional value and cleanliness.',
  },
]

export default function NutritionSection() {
  const [open, setOpen] = useState(false)

  return (
    <section className="py-16 bg-[#f5f0e8] dark:bg-gray-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Toggle Header */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full group flex items-center justify-between gap-6 text-left focus:outline-none"
          aria-expanded={open}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
              <Leaf size={22} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <span className="text-accent uppercase tracking-[0.25em] text-xs font-bold block mb-1">Holistic Care</span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary dark:text-white leading-tight">
                Our Nutrition Philosophy
              </h2>
            </div>
          </div>
          <div className={`shrink-0 w-10 h-10 rounded-full border-2 border-primary/20 dark:border-white/20 flex items-center justify-center transition-transform duration-300 group-hover:border-accent ${open ? 'rotate-180 border-accent' : ''}`}>
            <ChevronDown size={20} className={`transition-colors ${open ? 'text-accent' : 'text-primary dark:text-white'}`} />
          </div>
        </button>

        {/* Expandable Content */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-[1000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}
        >
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
            We believe nutrition plays a vital role in the overall health and performance of each horse. That is why we feed a whole-food diet with <strong>no soy</strong> and <strong>very little sugar</strong>, with an individualized balanced feed program tailored to each horse. We research only the cleanest, highest-quality products available.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {feedItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm"
              >
                <div className="w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold text-primary dark:text-white text-sm mb-1">{item.label}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 italic border-l-4 border-accent pl-4">
            Every horse is unique. That is why each feed program is individually balanced — ensuring every athlete at Equivest performs and recovers at their absolute best.
          </p>
        </div>

        {/* Subtle bottom divider when closed */}
        {!open && (
          <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
            Click to learn about our feed program →
          </p>
        )}
      </div>
    </section>
  )
}
