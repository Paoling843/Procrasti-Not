import React from 'react';
import { TodoProvider } from '../context/TodoContext';
import TodoForm from '../components/todo/TodoForm';
import TodoFilters from '../components/todo/TodoFilters';
import TodoList from '../components/todo/TodoList';

const TodosPage: React.FC = () => {
  return (
    <TodoProvider>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Task Manager</h2>

        <div className="bg-white p-4 rounded shadow">
          <TodoForm />
          <TodoFilters />
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
};

export default TodosPage;
