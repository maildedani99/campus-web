"use client"

import { useState } from "react"
import { Caveat } from "next/font/google"
import { CheckCircle } from "lucide-react"

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
})

// Tareas fijas que no se eliminan
const fixedTasks = [
  "Gracias, gracias, gracias",
  "Audio de la semana",
  "Palabra del día: RETOMAR",
  "Meditación",
  "Lectura",
]

export default function Whiteboard() {
  const [tasks, setTasks] = useState<string[]>([])
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [newTask, setNewTask] = useState("")

  const addTask = () => {
    const trimmed = newTask.trim()
    if (!trimmed || fixedTasks.includes(trimmed)) return
    setTasks([...tasks, trimmed])
    setNewTask("")
  }
const toggleComplete = (task: string) => {
  setCompleted((prev) => {
    const copy = new Set(prev)
    if (copy.has(task)) {
      copy.delete(task)
    } else {
      copy.add(task)
    }
    return copy
  })
}


  const clearWhiteboard = () => {
    setTasks([])
    setCompleted(new Set())
  }

  return (
    <div className="w-full max-w-lg bg-white border-[6px] border-[#D6A77A] rounded-xl shadow-lg p-6 mx-auto">
      <div className={`${caveat.className} text-black`}>
        <h2 className="text-2xl font-bold mb-4">Mi Pizarra del Día ✍️</h2>

        <ul className="text-lg space-y-2">
          {[...fixedTasks, ...tasks].map((task, i) => (
            <li
              key={i}
              onClick={() => toggleComplete(task)}
              className={`cursor-pointer flex items-center gap-2 ${
                completed.has(task) ? "line-through text-green-700" : ""
              }`}
            >
              {completed.has(task) && (
                <CheckCircle size={16} className="text-green-500" />
              )}
              {task}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-2">
          <input
            type="text"
            placeholder="Nueva tarea..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-lg text-black"
          />
          <button
            onClick={addTask}
            className="bg-amber-900 text-white px-4 py-1 rounded-md hover:bg-amber-800"
          >
            Añadir
          </button>
        </div>

        <div className="mt-4 text-right">
          <button
            onClick={clearWhiteboard}
            className="text-sm text-red-600 hover:underline"
          >
            Borrar pizarra
          </button>
        </div>
      </div>
    </div>
  )
}
