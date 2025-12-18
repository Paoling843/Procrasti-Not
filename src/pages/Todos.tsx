import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
// Using the app-level TodoProvider; page-level provider removed.
import TodoForm from '../components/todo/TodoForm';
import TodoFilters from '../components/todo/TodoFilters';
import TodoList from '../components/todo/TodoList';

const TodosPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white min-h-screen transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold dark:text-white">Task Manager</h2>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 hover:bg-blue-700 dark:text-white px-4 py-2 rounded transition"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
      </div>

      <div className=" dark:bg-gray-800 p-4 rounded shadow transition-colors">
        <TodoForm />
        <TodoFilters />
        <TodoList />
      </div>
    </div>
  );
};

export default TodosPage;
