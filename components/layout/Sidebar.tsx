"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  activePage: string;
}

export default function Sidebar({ activePage }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState<string>("worker");

  useEffect(() => {
    // Get role from localStorage
    const storedRole = localStorage.getItem("taskverse_role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-header">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/icons/logo.svg"
            alt="TaskVerse Logo"
            className="logo-icon"
            width={28}
            height={28}
          />
          <span className="gradient-text">TaskVerse</span>
        </Link>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          )}
        </button>
      </div>
      <nav className="sidebar-nav">
        <Link href="/dashboard" className={`sidebar-nav-item ${activePage === "dashboard" ? "active" : ""}`}>
          <Image src="/assets/icons/board.svg" alt="Dashboard" width={24} height={24} className="nav-icon" />
          <span className="nav-text">Dashboard</span>
        </Link>
        <Link href="/projects" className={`sidebar-nav-item ${activePage === "projects" ? "active" : ""}`}>
          <Image src="/assets/icons/task.svg" alt="Projects" width={24} height={24} className="nav-icon" />
          <span className="nav-text">Projects</span>
        </Link>
        <Link href="/team" className={`sidebar-nav-item ${activePage === "team" ? "active" : ""}`}>
          <Image src="/assets/icons/team.svg" alt="Team" width={24} height={24} className="nav-icon" />
          <span className="nav-text">Team</span>
        </Link>
        <Link href="/settings" className={`sidebar-nav-item ${activePage === "settings" ? "active" : ""}`}>
          <Image src="/assets/icons/settings-new.svg" alt="Settings" width={24} height={24} className="nav-icon" />
          <span className="nav-text">Settings</span>
        </Link>
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-footer-links">
          <Link href="/help" className="sidebar-nav-item">
            <Image src="/assets/icons/help.svg" alt="Help" width={24} height={24} className="nav-icon" />
            <span className="nav-text">Help</span>
          </Link>
          <Link href="/" className="sidebar-nav-item">
            <Image src="/assets/icons/logout.svg" alt="Logout" width={24} height={24} className="nav-icon" />
            <span className="nav-text">Logout</span>
          </Link>
        </div>
        <div className="sidebar-footer-info">
          <div className="sidebar-footer-branding">
            <Image
              src="/assets/icons/logo.svg"
              alt="TaskVerse Logo"
              width={20}
              height={20}
              className="logo-icon"
            />
            <span className="sidebar-footer-text">TaskVerse</span>
          </div>
          <div className="sidebar-footer-version">
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
