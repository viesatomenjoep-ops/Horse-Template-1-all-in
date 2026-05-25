'use client'

import { useState } from 'react'
import { createAppointment } from '@/app/actions/appointments'
import { Calendar, Clock, MapPin, CheckCircle, Mail, Phone, User } from 'lucide-react'

export default function BookingPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData(e.currentTarget)
      await createAppointment(formData)
      setSuccess(true)
    } catch (err: any) {
      console.error(err)
      setError("Er is iets misgegaan. Probeer het later opnieuw.")
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#111]">
        <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100 dark:border-gray-700">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary dark:text-white mb-4">Visit Requested!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Thank you for your request. We have successfully received it and will contact you as soon as possible to confirm the appointment.
          </p>
          <button 
            onClick={() => setSuccess(false)} 
            className="px-6 py-3 bg-accent text-white font-bold uppercase tracking-wider text-sm rounded-md hover:bg-primary transition-colors w-full"
          >
            New Appointment
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-[#111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary dark:text-white tracking-tight mb-4">
            Plan a Visit
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Would you like to visit us to view our horses or discuss investment opportunities? Fill in the form and we will schedule an appointment right away.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Info Section */}
          <div className="w-full lg:w-1/3 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-primary dark:text-white mb-6">Contact & Location</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">Equivest Stables</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      Visits are strictly by appointment to guarantee peace and quiet for our horses.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-accent" />
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    tomjo118735@gmail.com
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <Calendar size={150} />
              </div>
              <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
              <ul className="space-y-2 text-primary-content/80">
                <li className="flex justify-between"><span>Mon - Fri:</span> <span>09:00 - 17:00</span></li>
                <li className="flex justify-between"><span>Saturday:</span> <span>10:00 - 14:00</span></li>
                <li className="flex justify-between"><span>Sunday:</span> <span>Closed</span></li>
              </ul>
            </div>
          </div>

          {/* Booking Form */}
          <div className="w-full lg:w-2/3 bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-800">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300">
                    <User size={16} className="mr-2 text-accent" /> Name *
                  </label>
                  <input required name="clientName" type="text" placeholder="Full name" className="w-full p-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all" />
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300">
                    <Mail size={16} className="mr-2 text-accent" /> E-mail *
                  </label>
                  <input required name="clientEmail" type="email" placeholder="your@email.com" className="w-full p-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300">
                    <Phone size={16} className="mr-2 text-accent" /> Phone
                  </label>
                  <input name="clientPhone" type="tel" placeholder="+31 6 12345678" className="w-full p-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300">
                    <Calendar size={16} className="mr-2 text-accent" /> Preferred Date *
                  </label>
                  <input required name="appointmentDate" type="date" min={new Date().toISOString().split('T')[0]} className="w-full p-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all text-gray-900 dark:text-gray-100" />
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300">
                    <Clock size={16} className="mr-2 text-accent" /> Time *
                  </label>
                  <select required name="appointmentTime" className="w-full p-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all text-gray-900 dark:text-gray-100 appearance-none">
                    <option value="">Select a time</option>
                    <option value="09:00 - 10:00">09:00 - 10:00</option>
                    <option value="10:00 - 11:00">10:00 - 11:00</option>
                    <option value="11:00 - 12:00">11:00 - 12:00</option>
                    <option value="13:00 - 14:00">13:00 - 14:00</option>
                    <option value="14:00 - 15:00">14:00 - 15:00</option>
                    <option value="15:00 - 16:00">15:00 - 16:00</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                  What would you like to visit for? (Optional)
                </label>
                <textarea name="notes" rows={4} placeholder="E.g. viewing a specific horse, discussing investment..." className="w-full p-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all resize-none"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-accent text-white font-bold text-lg rounded-xl hover:bg-primary transition-all disabled:opacity-50 disabled:scale-100 active:scale-[0.98] shadow-lg shadow-accent/30"
              >
                {loading ? 'Sending...' : 'Confirm Visit Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
