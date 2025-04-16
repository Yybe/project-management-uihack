"use client";

import { useState, useEffect } from "react";
import { TaskCardProps } from "../dashboard/TaskCard";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Omit<TaskCardProps, "index" | "onClick">;
  onSave: (task: Omit<TaskCardProps, "index" | "onClick">) => void;
  projectId?: string;
}

export default function TaskModal({ isOpen, onClose, task, onSave, projectId }: TaskModalProps) {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
    assignee: "John Smith",
    projectId: projectId || "",
  });

  useEffect(() => {
    if (task) {
      // Preserve all task data when editing
      setFormData({
        id: task.id,
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        priority: task.priority || "medium",
        dueDate: task.dueDate || "",
        assignee: task.assignee || "John Smith",
        projectId: projectId || task.projectId || "",
      });
    } else {
      // Reset form for new task
      setFormData({
        id: Math.random().toString(36).substring(2, 9),
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        dueDate: "",
        assignee: "John Smith",
        projectId: projectId || "",
      });
    }
  }, [task, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate a unique ID if it's a new task
    if (!formData.id) {
      const newId = Date.now().toString();
      const updatedFormData = {
        ...formData,
        id: newId
      };

      // Save with the new ID
      onSave(updatedFormData as Omit<TaskCardProps, "index" | "onClick">);
    } else {
      // Use the existing formData for edits
      onSave(formData as Omit<TaskCardProps, "index" | "onClick">);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{task ? "Edit Task" : "Create New Task"}</h2>
          <button className="modal-close" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={task ? task.title : "Task title"}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={task ? task.description : "Task description"}
              rows={4}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
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
                value={formData.priority}
                onChange={handleChange}
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
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="assignee">Assignee</label>
              <input
                type="text"
                id="assignee"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                placeholder={task ? task.assignee : "Assignee name"}
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {task ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
