"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";


import "../dashboard/dashboard.css";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "archived";
  progress: number;
  members: number;
  tasks: number;
  dueDate: string;
}

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Website Redesign",
      description: "Redesign the company website with a modern look and feel",
      status: "active",
      progress: 75,
      members: 5,
      tasks: 12,
      dueDate: "2023-07-15",
    },
    {
      id: "2",
      name: "Mobile App Development",
      description: "Develop a mobile app for iOS and Android platforms",
      status: "active",
      progress: 40,
      members: 8,
      tasks: 24,
      dueDate: "2023-08-30",
    },
    {
      id: "3",
      name: "Marketing Campaign",
      description: "Plan and execute a marketing campaign for the new product launch",
      status: "active",
      progress: 20,
      members: 4,
      tasks: 18,
      dueDate: "2023-09-10",
    },
    {
      id: "4",
      name: "Database Migration",
      description: "Migrate the existing database to a new cloud-based solution",
      status: "completed",
      progress: 100,
      members: 3,
      tasks: 8,
      dueDate: "2023-06-01",
    },
    {
      id: "5",
      name: "User Research",
      description: "Conduct user research to gather feedback on the new features",
      status: "archived",
      progress: 100,
      members: 2,
      tasks: 6,
      dueDate: "2023-05-15",
    },
  ]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    startDate: "",
    dueDate: "",
    members: [] as string[]
  });


  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("taskverse_logged_in");
    if (!isLoggedIn) {
      window.location.href = "/";
    }

    // Load projects from localStorage
    if (typeof window !== 'undefined') {
      const savedProjects = localStorage.getItem('taskverse_projects');
      if (savedProjects) {
        try {
          const parsedProjects = JSON.parse(savedProjects);
          setProjects(parsedProjects);
        } catch (error) {
          console.error('Error parsing projects from localStorage:', error);
          // If there's an error, save the initial projects
          localStorage.setItem('taskverse_projects', JSON.stringify(projects));
        }
      } else {
        // If no projects in localStorage, save the initial projects
        localStorage.setItem('taskverse_projects', JSON.stringify(projects));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Reset filter to "all" if search term is not empty to show all matching projects
    if (e.target.value.trim() !== '') {
      setFilter('all');
    }
  };

  const filteredProjects = projects.filter(project => {
    // Filter by status
    if (filter !== "all" && project.status !== filter) {
      return false;
    }

    // Filter by search term (improved to search in more fields)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase().trim();
      return (
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.status.toLowerCase().includes(searchLower) ||
        formatDate(project.dueDate).toLowerCase().includes(searchLower) ||
        String(project.progress).includes(searchLower) ||
        String(project.members).includes(searchLower) ||
        String(project.tasks).includes(searchLower)
      );
    }

    return true;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace('project-', '');

    if (id === 'project-members' && e.target instanceof HTMLSelectElement) {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
      setNewProject(prev => ({
        ...prev,
        members: selectedOptions
      }));
    } else {
      setNewProject(prev => ({
        ...prev,
        [fieldName]: value
      }));
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new project object
    const project: Project = {
      id: (projects.length + 1).toString(),
      name: newProject.name,
      description: newProject.description,
      status: "active",
      progress: 0,
      members: newProject.members.length,
      tasks: 0,
      dueDate: newProject.dueDate
    };

    // Add the new project to the projects array
    const updatedProjects = [project, ...projects];
    setProjects(updatedProjects);

    // Save to localStorage for persistence
    localStorage.setItem('taskverse_projects', JSON.stringify(updatedProjects));

    // Reset the form and close the modal
    setNewProject({
      name: "",
      description: "",
      startDate: "",
      dueDate: "",
      members: []
    });
    setIsNewProjectModalOpen(false);
  };



  return (
    <DashboardLayout activePage="projects">
        <header className="dashboard-header glass">
          <div className="dashboard-header-left">
            <h1 className="dashboard-title">Projects</h1>
            <p className="dashboard-description">
              Manage and track all your projects in one place
            </p>
          </div>
          <div className="dashboard-header-right">

            <div className="dashboard-search">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <button
              className="btn-primary new-project-button"
              onClick={() => setIsNewProjectModalOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              New Project
            </button>
            <div className="user-profile">
              <div className="user-avatar">JS</div>
              <div className="user-info">
                <span className="user-name">John Smith</span>
                <span className="user-role">Worker</span>
              </div>
            </div>
          </div>
        </header>
        <div className="dashboard-content">
          <div className="projects-container">
            <div className="projects-filters">
              <div className="filter-tabs">
                <button
                  className={`filter-tab ${filter === "all" ? "active" : ""}`}
                  onClick={() => setFilter("all")}
                >
                  All Projects
                </button>
                <button
                  className={`filter-tab ${filter === "active" ? "active" : ""}`}
                  onClick={() => setFilter("active")}
                >
                  Active
                </button>
                <button
                  className={`filter-tab ${filter === "completed" ? "active" : ""}`}
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </button>
                <button
                  className={`filter-tab ${filter === "archived" ? "active" : ""}`}
                  onClick={() => setFilter("archived")}
                >
                  Archived
                </button>
              </div>
              <div className="filter-actions">
                <select className="filter-select">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="progress">Progress</option>
                </select>
              </div>
            </div>
            <div className="projects-grid animate-fade-in">
              {filteredProjects.length > 0 ? (
                filteredProjects.map(project => (
                  <div key={project.id} className={`project-card ${project.status}`}>
                    <div className="project-header">
                      <h3 className="project-title">{project.name}</h3>
                      <div className={`project-status ${project.status}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </div>
                    </div>
                    <p className="project-description">{project.description}</p>
                    <div className="project-progress">
                      <div className="progress-label">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="project-meta">
                      <div className="project-meta-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span>{project.members} Members</span>
                      </div>
                      <div className="project-meta-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 11l3 3L22 4"></path>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>{project.tasks} Tasks</span>
                      </div>
                      <div className="project-meta-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>Due {formatDate(project.dueDate)}</span>
                      </div>
                    </div>
                    <div className="project-actions">
                      <a href={`/projects/${project.id}`} className="btn-outline">View Details</a>
                      {project.status === "active" && (
                        <a href={`/projects/${project.id}`} className="btn-primary flex-1 flex items-center justify-center">Open Board</a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-projects">
                  <div className="no-projects-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                  </div>
                  <h3>No projects found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setFilter("all");
                      setSearchTerm("");
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      {/* New Project Modal */}
      {isNewProjectModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Create New Project</h2>
              <button
                className="modal-close"
                onClick={() => setIsNewProjectModalOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form className="modal-form" onSubmit={handleCreateProject}>
              <div className="form-group">
                <label htmlFor="project-name">Project Name</label>
                <input
                  type="text"
                  id="project-name"
                  placeholder="Enter project name"
                  required
                  value={newProject.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="project-description">Description</label>
                <textarea
                  id="project-description"
                  placeholder="Enter project description"
                  rows={4}
                  value={newProject.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="project-start-date">Start Date</label>
                  <input
                    type="date"
                    id="project-startDate"
                    required
                    value={newProject.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="project-due-date">Due Date</label>
                  <input
                    type="date"
                    id="project-dueDate"
                    required
                    value={newProject.dueDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="project-members">Team Members</label>
                <select id="project-members" multiple onChange={handleInputChange}>
                  <option value="1">John Smith</option>
                  <option value="2">Jane Doe</option>
                  <option value="3">Bob Johnson</option>
                  <option value="4">Alice Williams</option>
                  <option value="5">David Brown</option>
                </select>
                <small className="form-help">Hold Ctrl/Cmd to select multiple members</small>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setIsNewProjectModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
