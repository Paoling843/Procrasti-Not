import React, { useState } from 'react';
import { useAuth } from '../context/AutContext';
import { useTodos } from '../context/TodoContext';
import { ArrowLeft, Zap, CheckCircle, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { userName, setUserName } = useAuth();
  const { tasks } = useTodos();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(userName);

  const completedTasks = tasks.filter(t => t.done).length;
  const totalTasks = tasks.length;
  const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleSaveName = () => {
    if (newName.trim()) {
      setUserName(newName.trim());
      setIsEditing(false);
    }
  };

  // Get a random gradient based on name
  const getGradient = () => {
    const gradients = [
      'from-blue-400 to-purple-600',
      'from-green-400 to-teal-600',
      'from-pink-400 to-red-600',
      'from-yellow-400 to-orange-600',
      'from-indigo-400 to-blue-600',
    ];
    return gradients[userName.charCodeAt(0) % gradients.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 hover:bg-blue-700 dark:text-white px-4 py-2 rounded transition"
        >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Profile Card with Gradient */}
        <div className=" dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-slate-700">
          <div className="text-center">
            <div className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br ${getGradient()} flex items-center justify-center text-white text-5xl font-bold shadow-lg ring-4 ring-purple-400/50`}>
              {userName.charAt(0).toUpperCase()}
            </div>

            {isEditing ? (
              <div className="flex items-center gap-3 justify-center mb-6">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="px-4 py-3 border-2 border-blue-300 rounded-lg dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-600 transition"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white px-6 py-3 rounded-lg transition font-semibold shadow-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setNewName(userName);
                    setIsEditing(false);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="mb-6">
                <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-3">
                  {userName}
                </h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-slate-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline text-sm font-semibold transition"
                >
                  ✎ Edit Name
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Accomplishments Section */}
        <div className=" dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="text-amber-500" size={32} />
            <h3 className="text-4xl font-bold dark:text-white">
              Your Accomplishments
            </h3>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Completed Tasks Card */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl p-6 border-2 border-green-400/50 hover:border-green-400 transition shadow-lg hover:shadow-green-500/20">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="text-green-400" size={28} />
                <span className="text-sm font-semibold text-green-300">COMPLETED</span>
              </div>
              <div className="text-5xl font-bold text-green-400">{completedTasks}</div>
              <p className="text-green-300/70 text-sm mt-2">Tasks Completed</p>
            </div>

            {/* Total Tasks Card */}
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-xl p-6 border-2 border-blue-400/50 hover:border-blue-400 transition shadow-lg hover:shadow-blue-500/20">
              <div className="flex items-center gap-3 mb-3">
                <Target className="text-blue-400" size={28} />
                <span className="text-sm font-semibold text-blue-300">TOTAL</span>
              </div>
              <div className="text-5xl font-bold text-blue-400">{totalTasks}</div>
              <p className="text-blue-300/70 text-sm mt-2">Total Tasks</p>
            </div>

            {/* Completion Rate Card */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-xl p-6 border-2 border-purple-400/50 hover:border-purple-400 transition shadow-lg hover:shadow-purple-500/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📊</span>
                <span className="text-sm font-semibold text-purple-300 dark:text-purple-300">RATE</span>
              </div>
              <div className="text-5xl font-bold text-purple-400">{completionPercent}%</div>
              <p className="text-purple-300/70 dark:text-purple-300/70 text-sm mt-2">Completion Rate</p>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="mb-8 p-6 bg-gray-100 dark:bg-slate-700 rounded-xl border border-gray-200 dark:border-slate-600">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-lg text-slate-900 dark:text-white">
                Overall Progress
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {completionPercent}%
              </p>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-600 h-8 rounded-full overflow-hidden border border-gray-300 dark:border-slate-500">
              <div
                style={{ width: `${completionPercent}%` }}
                className="h-8 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 transition-all duration-500 flex items-center justify-center text-white text-xs font-bold shadow-lg"
              >
                {completionPercent > 15 && `${completionPercent}%`}
              </div>
            </div>
          </div>

          {/* Achievement Message */}
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl p-6 mb-8">
            <p className="text-lg text-yellow-700 dark:text-yellow-300 font-semibold">
              {completedTasks === 0 && "🚀 Start by completing your first task!"}
              {completedTasks > 0 && completedTasks < 5 && `🎉 Great start! You've completed ${completedTasks} task${completedTasks !== 1 ? 's' : ''}. Keep it up!`}
              {completedTasks >= 5 && completedTasks < 10 && `💪 Excellent work! You've completed ${completedTasks} tasks. You're on a roll!`}
              {completedTasks >= 10 && completedTasks < 20 && `🏆 Outstanding! You've completed ${completedTasks} tasks. You're a productivity master!`}
              {completedTasks >= 20 && `👑 LEGENDARY! You've completed ${completedTasks} tasks. You are unstoppable!`}
            </p>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Remaining Tasks Card */}
            <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-xl p-6 border-2 border-orange-400/50">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-orange-300">Remaining Tasks</h4>
                <span className="text-3xl font-bold text-orange-400">{totalTasks - completedTasks}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-600 h-3 rounded-full overflow-hidden">
                <div
                  style={{ width: `${100 - completionPercent}%` }}
                  className="h-3 bg-gradient-to-r from-orange-400 to-red-600"
                />
              </div>
            </div>

            {/* Completion Summary */}
            <div className="bg-gradient-to-br from-indigo-500/20 to-blue-600/20 rounded-xl p-6 border-2 border-indigo-400/50">
              <h4 className="font-bold text-indigo-300 mb-4">Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-indigo-600 dark:text-indigo-300">
                  <span>Tasks Done:</span>
                  <span className="font-bold text-green-600 dark:text-green-400">{completedTasks}/{totalTasks}</span>
                </div>
                <div className="flex justify-between text-indigo-600 dark:text-indigo-300">
                  <span>Efficiency:</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">{completionPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
