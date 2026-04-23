import Link from 'next/link'
import Image from 'next/image'
import { ShieldAlert, Users } from 'lucide-react'

export default function LoginHubPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        
        <div className="text-center mb-12 flex flex-col items-center">
          <Image src="/logo.png" alt="Equivest Logo" width={80} height={80} className="w-20 h-20 object-contain mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary dark:text-white mb-4 tracking-tight">Welcome to Equivest</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Please select your login portal to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Admin Login Card */}
          <Link href="/admin/login" className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col items-center text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
              <ShieldAlert size={40} />
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3">Admin Portal</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">
              Access the Equivest CMS to manage horses, team, leads, and website settings.
            </p>
            
            <span className="mt-auto px-6 py-3 bg-primary text-white text-sm font-bold uppercase tracking-widest rounded-full group-hover:bg-secondary transition-colors">
              Login as Admin
            </span>
          </Link>

          {/* Staff Login Card */}
          <Link href="/staff" className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col items-center text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform duration-300">
              <Users size={40} />
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3">Staff Portal</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">
              Log in with your 4-digit PIN to clock in, clock out, and check off daily tasks.
            </p>
            
            <span className="mt-auto px-6 py-3 bg-accent text-white text-sm font-bold uppercase tracking-widest rounded-full group-hover:bg-accent-light transition-colors">
              Login as Staff
            </span>
          </Link>

        </div>
      </div>
    </div>
  )
}
