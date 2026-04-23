'use client'

import { useState, useEffect } from 'react'
import { getEmployees, staffLogin, clockIn, clockOut, getLastAction, getTasks, toggleTaskComplete, getTodayHours } from '@/app/actions/staff'
import { LogIn, LogOut, CheckCircle2, Circle, Clock, Timer } from 'lucide-react'

export default function StaffPortal() {
  const [employees, setEmployees] = useState<any[]>([])
  const [loggedInEmp, setLoggedInEmp] = useState<any | null>(null)
  
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  
  const [lastAction, setLastAction] = useState<any | null>(null)
  const [tasks, setTasks] = useState<any[]>([])
  const [todayMs, setTodayMs] = useState(0)

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
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const res = await staffLogin(pin)
    if (res.error) {
      setError(res.error)
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
      <div className="min-h-screen bg-white  flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white  rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-primary p-6 text-center">
            <h1 className="text-2xl font-serif font-bold text-white uppercase tracking-widest">Equivest Staff</h1>
            <p className="text-primary-light mt-2 text-sm">Enter your PIN to log in</p>
          </div>
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">{error}</div>}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ">PIN Code</label>
              <input 
                type="password" 
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full text-center text-4xl tracking-[0.5em] font-mono py-4 rounded-xl border border-gray-300  bg-white  text-gray-900  focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="••••"
                required
              />
            </div>

            <button type="submit" className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-xl transition-colors uppercase tracking-widest text-sm">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white  pb-20">
      {/* Header */}
      <header className="bg-white  shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
              {loggedInEmp.full_name.charAt(0)}
            </div>
            <div>
              <h1 className="font-bold text-gray-900  leading-tight">{loggedInEmp.full_name}</h1>
              <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${isClockedIn ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {isClockedIn ? 'Clocked In' : 'Clocked Out'}
              </p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-gray-500 hover:text-gray-900 :text-white p-2">
            <LogOut size={24} />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-8 space-y-8">
        
        {/* Time Clock Widget */}
        <section className="bg-white  rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100  p-8 text-center relative overflow-hidden">
          {isClockedIn && (
            <div className="absolute inset-0 bg-green-50  opacity-50 animate-pulse pointer-events-none"></div>
          )}
          
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400  mb-2">Current Status</h2>
          
          <div className="mb-8">
            {isClockedIn ? (
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700   px-4 py-1.5 rounded-full text-sm font-bold animate-fade-in">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                ACTIVELY WORKING
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600   px-4 py-1.5 rounded-full text-sm font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                OFF THE CLOCK
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10">
            {!isClockedIn ? (
              <button 
                onClick={handleClockIn}
                className="group flex flex-col items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white p-8 rounded-3xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-2 w-full sm:w-64"
              >
                <LogIn size={48} className="group-hover:scale-110 transition-transform" />
                <span className="text-2xl font-black tracking-widest">CLOCK IN</span>
              </button>
            ) : (
              <button 
                onClick={handleClockOut}
                className="group flex flex-col items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white p-8 rounded-3xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-2 w-full sm:w-64"
              >
                <Clock size={48} className="group-hover:scale-110 transition-transform" />
                <span className="text-2xl font-black tracking-widest">CLOCK OUT</span>
              </button>
            )}
          </div>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100  pt-8 relative z-10">
            
            {/* Today's Hours */}
            <div className="bg-white  rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-100 ">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                <Timer size={14} /> Total Time Today
              </span>
              <div className="text-5xl font-mono font-black text-primary  tracking-tight">
                {hours}<span className="text-2xl text-gray-400">h</span> {minutes.toString().padStart(2, '0')}<span className="text-2xl text-gray-400">m</span>
              </div>
            </div>

            {/* Last Action Detail */}
            <div className="bg-white  rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-100 ">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Last Activity
              </span>
              {lastAction ? (
                <div className="text-center">
                  <div className={`text-xl font-bold mb-1 ${lastAction.action === 'clock_in' ? 'text-green-600 ' : 'text-red-600 '}`}>
                    {lastAction.action === 'clock_in' ? 'Clocked In' : 'Clocked Out'}
                  </div>
                  <div className="text-sm text-gray-600  font-medium">
                    {new Date(lastAction.timestamp).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </div>
                  <div className="text-2xl font-mono font-bold text-gray-900  mt-1">
                    {new Date(lastAction.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 italic">No activity yet</div>
              )}
            </div>

          </div>
        </section>

        {/* Daily Tasks */}
        <section className="bg-white  rounded-2xl shadow-sm border border-gray-200  overflow-hidden">
          <div className="bg-white  p-4 border-b border-gray-200 ">
            <h2 className="text-lg font-serif font-semibold text-gray-900  flex items-center gap-2">
              <CheckCircle2 className="text-primary" size={20} />
              Today's Tasks
            </h2>
          </div>
          
          <ul className="divide-y divide-gray-100 ">
            {tasks.length === 0 ? (
              <li className="p-8 text-center text-gray-500">No tasks for today. Have a great day!</li>
            ) : (
              tasks.map(task => (
                <li 
                  key={task.id} 
                  onClick={() => handleToggleTask(task.id, task.is_completed)}
                  className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-white :bg-gray-700/50 transition-colors ${task.is_completed ? 'opacity-60' : ''}`}
                >
                  <button className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${task.is_completed ? 'bg-green-500 border-green-500' : 'border-gray-300  text-transparent'}`}>
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </button>
                  <div className="flex-1">
                    <p className={`font-medium ${task.is_completed ? 'text-gray-500 line-through' : 'text-gray-900 '}`}>
                      {task.description}
                    </p>
                    {task.is_completed && task.completed_by_emp && (
                      <p className="text-xs text-green-600  mt-1">
                        Completed by {task.completed_by_emp.full_name}
                      </p>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>
      </main>
    </div>
  )
}
