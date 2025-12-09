import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./context/AutContext";
import Home from "./pages/Home";
import "admin-lte/dist/css/adminlte.min.css"; 
import "./index.css"; 

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
        <div className={`min-h-screen bg-gray-100 text-black dark:bg-black dark:text-white transition-colors`}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Layout>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
