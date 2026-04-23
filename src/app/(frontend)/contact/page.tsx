'use client'

import { useState } from 'react'
import { createLead } from '@/app/actions/lead'
import { Loader2, Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData(event.currentTarget)
    const result = await createLead(formData)

    if (result.error) {
      setError(result.error)
      setIsSubmitting(false)
    } else {
      setSuccess(true)
      setIsSubmitting(false)
      ;(event.target as HTMLFormElement).reset()
    }
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center space-y-8 mb-16">
        <h1 className="text-4xl sm:text-5xl font-serif font-light text-primary dark:text-white">
          Get in <span className="font-semibold italic text-accent">Touch</span>
        </h1>
        <p className="text-lg text-secondary dark:text-gray-400 font-light max-w-2xl mx-auto">
          Whether you are looking to purchase a world-class athlete, or require expert representation for your horse, we are here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-10">
          <div>
            <h3 className="text-2xl font-serif font-semibold text-primary dark:text-white mb-6">Contact Information</h3>
            <div className="space-y-6">
              <a href="https://wa.me/15613010984" target="_blank" rel="noopener noreferrer" className="flex items-start group">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-accent group-hover:text-white transition-colors text-accent">
                   <Phone size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white group-hover:text-accent transition-colors">Chat via WhatsApp</p>
                  <p className="text-gray-600 dark:text-gray-400">+1 (561) 301-0984</p>
                </div>
              </a>
              <a href="mailto:equivestbv@gmail.com" className="flex items-start group">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-accent group-hover:text-white transition-colors text-accent">
                   <Mail size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white group-hover:text-accent transition-colors">Send an Email</p>
                  <p className="text-gray-600 dark:text-gray-400">equivestbv@gmail.com</p>
                </div>
              </a>
              <a href="https://www.instagram.com/nomoregrayarea36" target="_blank" rel="noopener noreferrer" className="flex items-start group">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-accent group-hover:text-white transition-colors text-accent">
                   {/* Fallback to MapPin if Instagram icon is not imported, but let's use a simple SVG or generic icon */}
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white group-hover:text-accent transition-colors">Instagram</p>
                  <p className="text-gray-600 dark:text-gray-400">Follow Us</p>
                </div>
              </a>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-4 text-accent shrink-0">
                   <MapPin size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Location</p>
                  <p className="text-gray-600 dark:text-gray-400">Huikvenweg 8<br/>2990 Wuustwezel<br/><span className="italic text-sm">(on the premises of APG Stables)</span></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-64 w-full bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden relative shadow-inner">
            <iframe 
               src="https://maps.google.com/maps?q=Huikvenweg%208,%202990%20Wuustwezel&t=&z=14&ie=UTF8&iwloc=&output=embed" 
               style={{ border: 0 }} 
               allowFullScreen={false} 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               className="absolute inset-0 w-full h-full grayscale-[20%] contrast-[1.1] opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-serif font-semibold text-primary dark:text-white mb-6">Send an Inquiry</h3>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-md text-sm font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-md text-sm font-medium border border-green-200 dark:border-green-800">
              Thank you for your message. We will get back to you shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="client_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name *</label>
              <input required type="text" name="client_name" id="client_name" className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-accent focus:ring-accent sm:text-sm" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email *</label>
                <input required type="email" name="email" id="email" className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-accent focus:ring-accent sm:text-sm" />
              </div>
              <div>
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <input type="tel" name="phone_number" id="phone_number" className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-accent focus:ring-accent sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message *</label>
              <textarea required name="message" id="message" rows={5} className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-accent focus:ring-accent sm:text-sm" placeholder="How can we help you?"></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
