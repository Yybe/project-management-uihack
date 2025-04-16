"use client";

import { useState, useEffect } from "react";
import { TaskCardProps } from "../dashboard/TaskCard";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  department: string;
  status: "online" | "offline" | "away";
  tasks: {
    assigned: number;
    completed: number;
  };
  projects: string[];
}

interface AssignTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember;
}

export default function AssignTaskModal({ isOpen, onClose, member }: AssignTaskModalProps) {
  const [tasks, setTasks] = useState<Omit<TaskCardProps, "index" | "onClick">[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
    projectId: ""
  });
  const [mode, setMode] = useState<'existing' | 'new'>('existing');
  const [projects, setProjects] = useState<{ id: string, name: string }[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Load tasks from localStorage
      const savedTasks = localStorage.getItem('taskverse_tasks');
      if (savedTasks) {
        try {
          const parsedTasks = JSON.parse(savedTasks);
          // Filter out tasks already assigned to this member
          const availableTasks = parsedTasks.filter((task: any) =>
            task.assignee !== member.name
          );
          setTasks(availableTasks);
        } catch (error) {
          console.error('Error parsing tasks from localStorage:', error);
        }
      }

      // Load projects from localStorage
      const savedProjects = localStorage.getItem('taskverse_projects');
      if (savedProjects) {
        try {
          const parsedProjects = JSON.parse(savedProjects);
          const projectOptions = parsedProjects.map((project: any) => ({
            id: project.id,
            name: project.name
          }));
          setProjects(projectOptions);
        } catch (error) {
          console.error('Error parsing projects from localStorage:', error);
        }
      }
    }
  }, [isOpen, member.name]);

  const handleAssignExistingTask = () => {
    if (!selectedTaskId) return;

    // Get all tasks from localStorage
    const savedTasks = localStorage.getItem('taskverse_tasks');
    if (savedTasks) {
      try {
        const allTasks = JSON.parse(savedTasks);

        // Find the selected task
        const taskIndex = allTasks.findIndex((t: any) => t.id === selectedTaskId);
        if (taskIndex !== -1) {
          // Update the assignee
          allTasks[taskIndex].assignee = member.name;

          // Save back to localStorage
          localStorage.setItem('taskverse_tasks', JSON.stringify(allTasks));

          // Update member's task count
          updateMemberTaskCount();

          // Close the modal
          onClose();
        }
      } catch (error) {
        console.error('Error updating task in localStorage:', error);
      }
    }
  };

  const handleCreateAndAssignTask = () => {
    // Create a new task object
    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      priority: newTask.priority as "high" | "medium" | "low",
      dueDate: newTask.dueDate,
      assignee: member.name,
      projectId: newTask.projectId
    };

    // Get all tasks from localStorage
    const savedTasks = localStorage.getItem('taskverse_tasks');
    const allTasks = savedTasks ? JSON.parse(savedTasks) : [];

    // Add the new task
    allTasks.push(task);

    // Save back to localStorage
    localStorage.setItem('taskverse_tasks', JSON.stringify(allTasks));

    // Update member's task count
    updateMemberTaskCount();

    // Update project task count if a project was selected
    if (newTask.projectId) {
      updateProjectTaskCount(newTask.projectId);
    }

    // Close the modal
    onClose();
  };

  const updateMemberTaskCount = () => {
    // Get all members from localStorage
    const savedMembers = localStorage.getItem('taskverse_members');
    if (savedMembers) {
      try {
        const allMembers = JSON.parse(savedMembers);

        // Find the member
        const memberIndex = allMembers.findIndex((m: any) => m.id === member.id);
        if (memberIndex !== -1) {
          // Update the assigned task count
          allMembers[memberIndex].tasks.assigned += 1;

          // Save back to localStorage
          localStorage.setItem('taskverse_members', JSON.stringify(allMembers));
        }
      } catch (error) {
        console.error('Error updating member in localStorage:', error);
      }
    }
  };

  const updateProjectTaskCount = (projectId: string) => {
    // Get all projects from localStorage
    const savedProjects = localStorage.getItem('taskverse_projects');
    if (savedProjects) {
      try {
        const allProjects = JSON.parse(savedProjects);

        // Find the project
        const projectIndex = allProjects.findIndex((p: any) => p.id === projectId);
        if (projectIndex !== -1) {
          // Update the task count
          allProjects[projectIndex].tasks += 1;

          // Save back to localStorage
          localStorage.setItem('taskverse_projects', JSON.stringify(allProjects));
        }
      } catch (error) {
        console.error('Error updating project in localStorage:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Assign Task to {member.name}</h2>
          <button className="modal-close" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-content">
          <div className="task-assignment-tabs">
            <button
              className={`assignment-tab ${mode === 'existing' ? 'active' : ''}`}
              onClick={() => setMode('existing')}
            >
              Assign Existing Task
            </button>
            <button
              className={`assignment-tab ${mode === 'new' ? 'active' : ''}`}
              onClick={() => setMode('new')}
            >
              Create New Task
            </button>
          </div>

          {mode === 'existing' ? (
            <div className="existing-task-form">
              <div className="form-group">
                <label htmlFor="task-select">Select Task</label>
                <select
                  id="task-select"
                  value={selectedTaskId}
                  onChange={(e) => setSelectedTaskId(e.target.value)}
                  required
                >
                  <option value="">Select a task</option>
                  {tasks.map((task, index) => (
                    <option key={`task-${task.id}-${index}`} value={task.id}>
                      {task.title} ({task.status.replace('-', ' ')})
                    </option>
                  ))}
                </select>
                {tasks.length === 0 && (
                  <p className="form-help">No unassigned tasks available. Create a new task instead.</p>
                )}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={onClose}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleAssignExistingTask}
                  disabled={!selectedTaskId}
                >
                  Assign Task
                </button>
              </div>
            </div>
          ) : (
            <div className="new-task-form">
              <div className="form-group">
                <label htmlFor="title">Task Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  placeholder="Enter task description"
                  rows={3}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={newTask.status}
                    onChange={handleInputChange}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={newTask.priority}
                    onChange={handleInputChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dueDate">Due Date</label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="projectId">Project</label>
                  <select
                    id="projectId"
                    name="projectId"
                    value={newTask.projectId}
                    onChange={handleInputChange}
                  >
                    <option value="">None</option>
                    {projects.map((project, index) => (
                      <option key={`project-${project.id}-${index}`} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={onClose}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleCreateAndAssignTask}
                  disabled={!newTask.title}
                >
                  Create & Assign
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
