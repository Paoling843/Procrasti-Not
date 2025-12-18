import type React from 'react'
import { Link } from 'react-router-dom'
import { useTodos } from '../../context/TodoContext'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { tasks } = useTodos()

  if (!isOpen) return null

  const total = tasks.length
  const completed = tasks.filter((t) => t.done).length
  const undone = tasks.filter((t) => !t.done).length
  const pending = total - completed
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <aside className="h-screen shadow-lg transition-all fixed top-0 left-0 z-50 w-64 overflow-y-auto p-4 dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold  text-slate-600 dark:text-white">To‑Do Status</h3>
        <Link to="/todos" className="text-sm text-blue-600 hover:underline">
          View
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        <div className="p-3 dark:bg-gray-800 rounded-lg shadow-black-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">{total}</div>
        </div>

        <div className="p-3 dark:bg-gray-800 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
            <div className="text-xl font-medium text-green-600 dark:text-green-400">{completed}</div>
          </div>
          <div className="text-sm text-gray-400">{percent}%</div>
        </div>

        <div className="p-3 dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400">Undone</div>
          <div className="text-xl font-medium text-red-600 dark:text-red-400">{undone}</div>
        </div>

        <div className="p-3 dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
          <div className="text-xl font-medium text-amber-600 dark:text-amber-400">{pending}</div>
        </div>

        <div className="mt-2">
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
            <div style={{ width: `${percent}%` }} className="h-3 bg-gradient-to-r from-green-500 to-emerald-600" />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

