import React from 'react';
import { Task, useTodos } from '../../context/TodoContext';

const TodoItem: React.FC<{ task: Task }> = ({ task }) => {
  const { toggleTask, deleteTask, updateTask } = useTodos();

  return (
    <li className="flex items-center justify-between p-2 border rounded">
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
        <div>
          <div className={`font-medium ${task.done ? 'line-through text-gray-500' : ''}`}>{task.title}</div>
          {task.category && <div className="text-xs text-gray-400">{task.category}</div>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateTask(task.id, { title: prompt('Edit task', task.title) || task.title })}
          className="text-sm text-blue-600"
        >
          Edit
        </button>
        <button onClick={() => deleteTask(task.id)} className="text-sm text-red-600">Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
