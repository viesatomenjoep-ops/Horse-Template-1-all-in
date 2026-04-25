'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createHorse } from '@/app/actions/horse'
import dynamic from 'next/dynamic'
const CloudinaryUploader = dynamic(() => import('@/components/admin/CloudinaryUploader'), { ssr: false })
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import HorseLinkScanner from '@/components/admin/HorseLinkScanner'

export default function NewHorsePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    try {
      const result = await createHorse(formData)
      if (result.error) {
        setError(result.error)
        setIsSubmitting(false)
        return
      }
      router.push('/admin/horses')
    } catch (err: any) {
      setError(err.message || "Failed to create horse")
      setIsSubmitting(false)
    }
  }

  const handleApplyData = (data: { name: string, image: string, description: string, price: number }) => {
    const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
    if (nameInput && data.name) nameInput.value = data.name;

    const descInput = document.querySelector('textarea[name="description"]') as HTMLTextAreaElement;
    if (descInput && data.description) descInput.value = data.description;

    const priceInput = document.querySelector('input[name="price"]') as HTMLInputElement;
    if (priceInput && data.price > 0) priceInput.value = data.price.toString();

    if (data.image) {
      const coverInput = document.getElementById('cover_image_url') as HTMLInputElement;
      if (coverInput) coverInput.value = data.image;
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

      <HorseLinkScanner onApply={handleApplyData} />

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
              <select required name="gender" id="gender" className="mt-1 block w-full appearance-auto rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm">
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
              <select required name="discipline" id="discipline" className="mt-1 block w-full appearance-auto rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm">
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
              <select required name="price_category" id="price_category" className="mt-1 block w-full appearance-auto rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm">
                <option value="Price on Request">Price on Request</option>
                <option value="€10k-25k">€10k-25k</option>
                <option value="€25k-50k">€25k-50k</option>
                <option value="€50k-100k">€50k-100k</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
              <select name="status" id="status" className="mt-1 block w-full appearance-auto rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm">
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

            {/* Documents & Links Section */}
            <div className="col-span-2 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Documents & Links</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                
                {/* FEI / Lifescore */}
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="link_fei" className="block text-sm font-medium text-gray-700 dark:text-gray-300">FEI / Lifescore Link</label>
                  <input type="url" name="link_fei" id="link_fei" placeholder="https://..." className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm" />
                </div>

                {/* HorseTelex */}
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="link_horsetelex" className="block text-sm font-medium text-gray-700 dark:text-gray-300">HorseTelex Link</label>
                  <input type="url" name="link_horsetelex" id="link_horsetelex" placeholder="https://..." className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm" />
                </div>

                {/* Video */}
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="link_video" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Video Link (e.g. YouTube/Vimeo)</label>
                  <input type="url" name="link_video" id="link_video" placeholder="https://..." className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm" />
                  <p className="text-xs text-gray-500 mt-1">Leave blank if pending</p>
                </div>

                {/* Vet Check */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Vet Check / Keuring Document</label>
                  <CloudinaryUploader onUploadSuccess={(url) => {
                    const input = document.getElementById('doc_vet_check') as HTMLInputElement;
                    if(input) input.value = url;
                  }} label="Upload Document" />
                  <input type="hidden" name="doc_vet_check" id="doc_vet_check" />
                </div>

                {/* X-Rays */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">X-Rays Document/Archive</label>
                  <CloudinaryUploader onUploadSuccess={(url) => {
                    const input = document.getElementById('doc_xrays') as HTMLInputElement;
                    if(input) input.value = url;
                  }} label="Upload Document" />
                  <input type="hidden" name="doc_xrays" id="doc_xrays" />
                </div>

                {/* Passport Scan */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Passport Scan</label>
                  <CloudinaryUploader onUploadSuccess={(url) => {
                    const input = document.getElementById('doc_passport') as HTMLInputElement;
                    if(input) input.value = url;
                  }} label="Upload Document" />
                  <input type="hidden" name="doc_passport" id="doc_passport" />
                </div>
              </div>
            </div>

            {/* Media Upload */}
            <div className="col-span-2 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Media</h3>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Image</label>
              <CloudinaryUploader onUploadSuccess={(url) => {
                const input = document.getElementById('cover_image_url') as HTMLInputElement;
                if(input) input.value = url;
              }} label="Upload Cover Image" />
              <input type="hidden" name="cover_image_url" id="cover_image_url" />
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
