import React, { useState } from 'react';
import { useTodos } from '../../context/TodoContext';

const TodoForm: React.FC = () => {
  const { addTask, categories, addCategory } = useTodos();
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (category && category.trim()) {
      addCategory(category.trim());
    }
    addTask(text, category || undefined);
    setText('');
    setCategory('');
  };

  return (
    <form onSubmit={submit} className="flex gap-2 items-center">
      <input
        className="flex-1 border rounded px-3 py-2"
        placeholder="New task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        className="w-36 border rounded px-3 py-2"
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        list="cat-list"
      />
      <datalist id="cat-list">
        {categories.map(c => <option key={c} value={c} />)}
      </datalist>
      <button className="bg-blue-600 text-white px-3 py-2 rounded">Add</button>
    </form>
  );
};

export default TodoForm;
