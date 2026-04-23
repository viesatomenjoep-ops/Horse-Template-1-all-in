'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getEmployees, staffLogin, clockIn, clockOut, getLastAction, getTasks, toggleTaskComplete, getTodayHours, getEmployeeMonthlyHistory } from '@/app/actions/staff'
import { LogIn, LogOut, CheckCircle2, Circle, Clock, Timer, CalendarDays } from 'lucide-react'

export default function StaffPortal() {
  const [employees, setEmployees] = useState<any[]>([])
  const [loggedInEmp, setLoggedInEmp] = useState<any | null>(null)
  
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  
  const [lastAction, setLastAction] = useState<any | null>(null)
  const [tasks, setTasks] = useState<any[]>([])
  const [todayMs, setTodayMs] = useState(0)
  const [history, setHistory] = useState<any[]>([])

  // Load basic data
  useEffect(() => {
    // Check if previously logged in (simple local storage session for kiosk mode)
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
        setTodayMs(prev => prev + 60000) // add a minute every minute
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
      setPin('') // Clear pin on error for quick retry
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
    // Optimistic update
    setTasks(tasks.map(t => t.id === taskId ? { ...t, is_completed: !currentStatus, completed_by_emp: { full_name: loggedInEmp.full_name } } : t))
    await toggleTaskComplete(taskId, loggedInEmp.id, !currentStatus)
    await fetchDashboardData(loggedInEmp.id)
  }

  const isClockedIn = lastAction?.action === 'clock_in'
  const hours = Math.floor(todayMs / (1000 * 60 * 60))
  const minutes = Math.floor((todayMs % (1000 * 60 * 60)) / (1000 * 60))

  if (!loggedInEmp) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="bg-primary p-8 text-center relative flex flex-col items-center">
            <Image src="/logo.png" alt="Equivest Logo" width={64} height={64} className="w-16 h-16 object-contain mb-4" />
            <h1 className="text-3xl font-serif font-bold text-white uppercase tracking-widest">Staff Terminal</h1>
            <p className="text-primary-light mt-2 font-medium">Enter your 4-digit PIN</p>
          </div>
          
          <div className="p-8">
            {error && <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-bold text-center animate-pulse">{error}</div>}
            
            {/* PIN Dots */}
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

            {/* Numpad */}
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    if (pin.length < 4) {
                      const newPin = pin + num
                      setPin(newPin)
                      if (newPin.length === 4) {
                        setTimeout(() => handleLogin({ preventDefault: () => {} } as any, newPin), 100)
                      }
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
                className="h-20 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-2xl text-sm font-bold text-red-600 transition-transform active:scale-95 shadow-sm flex items-center justify-center"
              >
                CLEAR
              </button>
              
              <button
                type="button"
                onClick={() => {
                  if (pin.length < 4) {
                    const newPin = pin + '0'
                    setPin(newPin)
                    if (newPin.length === 4) {
                      setTimeout(() => handleLogin({ preventDefault: () => {} } as any, newPin), 100)
                    }
                  }
                }}
                className="h-20 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-2xl text-2xl font-bold text-gray-900 dark:text-white transition-transform active:scale-95 shadow-sm"
              >
                0
              </button>
              
              <button
                type="button"
                onClick={() => setPin(pin.slice(0, -1))}
                className="h-20 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-2xl text-xl font-bold text-gray-600 dark:text-gray-300 transition-transform active:scale-95 shadow-sm flex items-center justify-center"
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
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
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
          <button onClick={handleLogout} className="text-gray-500 hover:text-gray-900 dark:hover:text-white p-2">
            <LogOut size={24} />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Clock Interface */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Clock Widget */}
            <section className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 p-8 text-center relative overflow-hidden flex-1 flex flex-col items-center justify-center min-h-[400px]">
              {isClockedIn && (
                <div className="absolute inset-0 bg-green-50 dark:bg-green-900/10 opacity-50 animate-pulse pointer-events-none"></div>
              )}
              
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
              <button 
                onClick={handleClockIn}
                className="group flex flex-col items-center justify-center gap-6 transition-all hover:scale-105 active:scale-95"
              >
                <div className="w-48 h-48 rounded-full bg-green-50 dark:bg-green-900/30 shadow-xl border-4 border-green-500 flex items-center justify-center p-6 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 group-hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] transition-all duration-300">
                  <Image src="/logo.png" alt="Clock In Logo" width={120} height={120} className="object-contain drop-shadow-md" />
                </div>
                <div className="bg-green-600 text-white px-8 py-3 rounded-full font-black tracking-widest shadow-lg group-hover:bg-green-500 transition-colors">
                  TAP TO CLOCK IN
                </div>
              </button>
            ) : (
              <button 
                onClick={handleClockOut}
                className="group flex flex-col items-center justify-center gap-6 transition-all hover:scale-105 active:scale-95"
              >
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
          {/* Today's Hours */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1">
              <Timer size={14} /> Total Time Today
            </span>
            <div className="text-4xl font-mono font-black text-primary dark:text-white tracking-tight">
              {hours}<span className="text-xl text-gray-400">h</span> {minutes.toString().padStart(2, '0')}<span className="text-xl text-gray-400">m</span>
            </div>
          </div>

          {/* Last Action Detail */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
              Last Activity
            </span>
            {lastAction ? (
              <div className="text-center">
                <div className={`text-xl font-bold mb-1 ${lastAction.action === 'clock_in' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {lastAction.action === 'clock_in' ? 'Clocked In' : 'Clocked Out'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  {new Date(lastAction.timestamp).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
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

      {/* RIGHT COLUMN: Tasks & History */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* Daily Tasks */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex-1 flex flex-col min-h-[300px]">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-serif font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="text-primary" size={20} />
              Today's Tasks
            </h2>
          </div>
          
          <ul className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {tasks.length === 0 ? (
              <li className="p-8 text-center text-gray-500">No tasks for today. Have a great day!</li>
            ) : (
              tasks.map(task => (
                <li 
                  key={task.id} 
                  onClick={() => handleToggleTask(task.id, task.is_completed)}
                  className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${task.is_completed ? 'opacity-60' : ''}`}
                >
                  <button className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${task.is_completed ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-gray-600 text-transparent'}`}>
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </button>
                  <div className="flex-1">
                    <p className={`font-medium ${task.is_completed ? 'text-gray-500 line-through' : 'text-gray-900 dark:text-white'}`}>
                      {task.description}
                    </p>
                    {task.is_completed && task.completed_by_emp && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        Completed by {task.completed_by_emp.full_name}
                      </p>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>

        {/* History Widget */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-serif font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <CalendarDays className="text-primary" size={20} />
              Recent Work History (30 Days)
            </h2>
          </div>
          
          <ul className="divide-y divide-gray-100 dark:divide-gray-700/50 max-h-64 overflow-y-auto">
            {history.length === 0 ? (
              <li className="p-8 text-center text-gray-500">No recent shifts found.</li>
            ) : (
              history.map((day, idx) => {
                const dayHours = Math.floor(day.totalMs / (1000 * 60 * 60))
                const dayMins = Math.floor((day.totalMs % (1000 * 60 * 60)) / (1000 * 60))
                
                return (
                  <li key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
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
        </section>

          </div>
        </div>
      </main>
    </div>
  )
}
