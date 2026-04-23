'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createHorse } from '@/app/actions/horse'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function NewHorsePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    if (coverImageUrl) {
      formData.append('cover_image_url', coverImageUrl)
    }

    try {
      await createHorse(formData)
      router.push('/admin/horses')
    } catch (err: any) {
      setError(err.message || "Failed to create horse")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/horses" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-500" />
        </Link>
        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Add New Horse</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-md text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Basic Info */}
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Horse Name *</label>
              <input required type="text" name="name" id="name" className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm" />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="birth_year" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Birth Year *</label>
              <input required type="number" name="birth_year" id="birth_year" min="1990" max={new Date().getFullYear()} className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm" />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender *</label>
              <select required name="gender" id="gender" className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm">
                <option value="Mare">Mare</option>
                <option value="Gelding">Gelding</option>
                <option value="Stallion">Stallion</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="height_cm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Height (cm)</label>
              <input type="number" name="height_cm" id="height_cm" className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm" />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="discipline" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Discipline *</label>
              <select required name="discipline" id="discipline" className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm">
                <option value="Dressage">Dressage</option>
                <option value="Showjumping">Showjumping</option>
                <option value="Hunter">Hunter</option>
                <option value="Eventing">Eventing</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="experience_level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Experience Level</label>
              <input type="text" name="experience_level" id="experience_level" placeholder="e.g. Grand Prix, L, M, Unbroken" className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm" />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="price_category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price Category *</label>
              <select required name="price_category" id="price_category" className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm">
                <option value="Price on Request">Price on Request</option>
                <option value="€10k-25k">€10k-25k</option>
                <option value="€25k-50k">€25k-50k</option>
                <option value="€50k-100k">€50k-100k</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
              <select name="status" id="status" className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm">
                <option value="Available">Available</option>
                <option value="Under Offer / Vet Check">Under Offer / Vet Check</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="sire" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sire</label>
              <input type="text" name="sire" id="sire" className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm" />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="dam_sire" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Dam Sire</label>
              <input type="text" name="dam_sire" id="dam_sire" className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm" />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea name="description" id="description" rows={4} className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm" />
            </div>

            {/* Media Upload */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Image</label>
              {/* <CloudinaryUploader onUploadSuccess={setCoverImageUrl} label="Upload Cover Image" /> */}
              <p className="text-sm text-gray-500">Image upload temporarily disabled for debugging.</p>
            </div>
          </div>

          <div className="flex justify-end border-t border-gray-200 dark:border-gray-700 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...</>
              ) : (
                'Save Horse'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
