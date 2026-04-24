'use client'

import { useEffect } from 'react'
import { incrementHorseView } from '@/app/actions/analytics'

export default function ViewTracker({ horseId }: { horseId: string }) {
  useEffect(() => {
    // We put this in a timeout to avoid calling it multiple times during strict mode double-renders
    const timer = setTimeout(() => {
      incrementHorseView(horseId).catch(console.error)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [horseId])

  return null // Invisible component
}
