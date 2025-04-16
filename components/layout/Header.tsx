"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface HeaderProps {
  onNewTask: () => void;
  onSearch: (searchTerm: string) => void;
}

export default function Header({ onNewTask, onSearch }: HeaderProps) {
  const [role, setRole] = useState<string>("worker");

  useEffect(() => {
    // Get role from localStorage
    const storedRole = localStorage.getItem("taskverse_role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    onSearch(searchValue);

    // Save search term to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('taskverse_search_term', searchValue);
    }
  };

  return (
    <header className="dashboard-header glass">
      <div className="dashboard-header-left">
        <div className="dashboard-title-container">
          <h1 className="dashboard-title">
            {role === "worker" ? "My Tasks" : "Project Overview"}
          </h1>
          <div className="dashboard-title-badge">
            {role === "worker" ? "Personal Dashboard" : "Management View"}
          </div>
        </div>
        <div className="dashboard-description-container">
          <p className="dashboard-description">
            {role === "worker"
              ? "Track and manage your assigned tasks efficiently. View your progress and upcoming deadlines at a glance."
              : "Manage your team and assign tasks to team members. Monitor project progress and team performance."}
          </p>
          <div className="dashboard-stats">
            <div className="dashboard-stat">
              <span className="dashboard-stat-value">12</span>
              <span className="dashboard-stat-label">Active Tasks</span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat-value">5</span>
              <span className="dashboard-stat-label">Due Today</span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat-value">85%</span>
              <span className="dashboard-stat-label">Completion</span>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-header-right">

        <div className="dashboard-search">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search tasks..."
            onChange={handleSearch}
          />
        </div>
        <button className="btn-primary new-task-button" onClick={onNewTask}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Task
        </button>
        <div className="user-profile">
          <div className="user-avatar">JS</div>
          <div className="user-info">
            <span className="user-name">John Smith</span>
            <span className="user-role">{role === "worker" ? "Worker" : "Assigner"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
