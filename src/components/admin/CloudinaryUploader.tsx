'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { UploadCloud } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

interface CloudinaryUploaderProps {
  onUploadSuccess: (url: string) => void
  label?: string
}

export default function CloudinaryUploader({ onUploadSuccess, label = "Upload Image" }: CloudinaryUploaderProps) {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)

  return (
    <CldUploadWidget 
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      onSuccess={(result: any) => {
        if (result?.info?.secure_url) {
          setUploadedUrl(result.info.secure_url)
          onUploadSuccess(result.info.secure_url)
        }
      }}
    >
      {({ open }) => {
        return (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => open()}
              className="w-full flex justify-center items-center gap-2 px-4 py-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <UploadCloud size={24} />
              <span className="font-medium">{label}</span>
            </button>
            {uploadedUrl && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <Image src={uploadedUrl} alt="Uploaded preview" fill className="object-cover" />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}
