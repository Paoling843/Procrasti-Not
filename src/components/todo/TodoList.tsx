import React from 'react';
import { useTodos } from '../../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { filteredTasks } = useTodos();

  if (!filteredTasks.length) return <div className="text-gray-500 mt-4">No tasks found.</div>;

  return (
    <ul className="mt-4 space-y-2">
      {filteredTasks.map(t => (
        <TodoItem key={t.id} task={t} />
      ))}
    </ul>
  );
};

export default TodoList;
