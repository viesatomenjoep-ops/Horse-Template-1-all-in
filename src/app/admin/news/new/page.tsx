'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createNewsArticle } from '@/app/actions/news'
import dynamic from 'next/dynamic'
const CloudinaryUploader = dynamic(() => import('@/components/admin/CloudinaryUploader'), { ssr: false })
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function NewNewsPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    if (imageUrl) {
      formData.append('image_url', imageUrl)
    }

    try {
      const result = await createNewsArticle(formData)
      if (result.error) {
        setError(result.error)
        setIsSubmitting(false)
        return
      }
      router.push('/admin/news')
    } catch (err: any) {
      setError(err.message || "Failed to create article")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/news" className="p-2 hover:bg-gray-100 :bg-gray-800 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-500" />
        </Link>
        <h1 className="text-3xl font-serif font-bold text-gray-900 ">Add News Article</h1>
      </div>

      <div className="bg-white  shadow rounded-lg p-6 border border-gray-200 ">
        {error && (
          <div className="mb-6 p-4 bg-red-50  text-red-600 rounded-md text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 ">Title *</label>
              <input required type="text" name="title" id="title" className="mt-1 block w-full rounded-md border border-gray-300  px-3 py-2 bg-white  text-gray-900  focus:border-primary focus:ring-primary sm:text-sm" />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 ">Short Excerpt (Preview text)</label>
              <textarea name="excerpt" id="excerpt" rows={2} className="mt-1 block w-full rounded-md border border-gray-300  px-3 py-2 bg-white  text-gray-900  focus:border-primary focus:ring-primary sm:text-sm" />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 ">Full Content *</label>
              <textarea required name="content" id="content" rows={10} className="mt-1 block w-full rounded-md border border-gray-300  px-3 py-2 bg-white  text-gray-900  focus:border-primary focus:ring-primary sm:text-sm" />
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700  mb-2">Article Image</label>
              <CloudinaryUploader onUploadSuccess={setImageUrl} label="Upload Image" />
            </div>
          </div>

          <div className="flex justify-end border-t border-gray-200  pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Publishing...</>
              ) : (
                'Publish Article'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
