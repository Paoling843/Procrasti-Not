import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Task = {
  id: string;
  title: string;
  category?: string;
  done: boolean;
  createdAt: number;
};

type Filter = {
  status: 'all' | 'todo' | 'done';
  category: string | 'all';
};

type TodoContextType = {
  tasks: Task[];
  addTask: (title: string, category?: string) => void;
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  toggleTask: (id: string) => void;
  updateTask: (id: string, fields: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  filter: Filter;
  setFilter: (f: Partial<Filter>) => void;
  filteredTasks: Task[];
  categories: string[];
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const STORAGE_KEY = 'pn_tasks_v1';
const CAT_STORAGE_KEY = 'pn_categories_v1';

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Task[]) : [];
    } catch (e) {
      return [];
    }
  });

  const [filter, setFilterState] = useState<Filter>({ status: 'all', category: 'all' });
  const [categories, setCategories] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(CAT_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      // ignore
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(CAT_STORAGE_KEY, JSON.stringify(categories));
    } catch (e) {
      // ignore
    }
  }, [categories]);

  const addTask = (title: string, category?: string) => {
    const t: Task = { id: Date.now().toString(), title: title.trim(), category: category?.trim() || undefined, done: false, createdAt: Date.now() };
    setTasks((s) => [t, ...s]);
  };

  const addCategory = (category: string) => {
    const c = category.trim();
    if (!c) return;
    setCategories((s) => (s.includes(c) ? s : [...s, c]));
  };

  const deleteCategory = (category: string) => {
    setCategories((s) => s.filter(c => c !== category));
    // also remove category from tasks that had it
    setTasks((s) => s.map(t => t.category === category ? { ...t, category: undefined } : t));
  };

  const toggleTask = (id: string) => {
    setTasks((s) => s.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const updateTask = (id: string, fields: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks((s) => s.map(t => t.id === id ? { ...t, ...fields } : t));
  };

  const deleteTask = (id: string) => {
    setTasks((s) => s.filter(t => t.id !== id));
  };

  const setFilter = (f: Partial<Filter>) => setFilterState((prev) => ({ ...prev, ...f }));

  // keep categories from explicit state, but ensure any task categories are present too
  const allCategories = useMemo(() => {
    const set = new Set<string>(categories);
    tasks.forEach(t => { if (t.category) set.add(t.category); });
    return Array.from(set);
  }, [tasks, categories]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      if (filter.status === 'todo' && t.done) return false;
      if (filter.status === 'done' && !t.done) return false;
      if (filter.category && filter.category !== 'all' && t.category !== filter.category) return false;
      return true;
    });
  }, [tasks, filter]);

  return (
    <TodoContext.Provider value={{ tasks, addTask, addCategory, deleteCategory, toggleTask, updateTask, deleteTask, filter, setFilter, filteredTasks, categories: allCategories }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodos must be used inside TodoProvider');
  return ctx;
};

export default TodoContext;
