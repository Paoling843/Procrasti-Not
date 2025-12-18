import type React from "react"
import { FaBell, FaUserCircle } from "react-icons/fa"
import { LogOutIcon, MenuIcon } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Dropdown from "../ui/DropDown"
import ThemeToggle from "../ui/ThemeToggle"
import { useAuth } from '../../context/AutContext'
import { useTodos } from '../../context/TodoContext'
import { getDeadlineStatus } from '../../utils/deadline'

interface TopNavProps {
  theme: string
  setTheme: (theme: string) => void
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TopNav: React.FC<TopNavProps> = ({ theme, setTheme, isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { tasks } = useTodos();

  // Sort by urgency: overdue first, then due-soon, then upcoming, then none
  const sortByUrgency = (a: any, b: any) => {
    const statusA = getDeadlineStatus(a.reminder);
    const statusB = getDeadlineStatus(b.reminder);
    const order: Record<string, number> = { overdue: 0, 'due-soon': 1, upcoming: 2, none: 3 };
    return (order[statusA] ?? 3) - (order[statusB] ?? 3);
  };
  
  const pending = tasks.filter(t => !t.done).sort(sortByUrgency).slice(0, 5);
  const overdue = tasks.filter(t => !t.done && getDeadlineStatus(t.reminder) === 'overdue').length;

  return (
    <header className="p-4 flex justify-between items-center shadow-md dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex items-center justify-center w-10 h-10 text-slate-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-100 transition rounded"
        >
          <MenuIcon size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-600 dark:text-white">Welcome User</h1>
      </div>

      <div className="flex items-center space-x-6">
        <ThemeToggle theme={theme} setTheme={setTheme} />

        <Dropdown buttonContent={
          <div className="relative">
            <FaBell className="text-2xl cursor-pointer text-slate-700 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-700" />
            {overdue > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {overdue}
              </span>
            )}
          </div>
        }>
          <div className="p-3 border-b border-gray-200 dark:border-gray-700  dark:bg-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h3>
          </div>
          <ul className="max-h-64 overflow-y-auto dark:bg-slate-800">
            {pending.length === 0 ? (
              <li className="px-4 py-3 text-center text-slate-500 dark:text-slate-400">No new notifications</li>
            ) : (
              pending.map((n) => {
                const status = getDeadlineStatus(n.reminder);
                const bgColor = status === 'overdue' ? 'bg-red-50 dark:bg-red-900/30' : status === 'due-soon' ? 'bg-amber-50 dark:bg-amber-900/30' : '';
                return (
                  <li key={n.id} className={`px-4 py-3 border-b last:border-b-0 border-gray-200 dark:border-slate-700 ${bgColor}`}>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-slate-900 dark:text-white">{n.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(n.reminder ?? n.createdAt).toLocaleString()}</div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </Dropdown>
        <Dropdown buttonContent={<FaUserCircle className="text-2xl cursor-pointer text-slate-700 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-700" />}>
          <ul className=" dark:bg-slate-800">
            <li>
              <Link to="/profile" className="block px-4 py-2 text-slate-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700">
                Show Profile
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="w-full text-left px-4 py-2 flex items-center space-x-2 text-slate-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                <LogOutIcon size={16} /> <span>Logout</span>
              </button>
            </li>
          </ul>
        </Dropdown>
      </div>
    </header>
  )
}

export default TopNav

