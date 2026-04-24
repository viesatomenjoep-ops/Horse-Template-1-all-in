'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getEmployees, staffLogin, clockIn, clockOut, getLastAction, getTasks, toggleTaskComplete, getTodayHours, getEmployeeMonthlyHistory } from '@/app/actions/staff'
import { LogIn, LogOut, CheckCircle2, Circle, Clock, Timer, CalendarDays, Megaphone, CalendarRange, Umbrella, FileEdit, UserCheck, Calendar, AlertCircle } from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function StaffPortal() {
  const [employees, setEmployees] = useState<any[]>([])
  const [loggedInEmp, setLoggedInEmp] = useState<any | null>(null)
  
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  
  const [lastAction, setLastAction] = useState<any | null>(null)
  const [tasks, setTasks] = useState<any[]>([])
  const [todayMs, setTodayMs] = useState(0)
  const [history, setHistory] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('dashboard')

  // Load basic data
  useEffect(() => {
    const saved = localStorage.getItem('equivest_staff_session')
    if (saved) {
      const emp = JSON.parse(saved)
      setLoggedInEmp(emp)
      fetchDashboardData(emp.id)
    }

    getEmployees().then(data => {
      if (data) setEmployees(data)
    }).catch(console.error)
  }, [])

  // Live timer for currently working employees
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (loggedInEmp && lastAction?.action === 'clock_in') {
      interval = setInterval(() => {
        setTodayMs(prev => prev + 60000)
      }, 60000)
    }
    return () => clearInterval(interval)
  }, [loggedInEmp, lastAction])

  const fetchDashboardData = async (empId: string) => {
    const action = await getLastAction(empId)
    setLastAction(action)

    const ms = await getTodayHours(empId)
    setTodayMs(ms)

    const today = new Date().toISOString().split('T')[0]
    const todaysTasks = await getTasks(today)
    setTasks(todaysTasks)

    const monthlyHistory = await getEmployeeMonthlyHistory(empId)
    setHistory(monthlyHistory)
  }

  const handleLogin = async (e: React.FormEvent, pinArg?: string) => {
    e.preventDefault()
    setError('')
    const loginPin = pinArg || pin
    const res = await staffLogin(loginPin)
    if (res.error) {
      setError(res.error)
      setPin('') 
    } else if (res.success && res.employee) {
      setLoggedInEmp(res.employee)
      localStorage.setItem('equivest_staff_session', JSON.stringify(res.employee))
      setPin('')
      fetchDashboardData(res.employee.id)
    }
  }

  const handleLogout = () => {
    setLoggedInEmp(null)
    setLastAction(null)
    setActiveTab('dashboard')
    localStorage.removeItem('equivest_staff_session')
  }

  const handleClockIn = async () => {
    if (!loggedInEmp) return
    await clockIn(loggedInEmp.id)
    await fetchDashboardData(loggedInEmp.id)
  }

  const handleClockOut = async () => {
    if (!loggedInEmp) return
    await clockOut(loggedInEmp.id)
    await fetchDashboardData(loggedInEmp.id)
  }

  const handleToggleTask = async (taskId: string, currentStatus: boolean) => {
    if (!loggedInEmp) return
    setTasks(tasks.map(t => t.id === taskId ? { ...t, is_completed: !currentStatus, completed_by_emp: { full_name: loggedInEmp.full_name } } : t))
    await toggleTaskComplete(taskId, loggedInEmp.id, !currentStatus)
    await fetchDashboardData(loggedInEmp.id)
  }

  const isClockedIn = lastAction?.action === 'clock_in'
  const hours = Math.floor(todayMs / (1000 * 60 * 60))
  const minutes = Math.floor((todayMs % (1000 * 60 * 60)) / (1000 * 60))

  if (!loggedInEmp) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 relative">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="bg-primary p-8 text-center relative flex flex-col items-center">
            <Image src="/logo.png" alt="Equivest Logo" width={64} height={64} className="w-16 h-16 object-contain mb-4" />
            <h1 className="text-3xl font-serif font-bold text-white uppercase tracking-widest">Staff Terminal</h1>
            <p className="text-primary-light mt-2 font-medium">Enter your 4-digit PIN</p>
          </div>
          
          <div className="p-8">
            {error && <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-bold text-center animate-pulse">{error}</div>}
            
            <div className="flex justify-center gap-4 mb-8">
              {[0, 1, 2, 3].map((index) => (
                <div 
                  key={index} 
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-200 ${
                    pin.length > index 
                      ? 'bg-primary text-white scale-110 shadow-md' 
                      : 'bg-gray-100 dark:bg-gray-700 text-transparent'
                  }`}
                >
                  {pin.length > index ? '•' : ''}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    if (pin.length < 4) {
                      const newPin = pin + num
                      setPin(newPin)
                      if (newPin.length === 4) setTimeout(() => handleLogin({ preventDefault: () => {} } as any, newPin), 100)
                    }
                  }}
                  className="h-20 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-2xl text-2xl font-bold text-gray-900 dark:text-white transition-transform active:scale-95 shadow-sm"
                >
                  {num}
                </button>
              ))}
              
              <button
                type="button"
                onClick={() => setPin('')}
                className="h-20 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 rounded-2xl text-sm font-bold text-red-600 transition-transform active:scale-95 shadow-sm"
              >
                CLEAR
              </button>
              
              <button
                type="button"
                onClick={() => {
                  if (pin.length < 4) {
                    const newPin = pin + '0'
                    setPin(newPin)
                    if (newPin.length === 4) setTimeout(() => handleLogin({ preventDefault: () => {} } as any, newPin), 100)
                  }
                }}
                className="h-20 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-2xl text-2xl font-bold text-gray-900 dark:text-white transition-transform active:scale-95 shadow-sm"
              >
                0
              </button>
              
              <button
                type="button"
                onClick={() => setPin(pin.slice(0, -1))}
                className="h-20 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-2xl text-xl font-bold text-gray-600 dark:text-gray-300 transition-transform active:scale-95 shadow-sm flex justify-center items-center"
              >
                ⌫
              </button>
            </div>
            
            <div className="text-center mt-8">
              <a href="/" className="text-xs text-gray-400 hover:text-primary transition-colors font-medium tracking-wider uppercase">Return to Website</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
              {loggedInEmp.full_name.charAt(0)}
            </div>
            <div>
              <h1 className="font-bold text-gray-900 dark:text-white leading-tight">{loggedInEmp.full_name}</h1>
              <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${isClockedIn ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {isClockedIn ? 'Clocked In' : 'Clocked Out'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button onClick={handleLogout} className="text-gray-500 hover:text-gray-900 dark:hover:text-white p-2">
              <LogOut size={24} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto hide-scrollbar border-t border-gray-100 dark:border-gray-700">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${activeTab === 'dashboard' ? 'bg-primary text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            <Clock size={16} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('schedule')} 
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${activeTab === 'schedule' ? 'bg-primary text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            <CalendarRange size={16} /> Rooster & Historie
          </button>
          <button 
            onClick={() => setActiveTab('leave')} 
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${activeTab === 'leave' ? 'bg-primary text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            <Umbrella size={16} /> Verlof & Beschikbaarheid
          </button>
          <button 
            onClick={() => setActiveTab('notices')} 
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${activeTab === 'notices' ? 'bg-primary text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            <Megaphone size={16} /> Prikbord <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full ml-1">1</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-6 pb-12">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Clock Widget */}
              <section className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 p-8 text-center relative overflow-hidden flex-1 flex flex-col items-center justify-center min-h-[400px]">
                {isClockedIn && <div className="absolute inset-0 bg-green-50 dark:bg-green-900/10 opacity-50 animate-pulse pointer-events-none"></div>}
                
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Current Status</h2>
                <div className="mb-8">
                  {isClockedIn ? (
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-4 py-1.5 rounded-full text-sm font-bold animate-fade-in">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                      ACTIVELY WORKING
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 px-4 py-1.5 rounded-full text-sm font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                      OFF THE CLOCK
                    </div>
                  )}
                </div>

                <div className="flex justify-center items-center relative z-10 py-4">
                  {!isClockedIn ? (
                    <button onClick={handleClockIn} className="group flex flex-col items-center justify-center gap-6 transition-all hover:scale-105 active:scale-95">
                      <div className="w-48 h-48 rounded-full bg-green-50 dark:bg-green-900/30 shadow-xl border-4 border-green-500 flex items-center justify-center p-6 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 group-hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] transition-all duration-300">
                        <Image src="/logo.png" alt="Clock In Logo" width={120} height={120} className="object-contain drop-shadow-md" />
                      </div>
                      <div className="bg-green-600 text-white px-8 py-3 rounded-full font-black tracking-widest shadow-lg group-hover:bg-green-500 transition-colors">TAP TO CLOCK IN</div>
                    </button>
                  ) : (
                    <button onClick={handleClockOut} className="group flex flex-col items-center justify-center gap-6 transition-all hover:scale-105 active:scale-95">
                      <div className="w-48 h-48 rounded-full bg-red-50 dark:bg-red-900/30 shadow-[0_0_40px_rgba(239,68,68,0.3)] border-4 border-red-500 flex items-center justify-center p-6 animate-pulse group-hover:bg-red-100 dark:group-hover:bg-red-900/50 group-hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] transition-all duration-300">
                        <Image src="/logo.png" alt="Clock Out Logo" width={120} height={120} className="object-contain drop-shadow-md" />
                      </div>
                      <div className="bg-red-600 group-hover:bg-red-500 text-white px-8 py-3 rounded-full font-black tracking-widest shadow-lg transition-colors">
                        <span className="group-hover:hidden">ACTIVELY LOGGING</span>
                        <span className="hidden group-hover:inline">TAP TO CLOCK OUT</span>
                      </div>
                    </button>
                  )}
                </div>
              </section>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <Timer size={14} /> Total Time Today
                  </span>
                  <div className="text-4xl font-mono font-black text-primary dark:text-white tracking-tight">
                    {hours}<span className="text-xl text-gray-400">h</span> {minutes.toString().padStart(2, '0')}<span className="text-xl text-gray-400">m</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Last Activity</span>
                  {lastAction ? (
                    <div className="text-center">
                      <div className={`text-xl font-bold mb-1 ${lastAction.action === 'clock_in' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {lastAction.action === 'clock_in' ? 'Clocked In' : 'Clocked Out'}
                      </div>
                      <div className="text-xl font-mono font-bold text-gray-900 dark:text-white mt-1">
                        {new Date(lastAction.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-400 italic text-sm">No activity</div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6">
              <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex-1 flex flex-col min-h-[300px]">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-serif font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="text-primary" size={20} /> Today's Tasks
                  </h2>
                </div>
                
                <ul className="divide-y divide-gray-100 dark:divide-gray-700/50">
                  {tasks.length === 0 ? (
                    <li className="p-8 text-center text-gray-500">No tasks for today. Have a great day!</li>
                  ) : (
                    tasks.map(task => (
                      <li key={task.id} onClick={() => handleToggleTask(task.id, task.is_completed)} className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${task.is_completed ? 'opacity-60' : ''}`}>
                        <button className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${task.is_completed ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-gray-600 text-transparent'}`}>
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${task.is_completed ? 'text-gray-500 line-through' : 'text-gray-900 dark:text-white'}`}>{task.description}</p>
                          {task.is_completed && task.completed_by_emp && (
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">Completed by {task.completed_by_emp.full_name}</p>
                          )}
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </section>
            </div>
          </div>
        )}

        {/* TAB 2: ROOSTER & HISTORIE */}
        {activeTab === 'schedule' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            {/* FEATURE 1: Rooster Bekijken */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <CalendarRange className="text-primary" /> Mijn Rooster (Deze Week)
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Maandag 26 April</p>
                    <p className="text-sm text-gray-500">Stallen & Voeren</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-primary">07:00 - 15:30</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Woensdag 28 April</p>
                    <p className="text-sm text-gray-500">Longeren & Rijden</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-primary">08:00 - 17:00</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl opacity-50">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Vrijdag 30 April</p>
                    <p className="text-sm text-gray-500">Vrij</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <CalendarDays className="text-primary" /> Gewerkte Uren
              </h2>
              <ul className="divide-y divide-gray-100 dark:divide-gray-700/50 max-h-80 overflow-y-auto mb-4">
                {history.length === 0 ? (
                  <li className="p-4 text-center text-gray-500">No recent shifts found.</li>
                ) : (
                  history.map((day, idx) => {
                    const dayHours = Math.floor(day.totalMs / (1000 * 60 * 60))
                    const dayMins = Math.floor((day.totalMs % (1000 * 60 * 60)) / (1000 * 60))
                    return (
                      <li key={idx} className="py-3 flex items-center justify-between">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {new Date(day.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                        </div>
                        <div className="font-mono font-bold text-primary dark:text-primary-light bg-primary/10 px-3 py-1 rounded-full">
                          {dayHours}h {dayMins.toString().padStart(2, '0')}m
                        </div>
                      </li>
                    )
                  })
                )}
              </ul>
              
              {/* FEATURE 2: Correctieverzoek */}
              <button className="w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <FileEdit size={18} /> Uren vergeten? Vraag correctie aan
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: VERLOF & BESCHIKBAARHEID */}
        {activeTab === 'leave' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {/* FEATURE 3: Verlof Aanvragen */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Umbrella className="text-primary" /> Verlof Aanvragen
              </h2>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Verlofaanvraag succesvol verzonden ter goedkeuring."); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Van</label>
                    <input type="date" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tot</label>
                    <input type="date" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type Verlof</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Vakantie (Betaald)</option>
                    <option>Ziekte</option>
                    <option>Bijzonder Verlof</option>
                    <option>Onbetaald Verlof</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Opmerking</label>
                  <textarea rows={2} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"></textarea>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg transition-colors">
                  Aanvraag Indienen
                </button>
              </form>
            </div>

            {/* FEATURE 4: Beschikbaarheid */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <UserCheck className="text-primary" /> Mijn Beschikbaarheid
              </h2>
              <p className="text-sm text-gray-500 mb-6">Geef aan wanneer je volgende week extra kunt werken of juist absoluut niet beschikbaar bent.</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800 rounded-xl">
                  <div>
                    <p className="font-bold text-green-900 dark:text-green-400">Extra Werken</p>
                    <p className="text-sm text-green-700 dark:text-green-500">Ik ben komend weekend beschikbaar voor extra diensten.</p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 rounded-xl">
                  <div>
                    <p className="font-bold text-red-900 dark:text-red-400">Niet Beschikbaar</p>
                    <p className="text-sm text-red-700 dark:text-red-500">Ik kan volgende week dinsdag en woensdag niet werken.</p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRIKBORD */}
        {activeTab === 'notices' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8 animate-fade-in">
            {/* FEATURE 5: Prikbord / Mededelingen */}
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 dark:border-gray-700 pb-4">
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Megaphone className="text-accent" size={28} /> Mededelingen & Updates
              </h2>
            </div>
            
            <div className="space-y-6 max-w-3xl">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg dark:bg-red-900/10">
                <div className="flex items-center gap-2 text-red-800 dark:text-red-400 font-bold mb-1">
                  <AlertCircle size={18} /> BELANGRIJK: FEI Inspectie
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Aankomende woensdag is er een officiële FEI inspectie op stal. Zorg dat alle paspoorten klaarliggen en de stallen extra zijn aangeveegd!
                </p>
                <p className="text-xs text-gray-500 mt-2 font-medium">Geplaatst door: Tom - Gisteren om 14:30</p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg dark:bg-blue-900/10">
                <div className="flex items-center gap-2 text-blue-800 dark:text-blue-400 font-bold mb-1">
                  Nieuw Paard Binnengekomen
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Chimi is zojuist gearriveerd in stal 4. Hij moet komende 3 dagen apart op de paddock ivm quarantaine. Let goed op het voerschema op de deur.
                </p>
                <p className="text-xs text-gray-500 mt-2 font-medium">Geplaatst door: Tom - 22 April om 09:15</p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
