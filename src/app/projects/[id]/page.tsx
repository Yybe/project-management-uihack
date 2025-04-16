"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import KanbanBoard from "../../../../components/dashboard/KanbanBoard";
import TaskModal from "../../../../components/modals/TaskModal";
import { TaskCardProps } from "../../../../components/dashboard/TaskCard";
import "../../dashboard/dashboard.css";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  members: number;
  tasks: number;
  dueDate: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  assignee: string;
}

export default function ProjectDetails() {
  const { id } = useParams();
  const projectId = id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Omit<TaskCardProps, "index" | "onClick"> | undefined>(undefined);
  const [newTaskStatus, setNewTaskStatus] = useState("todo");


  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("taskverse_logged_in");
    if (!isLoggedIn) {
      window.location.href = "/";
      return;
    }

    // Load project from localStorage
    if (typeof window !== 'undefined') {
      const savedProjects = localStorage.getItem('taskverse_projects');
      if (savedProjects) {
        try {
          const parsedProjects = JSON.parse(savedProjects);
          const foundProject = parsedProjects.find((p: Project) => p.id === id);
          if (foundProject) {
            setProject(foundProject);
          }
        } catch (error) {
          console.error('Error parsing projects from localStorage:', error);
        }
      }

      // Load sample members
      setMembers([
        { id: "1", name: "John Smith", role: "Project Manager", avatar: "JS" },
        { id: "2", name: "Emily Johnson", role: "Designer", avatar: "EJ" },
        { id: "3", name: "Michael Brown", role: "Developer", avatar: "MB" },
      ]);

      // Load tasks from localStorage
      const savedTasks = localStorage.getItem('taskverse_tasks');
      if (savedTasks) {
        try {
          const parsedTasks = JSON.parse(savedTasks);
          // Filter tasks for this project (in a real app, tasks would have a projectId)
          // For now, just show all tasks
          setTasks(parsedTasks);
        } catch (error) {
          console.error('Error parsing tasks from localStorage:', error);
        }
      }
    }
  }, [id]);

  const handleNewTask = (status = "todo") => {
    setSelectedTask(undefined);
    setNewTaskStatus(status);
    setIsTaskModalOpen(true);
  };

  const handleAddTaskToColumn = (status: string) => {
    setSelectedTask(undefined);
    setNewTaskStatus(status);
    setIsTaskModalOpen(true);
  };

  const handleTaskClick = (taskId: string) => {
    // Get the task from localStorage
    const savedTasks = localStorage.getItem('taskverse_tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        const foundTask = parsedTasks.find((t: any) => t.id === taskId);
        if (foundTask) {
          setSelectedTask(foundTask);
          setIsTaskModalOpen(true);
          return;
        }
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
      }
    }

    // Fallback if task not found
    setSelectedTask({
      id: taskId,
      title: "Task Title",
      description: "Task Description",
      status: "todo",
      priority: "medium",
      dueDate: new Date().toISOString().split('T')[0],
      assignee: "John Smith"
    });
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (task: Omit<TaskCardProps, "index" | "onClick">) => {
    // Generate a unique ID if it's a new task
    if (!task.id) {
      task.id = Date.now().toString();
    }

    // Get the existing tasks from localStorage or use an empty array
    const existingTasks = localStorage.getItem('taskverse_tasks');
    let tasks = existingTasks ? JSON.parse(existingTasks) : [];

    // Check if the task already exists (for editing)
    const existingTaskIndex = tasks.findIndex((t: any) => t.id === task.id);

    if (existingTaskIndex !== -1) {
      // Update existing task
      tasks[existingTaskIndex] = task;
    } else {
      // Add new task
      tasks.push(task);
    }

    // Save tasks back to localStorage
    localStorage.setItem('taskverse_tasks', JSON.stringify(tasks));

    // Update project task count
    if (project && existingTaskIndex === -1) {
      const updatedProject = {
        ...project,
        tasks: project.tasks + 1
      };
      setProject(updatedProject);

      // Update the project in localStorage
      const savedProjects = localStorage.getItem('taskverse_projects');
      if (savedProjects) {
        try {
          const parsedProjects = JSON.parse(savedProjects);
          const projectIndex = parsedProjects.findIndex((p: Project) => p.id === projectId);
          if (projectIndex !== -1) {
            parsedProjects[projectIndex] = updatedProject;
            localStorage.setItem('taskverse_projects', JSON.stringify(parsedProjects));
          }
        } catch (error) {
          console.error('Error updating project in localStorage:', error);
        }
      }
    }

    // Close the modal
    setIsTaskModalOpen(false);
  };

  if (!project) {
    return (
      <DashboardLayout activePage="projects">
        <div className="flex items-center justify-center h-full">
          <p>Loading project...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activePage="projects">
        <header className="dashboard-header glass">
          <div className="dashboard-header-left">
            <h1 className="dashboard-title">{project.name}</h1>
            <p className="dashboard-description">{project.description}</p>
          </div>
          <div className="dashboard-header-right">
            <div className={`project-status ${project.status}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </div>
            <button
              className="btn-primary new-task-button"
              onClick={() => handleNewTask()}
            >
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
                <span className="user-role">Project Manager</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="project-details-container">
            <div className="project-info-section">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1 bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-4">Project Overview</h3>
                  <p className="text-text-secondary mb-4">{project.description}</p>
                  <div className="project-progress">
                    <div className="progress-label">
                      <span>Overall Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div className="project-meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      <span><strong>{project.members}</strong> Team Members</span>
                    </div>
                    <div className="project-meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 11l3 3L22 4"></path>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                      <span><strong>{project.tasks}</strong> Total Tasks</span>
                    </div>
                    <div className="project-meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span><strong>Due Date:</strong> {new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div className="project-meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span><strong>Time Remaining:</strong> {Math.ceil((new Date(project.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border mb-6">
                <h3 className="text-lg font-semibold mb-4">Team Members</h3>
                <div className="flex flex-wrap gap-4">
                  {members.map(member => (
                    <div key={member.id} className="flex items-center gap-3 bg-bg-secondary p-3 rounded-lg">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                        <span className="text-white font-medium">{member.avatar}</span>
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-text-secondary">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="project-board-section">
              <KanbanBoard
                onTaskClick={handleTaskClick}
                onAddTask={handleAddTaskToColumn}
                projectId={projectId}
              />
            </div>
          </div>
        </div>

      {isTaskModalOpen && (
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          task={selectedTask}
          onSave={handleSaveTask}
          projectId={projectId}
        />
      )}
    </DashboardLayout>
  );
}
