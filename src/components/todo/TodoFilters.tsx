import React from 'react';
import { useTodos } from '../../context/TodoContext';

const TodoFilters: React.FC = () => {
  const { filter, setFilter, categories } = useTodos();

  return (
    <div className="flex gap-3 items-center mb-4">
      <select value={filter.status} onChange={(e) => setFilter({ status: e.target.value as any })} className="border rounded px-2 py-1">
        <option value="all">All</option>
        <option value="todo">To-do</option>
        <option value="done">Done</option>
      </select>

      <select value={filter.category} onChange={(e) => setFilter({ category: e.target.value as any })} className="border rounded px-2 py-1">
        <option value="all">All categories</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <div className="text-sm text-gray-500">Showing {filter.status} / {filter.category}</div>
    </div>
  );
};

export default TodoFilters;
