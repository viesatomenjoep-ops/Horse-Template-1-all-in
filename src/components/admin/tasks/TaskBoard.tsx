'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle2, Circle, Clock, Stethoscope, Carrot, Dumbbell, Brush, Calendar as CalendarIcon, X, Plus, Paperclip, ExternalLink, ArrowRight, User, Filter } from 'lucide-react'
import CloudinaryUploader from '@/components/admin/CloudinaryUploader'

type Task = {
  id: string
  horse_id: string
  assigned_user_id: string
  task_type: string
  title: string
  status: string
  scheduled_at: string
  completed_at: string | null
  notes: string
  attachment_url: string | null
  horses: { name: string; current_box_id: string }
  admin_permissions: { email: string }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Medisch': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30'
    case 'Voeding': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30'
    case 'Training': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30'
    case 'Verzorging': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-900/30'
    default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Medisch': return <Stethoscope size={16} />
    case 'Voeding': return <Carrot size={16} />
    case 'Training': return <Dumbbell size={16} />
    case 'Verzorging': return <Brush size={16} />
    default: return <Clock size={16} />
  }
}

export default function TaskBoard({ 
  initialTasks, 
  horses, 
  staff, 
  isError,
  hideHeader = false
}: { 
  initialTasks: any[],
  horses: any[],
  staff: any[],
  isError: boolean,
  hideHeader?: boolean
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Filters
  const [staffFilter, setStaffFilter] = useState<string>('all')
  const [horseFilter, setHorseFilter] = useState<string>('all')

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    horse_id: '',
    assigned_user_id: '',
    task_type: 'Training',
    scheduled_at: new Date().toISOString().slice(0, 16),
    notes: '',
    attachment_url: ''
  })

  const supabase = createClient()
  
  const changeTaskStatus = async (task: Task, newStatus: string) => {
    setTasks(tasks.map(t => t.id === task.id ? { ...t, status: newStatus } : t))
    
    const { error } = await supabase
      .from('stable_tasks')
      .update({ 
        status: newStatus,
        completed_at: newStatus === 'Klaar' ? new Date().toISOString() : null
      })
      .eq('id', task.id)
      
    if (error) {
      console.error('Failed to update task:', error)
      setTasks(tasks) // revert on error
      alert("Fout bij updaten status")
    }
  }

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const { data, error } = await supabase
      .from('stable_tasks')
      .insert([{
        ...formData,
        scheduled_at: new Date(formData.scheduled_at).toISOString(),
        status: 'To-do'
      }])
      .select('*')
      .single()
      
    if (error) {
      console.error('Failed to create task:', error)
      alert('Error: Kon de taak niet opslaan. Controleer de velden.')
    } else if (data) {
      setTasks([...tasks, data as Task].sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()))
      setShowModal(false)
      setFormData({
        title: '',
        horse_id: '',
        assigned_user_id: '',
        task_type: 'Training',
        scheduled_at: new Date().toISOString().slice(0, 16),
        notes: '',
        attachment_url: ''
      })
    }
    setIsSubmitting(false)
  }

  const filteredTasks = tasks.filter(t => {
    if (staffFilter !== 'all' && t.assigned_user_id !== staffFilter) return false;
    if (horseFilter !== 'all' && t.horse_id !== horseFilter) return false;
    return true;
  });

  const todoTasks = filteredTasks.filter(t => t.status === 'To-do' || !t.status)
  const inProgressTasks = filteredTasks.filter(t => t.status === 'Bezig')
  const completedTasks = filteredTasks.filter(t => t.status === 'Klaar')

  return (
    <div className="space-y-6">
      {/* Header */}
      {!hideHeader && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary dark:text-white">Digitaal Taakbord</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Overzicht van alle staltaken voor vandaag.</p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            {isError ? (
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold border border-red-100 w-full text-center">
                Database niet gesynchroniseerd (voer SQL script uit)
              </div>
            ) : (
              <button 
                onClick={() => setShowModal(true)}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all active:scale-95 w-full md:w-auto flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Nieuwe Taak
              </button>
            )}
          </div>
        </div>
      )}

      {/* When header is hidden, we still need the filters and New Task button */}
      {!isError && (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 w-full sm:w-auto bg-gray-50 dark:bg-gray-900 p-2 rounded-xl border border-gray-200 dark:border-gray-700">
              <Filter size={16} className="text-gray-400 ml-2" />
              <select 
                value={staffFilter} 
                onChange={e => setStaffFilter(e.target.value)}
                className="bg-transparent border-none text-sm font-bold text-gray-700 dark:text-gray-300 focus:ring-0 w-full sm:w-auto"
              >
                <option value="all">Alle Personeel</option>
                {staff?.map(s => <option key={s.id} value={s.id}>{s.email}</option>)}
              </select>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto bg-gray-50 dark:bg-gray-900 p-2 rounded-xl border border-gray-200 dark:border-gray-700">
              <Filter size={16} className="text-gray-400 ml-2" />
              <select 
                value={horseFilter} 
                onChange={e => setHorseFilter(e.target.value)}
                className="bg-transparent border-none text-sm font-bold text-gray-700 dark:text-gray-300 focus:ring-0 w-full sm:w-auto"
              >
                <option value="all">Alle Paarden</option>
                {horses?.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
            </div>
          </div>

          <button 
            onClick={() => setShowModal(true)}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 w-full lg:w-auto"
          >
            <Plus size={20} />
            Nieuwe Taak
          </button>
        </div>
      )}

      {/* KANBAN BOARD */}
      {!isError && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* TO-DO COLUMN */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-4 border border-gray-200 dark:border-gray-800 min-h-[500px]">
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div> To-Do
              </h2>
              <span className="bg-white dark:bg-gray-800 text-gray-500 text-xs font-bold px-3 py-1 rounded-full shadow-sm">{todoTasks.length}</span>
            </div>
            <div className="space-y-4">
              {todoTasks.length === 0 ? (
                <div className="text-center p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl text-gray-400 text-sm">Geen taken in to-do.</div>
              ) : (
                todoTasks.map(task => (
                  <TaskCard key={task.id} task={task} onChangeStatus={changeTaskStatus} horses={horses} staff={staff} />
                ))
              )}
            </div>
          </div>

          {/* IN PROGRESS COLUMN */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-4 border border-gray-200 dark:border-gray-800 min-h-[500px]">
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div> Bezig
              </h2>
              <span className="bg-white dark:bg-gray-800 text-gray-500 text-xs font-bold px-3 py-1 rounded-full shadow-sm">{inProgressTasks.length}</span>
            </div>
            <div className="space-y-4">
              {inProgressTasks.length === 0 ? (
                <div className="text-center p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl text-gray-400 text-sm">Geen actieve taken.</div>
              ) : (
                inProgressTasks.map(task => (
                  <TaskCard key={task.id} task={task} onChangeStatus={changeTaskStatus} horses={horses} staff={staff} />
                ))
              )}
            </div>
          </div>

          {/* COMPLETED COLUMN */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-4 border border-gray-200 dark:border-gray-800 min-h-[500px] opacity-70">
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div> Klaar
              </h2>
              <span className="bg-white dark:bg-gray-800 text-gray-500 text-xs font-bold px-3 py-1 rounded-full shadow-sm">{completedTasks.length}</span>
            </div>
            <div className="space-y-4">
              {completedTasks.length === 0 ? (
                <div className="text-center p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl text-gray-400 text-sm">Nog geen taken voltooid.</div>
              ) : (
                completedTasks.map(task => (
                  <TaskCard key={task.id} task={task} onChangeStatus={changeTaskStatus} horses={horses} staff={staff} />
                ))
              )}
            </div>
          </div>

        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden my-8">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Nieuwe Taak Inplannen</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateTask} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Taak Titel</label>
                <input 
                  type="text" 
                  required
                  placeholder="Bijv. Longeren of Hoefsmid"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Type Taak</label>
                  <select 
                    value={formData.task_type}
                    onChange={e => setFormData({...formData, task_type: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option value="Training">Training</option>
                    <option value="Medisch">Medisch</option>
                    <option value="Voeding">Voeding</option>
                    <option value="Verzorging">Verzorging</option>
                    <option value="Overig">Overig</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Tijdstip</label>
                  <input 
                    type="datetime-local" 
                    required
                    value={formData.scheduled_at}
                    onChange={e => setFormData({...formData, scheduled_at: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Gekoppeld Paard (Optioneel)</label>
                <select 
                  value={formData.horse_id}
                  onChange={e => setFormData({...formData, horse_id: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="">-- Geen paard --</option>
                  {horses?.map(horse => (
                    <option key={horse.id} value={horse.id}>{horse.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Toewijzen aan (Optioneel)</label>
                <select 
                  value={formData.assigned_user_id}
                  onChange={e => setFormData({...formData, assigned_user_id: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="">-- Iedereen (Geen Specifieke Persoon) --</option>
                  {staff?.map(s => (
                    <option key={s.id} value={s.id}>{s.email}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Notities (Optioneel)</label>
                <textarea 
                  rows={2}
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Extra instructies..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Bijlage / Foto (Optioneel)</label>
                {formData.attachment_url ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
                    <span className="text-green-700 font-bold text-sm">✓ Bijlage toegevoegd</span>
                    <button type="button" onClick={() => setFormData({...formData, attachment_url: ''})} className="text-sm text-red-500 font-bold hover:underline">Verwijder</button>
                  </div>
                ) : (
                  <CloudinaryUploader 
                    onUploadSuccess={(url) => setFormData({...formData, attachment_url: url})} 
                    label="Upload referentiefoto of document" 
                  />
                )}
              </div>

              <div className="pt-4 flex gap-3 sticky bottom-0 bg-white dark:bg-gray-800 pb-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                >
                  Annuleren
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 rounded-xl font-bold bg-primary hover:bg-primary/90 text-white shadow-md transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Bezig...' : 'Opslaan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function TaskCard({ task, onChangeStatus, horses, staff }: { task: Task, onChangeStatus: (t: Task, status: string) => void, horses: any[], staff: any[] }) {
  const isCompleted = task.status === 'Klaar'
  const horse = horses?.find(h => h.id === task.horse_id)
  const user = staff?.find(s => s.id === task.assigned_user_id)
  
  return (
    <div className={`relative p-4 rounded-2xl border bg-white dark:bg-gray-800 shadow-sm transition-all duration-200 ${
      isCompleted 
        ? 'border-green-200 dark:border-green-900/30 bg-green-50/30 dark:bg-green-900/10' 
        : 'border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-primary/30'
    }`}>
      {/* Top Meta Bar */}
      <div className="flex justify-between items-center mb-3">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${getTypeColor(task.task_type)}`}>
          {getTypeIcon(task.task_type)}
          {task.task_type}
        </span>
        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 flex items-center gap-1">
          <CalendarIcon size={12} />
          {task.scheduled_at ? new Date(task.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Vandaag'}
        </span>
      </div>

      {/* Title & Info */}
      <h3 className={`text-base font-bold mb-2 ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900 dark:text-white'}`}>
        {task.title}
      </h3>
      
      {horse && (
        <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-2 mb-2 border border-primary/10">
          <p className="text-primary dark:text-primary/80 font-bold text-xs flex items-center gap-1">
            🐴 {horse.name} {horse.current_box_id && <span className="opacity-60">(Box: {horse.current_box_id})</span>}
          </p>
        </div>
      )}
      
      {user && (
        <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-3 flex items-center gap-1">
          <User size={12}/> {user.email}
        </p>
      )}
      
      {task.notes && (
        <div className="bg-orange-50 dark:bg-orange-900/10 p-2 rounded-lg mb-3 text-xs text-orange-800 dark:text-orange-400 italic border border-orange-100 dark:border-orange-900/30">
          "{task.notes}"
        </div>
      )}

      {task.attachment_url && (
        <a 
          href={task.attachment_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 w-full py-1.5 mb-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors border border-blue-100 dark:border-blue-800/30"
        >
          <Paperclip size={12} /> Bijlage <ExternalLink size={10} />
        </a>
      )}

      {/* Kanban Actions */}
      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        {task.status !== 'To-do' && (
          <button 
            onClick={() => onChangeStatus(task, 'To-do')}
            className="col-span-2 text-xs font-bold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            ↺ Terug naar To-Do
          </button>
        )}
        
        {task.status !== 'Klaar' && (
          <>
            <button 
              onClick={() => onChangeStatus(task, task.status === 'Bezig' ? 'Klaar' : 'Bezig')}
              className={`col-span-2 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                task.status === 'Bezig' 
                  ? 'bg-green-500 hover:bg-green-600 text-white shadow-md' 
                  : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 dark:bg-blue-900/30 dark:border-blue-800/50'
              }`}
            >
              {task.status === 'Bezig' ? (
                <><CheckCircle2 size={14}/> Afronden</>
              ) : (
                <><ArrowRight size={14}/> Start Taak (Bezig)</>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
