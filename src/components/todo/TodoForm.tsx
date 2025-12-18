import React, { useState } from 'react';
import { useTodos } from '../../context/TodoContext';

const TodoForm: React.FC = () => {
  const { addTask, categories, addCategory } = useTodos();
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [reminder, setReminder] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (category && category.trim()) {
      addCategory(category.trim());
    }
    const reminderTs = reminder ? new Date(reminder).getTime() : null;
    addTask(text, category || undefined, reminderTs);
    setText('');
    setCategory('');
    setReminder('');
  };

  return (
    <form onSubmit={submit} className="flex gap-2 items-center dark:bg-gray-800 p-4 rounded mb-4">
      <input
        className="flex-1 border rounded px-3 py-2 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 dark:placeholder-white"
        placeholder="New task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        className="w-36 border rounded px-3 py-2 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 dark:placeholder-white"
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        list="cat-list"
      />
      <input
        type="datetime-local"
        className="w-56 border rounded px-3 py-2 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
        aria-label="Reminder time (optional)"
      />
      <datalist id="cat-list">
        {categories.map(c => <option key={c} value={c} />)}
      </datalist>
      <button className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition">Add</button>
    </form>
  );
};

export default TodoForm;
