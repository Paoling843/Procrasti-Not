import React from "react";
import { Link } from "react-router-dom";
import { useTodos } from "../context/TodoContext";
import { getDeadlineStatus, formatDeadlineStatus, getStatusColor } from "../utils/deadline";

const Home: React.FC = () => {
  const { tasks, toggleTask } = useTodos();
  
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const undone = tasks.filter(t => !t.done).length;
  const overdue = tasks.filter(t => !t.done && getDeadlineStatus(t.reminder) === 'overdue').length;
  const dueSoon = tasks.filter(t => !t.done && getDeadlineStatus(t.reminder) === 'due-soon').length;
  
  const recentTasks = tasks.slice(0, 5);
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
        Your Tasks and Accomplishments Status
      </h2>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className=" dark:bg-slate-800 p-4 rounded-lg shadow border-l-4 border-gray-400 dark:border-slate-600">
          <div className="text-sm text-gray-600 dark:text-gray-500 font-semibold">TOTAL</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{total}</div>
        </div>
        <div className=" dark:bg-slate-800 p-4 rounded-lg shadow border-l-4 border-green-600 dark:border-green-500">
          <div className="text-sm text-gray-600 dark:text-gray-500 font-semibold">COMPLETED</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">{completed}</div>
        </div>
        <div className=" dark:bg-slate-800 p-4 rounded-lg shadow border-l-4 border-red-600 dark:border-red-500">
          <div className="text-sm text-gray-600 dark:text-gray-500 font-semibold">UNDONE</div>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">{undone}</div>
        </div>
        <div className=" dark:bg-slate-800 p-4 rounded-lg shadow border-l-4 border-blue-600 dark:border-blue-500">
          <div className="text-sm text-gray-600 dark:text-gray-500 font-semibold">PROGRESS</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{percent}%</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className = " dark:bg-slate-800 p-4 rounded-lg shadow mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-slate-900 dark:text-white">Overall Progress</h3>
          <span className="text-sm text-gray-600 dark:text-gray-500 font-semibold">{completed}/{total} Tasks</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-slate-700 h-4 rounded-full overflow-hidden border border-gray-300 dark:border-slate-600">
          <div style={{ width: `${percent}%` }} className="h-4 bg-gradient-to-r from-green-500 to-emerald-600 transition-all" />
        </div>
      </div>

      {/* Alerts */}
      {(overdue > 0 || dueSoon > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {overdue > 0 && (
            <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 p-4 rounded-lg">
              <div className="font-semibold text-red-700 dark:text-red-300">🚨 {overdue} Overdue Task{overdue > 1 ? 's' : ''}</div>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">Complete these tasks immediately</p>
            </div>
          )}
          {dueSoon > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/30 border-2 border-amber-300 dark:border-amber-700 p-4 rounded-lg">
              <div className="font-semibold text-amber-700 dark:text-amber-300">⏰ {dueSoon} Task{dueSoon > 1 ? 's' : ''} Due Soon</div>
              <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">Complete within the next hour</p>
            </div>
          )}
        </div>
      )}

      {/* Recent Tasks */}
      <div className=" dark:bg-slate-800 rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Tasks</h3>
          <Link to="/todos" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">View All</Link>
        </div>

        {recentTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No tasks yet. <Link to="/todos" className="text-blue-600 dark:text-blue-400 hover:underline">Create one</Link></p>
          </div>
        ) : (
          <ul className="space-y-2">
            {recentTasks.map(task => {
              const status = getDeadlineStatus(task.reminder);
              return (
                <li key={task.id} className="p-3 bg-gray-50 dark:bg-slate-700 rounded flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(task.id)}
                      className="cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className={`${task.done ? 'line-through text-gray-500 dark:text-gray-400' : 'text-slate-900 dark:text-white'}`}>
                        {task.title}
                      </div>
                      {task.category && <div className="text-xs text-gray-500 dark:text-gray-400">{task.category}</div>}
                      {task.done && task.completedAt && (
                        <div className="text-xs text-green-600 dark:text-green-400">✓ Completed: {new Date(task.completedAt).toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                  {task.reminder && status !== 'none' && (
                    <span className={`text-xs px-2 py-1 rounded font-semibold ${getStatusColor(status)}`}>
                      {formatDeadlineStatus(status)}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
