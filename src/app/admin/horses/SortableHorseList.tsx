'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, GripVertical } from 'lucide-react'
import { updateHorseOrder, deleteHorse } from '@/app/actions/horse'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

export default function SortableHorseList({ initialHorses }: { initialHorses: any[] }) {
  const [horses, setHorses] = useState(initialHorses)
  const [isSaving, setIsSaving] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    if (sourceIndex === destinationIndex) return

    const newHorses = Array.from(horses)
    const [reorderedItem] = newHorses.splice(sourceIndex, 1)
    newHorses.splice(destinationIndex, 0, reorderedItem)

    setHorses(newHorses)
    setIsSaving(true)

    try {
      const horseIds = newHorses.map(h => h.id)
      await updateHorseOrder(horseIds)
    } catch (err) {
      console.error("Failed to update order", err)
    } finally {
      setIsSaving(false)
    }
  }

  // Handle server-side rendering mismatch with DragDropContext
  if (!isMounted) {
    return null
  }

  return (
    <div className="space-y-4">
      {isSaving && <div className="text-sm text-green-600 animate-pulse font-medium">Volgorde wordt opgeslagen...</div>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        {/* ADD SALES HORSE CARD */}
        <Link 
          href="/admin/horses/new?category=sales" 
          className="bg-primary/5 hover:bg-primary/10 border-2 border-dashed border-primary/30 hover:border-primary/50 rounded-2xl flex flex-col items-center justify-center p-8 transition-all duration-200 min-h-[250px] group"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus size={32} className="text-primary" />
          </div>
          <h3 className="text-lg font-bold text-primary">New Sales Horse</h3>
          <p className="text-sm text-gray-500 text-center mt-2">Public inventory</p>
        </Link>

        {/* ADD INVESTMENT HORSE CARD */}
        <Link 
          href="/admin/horses/new?category=investment" 
          className="bg-accent/5 hover:bg-accent/10 border-2 border-dashed border-accent/30 hover:border-accent/50 rounded-2xl flex flex-col items-center justify-center p-8 transition-all duration-200 min-h-[250px] group"
        >
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus size={32} className="text-accent" />
          </div>
          <h3 className="text-lg font-bold text-accent text-center">New Investment Horse</h3>
          <p className="text-sm text-gray-500 text-center mt-2">Private portfolio</p>
        </Link>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="horses-grid" direction="horizontal">
          {(provided) => (
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {horses.length === 0 ? (
                <div className="col-span-full bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 text-center text-gray-500">
                  No horses found. Click a button to begin.
                </div>
              ) : (
                horses.map((horse: any, index: number) => (
                  <Draggable key={horse.id} draggableId={horse.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col relative bg-white ${snapshot.isDragging ? 'shadow-2xl scale-105 z-50 ring-2 ring-primary' : 'hover:shadow-md transition-all'}`}
                      >
                        {/* Drag Handle Icon */}
                        <div 
                          {...provided.dragHandleProps}
                          className="absolute top-2 right-2 z-20 p-2 bg-white/90 rounded-md shadow-sm text-gray-500 hover:text-gray-900 cursor-grab active:cursor-grabbing backdrop-blur-sm"
                        >
                          <GripVertical size={16} />
                        </div>

                        {/* Category Badge */}
                        <div className={`absolute top-0 left-0 right-0 z-10 py-1 text-center text-xs font-bold text-white shadow-sm ${horse.category === 'investment' ? 'bg-accent' : 'bg-primary'}`}>
                          {horse.category === 'investment' ? 'INVESTMENT HORSE' : 'SALES HORSE'}
                        </div>
                        
                        <div className="relative h-48 bg-gray-100 dark:bg-gray-900 mt-6 overflow-hidden">
                          {horse.cover_image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={horse.cover_image_url} alt={horse.name} className="w-full h-full object-cover pointer-events-none" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 pointer-events-none">No image</div>
                          )}
                          <div className="absolute bottom-3 right-3">
                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/90 text-gray-900 shadow-sm backdrop-blur-sm">
                              {horse.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-5 pb-0 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{horse.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{horse.discipline} • {horse.birth_year}</p>
                        </div>
                        
                        <div className="p-5 pt-0 mt-auto flex flex-col">
                          <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-2">
                            <Link 
                              href={`/admin/horses/${horse.id}/edit`} 
                              className="flex-1 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2 rounded-xl text-center transition-colors text-sm"
                            >
                              Edit
                            </Link>
                            <form action={deleteHorse.bind(null, horse.id)} className="flex-none">
                              <button type="submit" className="px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 font-medium rounded-xl transition-colors text-sm">
                                Delete
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
