"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activePage: string;
}

export default function DashboardLayout({ children, activePage }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className={`dashboard-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="dashboard-sidebar-container">
        <Sidebar activePage={activePage} onToggle={handleSidebarToggle} />
      </div>
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}
