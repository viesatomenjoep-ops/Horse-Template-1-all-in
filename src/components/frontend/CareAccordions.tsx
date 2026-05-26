'use client'

import { useState } from 'react'
import { ChevronDown, Leaf, Wheat, Sprout, FlaskConical, HeartPulse, BedDouble, Wind, Sparkles } from 'lucide-react'

const feedItems = [
  {
    icon: <Leaf size={20} className="text-green-500" />,
    label: 'Agrobs Muesli & Mash',
    description: 'Premium, soy-free muesli and mash — naturally dried, high quality forage-based feed.',
  },
  {
    icon: <HeartPulse size={20} className="text-red-400" />,
    label: 'Metazoa MuscleFit HP23',
    description: 'High-performance pellets formulated to support muscle development and recovery.',
  },
  {
    icon: <Sprout size={20} className="text-emerald-500" />,
    label: 'Chia & Pumpkin Seeds',
    description: 'Superfoods rich in omega-3s, antioxidants, and zinc — supporting coat, joints, and immunity.',
  },
  {
    icon: <Wheat size={20} className="text-amber-500" />,
    label: "Hartog's Compact Grass & Alfalfa Hay",
    description: 'The cleanest roughage available — providing essential fibre and supporting gut health.',
  },
  {
    icon: <FlaskConical size={20} className="text-blue-400" />,
    label: 'Premium Grass Hay',
    description: 'Only the best grass hay is sourced — selected for nutritional value and cleanliness.',
  },
]

const beddingItems = [
  {
    icon: <Wind size={20} className="text-teal-500" />,
    label: 'Hemp Shavings (Base Layer)',
    description: 'Completely dust-free and more absorbent than any other bedding material — the foundation of a clean, healthy stable environment.',
  },
  {
    icon: <BedDouble size={20} className="text-amber-400" />,
    label: 'Soft Wood Shavings (Top Layer)',
    description: 'Fluffy, soft wood shavings placed on top of the hemp base — giving each horse maximum comfort throughout the night.',
  },
  {
    icon: <Sparkles size={20} className="text-yellow-400" />,
    label: 'All-Day Cleaning Routine',
    description: 'We work hard to maintain cleanliness throughout the entire day, aiming for a dust-free environment that protects respiratory health.',
  },
]

type CareCardProps = {
  icon: React.ReactNode
  iconBg: string
  tagline: string
  title: string
  intro: string
  items: { icon: React.ReactNode; label: string; description: string }[]
  footnote: string
}

function CareCard({ icon, iconBg, tagline, title, intro, items, footnote }: CareCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-md overflow-hidden">
      {/* Clickable Header */}
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full relative flex items-center justify-center gap-4 px-8 py-7 text-left hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors focus:outline-none"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg}`}>
            {icon}
          </div>
          <div>
            <span className="text-accent uppercase tracking-[0.25em] text-xs font-bold block mb-1">{tagline}</span>
            <h3 className="font-serif font-bold text-primary dark:text-white text-2xl leading-tight">{title}</h3>
          </div>
        </div>
        <div className={`absolute right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${open ? 'border-accent rotate-180' : 'border-gray-200 dark:border-gray-600'}`}>
          <ChevronDown size={20} className={open ? 'text-accent' : 'text-gray-400'} />
        </div>
      </button>

      {/* Expandable Body */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-8 pb-8 space-y-8 border-t border-gray-100 dark:border-gray-700 pt-6">
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{intro}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-5">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shrink-0 shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold text-primary dark:text-white text-base mb-1">{item.label}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-base text-gray-500 dark:text-gray-400 italic border-l-4 border-accent pl-5 leading-relaxed">
            {footnote}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CareAccordions() {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <CareCard
        icon={<Leaf size={22} className="text-green-600" />}
        iconBg="bg-green-100 dark:bg-green-900/30"
        tagline="Holistic Nutrition"
        title="Our Feed Program"
        intro="We feed a whole-food diet with no soy and very little sugar, with an individualized, balanced feed program tailored to each horse. We research only the cleanest, highest-quality products available."
        items={feedItems}
        footnote="Every horse is unique. Each feed program is individually balanced — ensuring every athlete performs and recovers at their absolute best."
      />
      <CareCard
        icon={<BedDouble size={22} className="text-teal-600" />}
        iconBg="bg-teal-100 dark:bg-teal-900/30"
        tagline="Daily Care"
        title="Bedding & Stable Hygiene"
        intro="The quality of our care does not stop with nutrition. We source the best products in everything we do — including the bedding our horses sleep on every night."
        items={beddingItems}
        footnote="A clean, dust-free environment is not a luxury — it is a non-negotiable foundation for peak equine health and performance."
      />
    </div>
  )
}
