import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { TodoProvider } from './context/TodoContext';
import { AuthProvider } from "./context/AutContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Todos from "./pages/Todos";
import ProtectedRoute from "./components/ProtectedRoute";
import "admin-lte/dist/css/adminlte.min.css"; 
import "./index.css"; 

const AppContent: React.FC<{ theme: string; setTheme: (t: string) => void }> = ({ theme, setTheme }) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white transition-colors`}>
      <Layout theme={theme} setTheme={setTheme}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <Todos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
};

const App: React.FC = () => {
  const [theme, setThemeState] = useState(localStorage.getItem("theme") || "light");

  const setTheme = (newTheme: string) => {
    localStorage.setItem("theme", newTheme);
    setThemeState(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Dispatch custom event for same-tab listeners
    window.dispatchEvent(new Event("themechange"));
  };

  useEffect(() => {
    // Apply initial theme on mount
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const updateTheme = () => {
      const newTheme = localStorage.getItem("theme") || "light";
      setThemeState(newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    // Listen for storage changes from other tabs
    window.addEventListener("storage", updateTheme);
    
    return () => {
      window.removeEventListener("storage", updateTheme);
    };
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <TodoProvider>
          <AppContent theme={theme} setTheme={setTheme} />
        </TodoProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
