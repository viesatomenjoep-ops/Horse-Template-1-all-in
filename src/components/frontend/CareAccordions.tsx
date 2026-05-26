'use client'

import { useState } from 'react'
import { ChevronDown, Leaf, Wheat, Sprout, FlaskConical, HeartPulse, BedDouble, Wind, Sparkles } from 'lucide-react'

const feedItems = [
  {
    icon: <Leaf size={18} className="text-green-500" />,
    label: 'Agrobs Muesli & Mash',
    description: 'Premium, soy-free muesli and mash — naturally dried, high quality forage-based feed.',
  },
  {
    icon: <HeartPulse size={18} className="text-red-400" />,
    label: 'Metazoa MuscleFit HP23',
    description: 'High-performance pellets formulated to support muscle development and recovery.',
  },
  {
    icon: <Sprout size={18} className="text-emerald-500" />,
    label: 'Chia & Pumpkin Seeds',
    description: 'Superfoods rich in omega-3s, antioxidants, and zinc — supporting coat, joints, and immunity.',
  },
  {
    icon: <Wheat size={18} className="text-amber-500" />,
    label: "Hartog's Compact Grass & Alfalfa Hay",
    description: 'The cleanest roughage available — providing essential fibre and supporting gut health.',
  },
  {
    icon: <FlaskConical size={18} className="text-blue-400" />,
    label: 'Premium Grass Hay',
    description: 'Only the best grass hay is sourced — selected for nutritional value and cleanliness.',
  },
]

const beddingItems = [
  {
    icon: <Wind size={18} className="text-teal-500" />,
    label: 'Hemp Shavings (Base Layer)',
    description: 'Completely dust-free and more absorbent than any other bedding material — the foundation of a clean, healthy stable environment.',
  },
  {
    icon: <BedDouble size={18} className="text-amber-400" />,
    label: 'Soft Wood Shavings (Top Layer)',
    description: 'Fluffy, soft wood shavings placed on top of the hemp base — giving each horse maximum comfort throughout the night.',
  },
  {
    icon: <Sparkles size={18} className="text-yellow-400" />,
    label: 'All-Day Cleaning Routine',
    description: 'We work hard to maintain cleanliness throughout the entire day, aiming for a dust-free environment that protects respiratory health.',
  },
]

function Accordion({
  icon,
  accentColor,
  tagline,
  title,
  intro,
  items,
  footnote,
}: {
  icon: React.ReactNode
  accentColor: string
  tagline: string
  title: string
  intro: string
  items: { icon: React.ReactNode; label: string; description: string }[]
  footnote: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${accentColor}`}>
            {icon}
          </div>
          <div>
            <span className="text-accent uppercase tracking-[0.2em] text-[10px] font-bold block mb-0.5">{tagline}</span>
            <span className="font-serif font-bold text-primary dark:text-white text-base leading-tight">{title}</span>
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180 text-accent' : ''}`}
        />
      </button>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 pt-1 space-y-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{intro}</p>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold text-primary dark:text-white text-sm mb-0.5">{item.label}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 italic border-l-4 border-accent pl-3 leading-relaxed">
            {footnote}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CareAccordions() {
  return (
    <div className="space-y-3 mt-6">
      <Accordion
        icon={<Leaf size={18} className="text-green-600" />}
        accentColor="bg-green-100 dark:bg-green-900/30"
        tagline="Holistic Nutrition"
        title="Our Feed Program"
        intro="We feed a whole-food diet with no soy and very little sugar, with an individualized, balanced feed program tailored to each horse. We research only the cleanest, highest-quality products available."
        items={feedItems}
        footnote="Every horse is unique. Each feed program is individually balanced — ensuring every athlete performs and recovers at their absolute best."
      />
      <Accordion
        icon={<BedDouble size={18} className="text-teal-600" />}
        accentColor="bg-teal-100 dark:bg-teal-900/30"
        tagline="Daily Care"
        title="Bedding & Stable Hygiene"
        intro="The quality of our care does not stop with nutrition. We source the best products in everything we do — including the bedding our horses sleep on every night."
        items={beddingItems}
        footnote="A clean, dust-free environment is not a luxury — it is a non-negotiable foundation for peak equine health and performance."
      />
    </div>
  )
}
