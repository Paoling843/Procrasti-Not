import type React from "react"
import { useState } from "react"
import Sidebar from "./SideBar"
import TopNav from "./TopNav"
import Footer from "./Footer"

interface LayoutProps {
  children: React.ReactNode
  theme: string
  setTheme: (theme: string) => void
}

const Layout: React.FC<LayoutProps> = ({ children, theme, setTheme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div
      className={`flex h-screen overflow-hidden transition-colors ${theme === "dark" ? "bg-slate-950" : "bg-slate-50"}`}
    >
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : ""}`}
      >
        <TopNav theme={theme} setTheme={setTheme} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout

