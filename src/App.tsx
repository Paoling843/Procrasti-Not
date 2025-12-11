import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./context/AutContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "admin-lte/dist/css/adminlte.min.css"; 
import "./index.css"; 

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/register" || location.pathname === "/login";

  return (
    <div className={`min-h-screen bg-gray-100 text-black dark:bg-black dark:text-white transition-colors`}>
      {isAuthPage ? (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [theme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
