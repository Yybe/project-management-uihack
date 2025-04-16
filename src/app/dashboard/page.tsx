"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Header from "../../../components/layout/Header";
import KanbanBoard from "../../../components/dashboard/KanbanBoard";
import TaskModal from "../../../components/modals/TaskModal";
import { TaskCardProps } from "../../../components/dashboard/TaskCard";
import "./dashboard.css";

export default function Dashboard() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Omit<TaskCardProps, "index" | "onClick"> | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("todo");

  useEffect(() => {
    // Set default values for demo purposes
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("taskverse_logged_in", "true");
      localStorage.setItem("taskverse_email", "demo@taskverse.com");
      localStorage.setItem("taskverse_name", "Demo User");
      localStorage.setItem("taskverse_role", "worker");
    }
  }, []);

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
    // In a real app, you would fetch the task details from the server
    // For now, we'll just open the modal with empty data
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

    // Close the modal
    setIsTaskModalOpen(false);

    // Force a refresh of the page to show the new task
    window.location.reload();
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <DashboardLayout activePage="dashboard">
      <Header onNewTask={handleNewTask} onSearch={handleSearch} />
      <div className="dashboard-content">
        <KanbanBoard
          onTaskClick={handleTaskClick}
          onAddTask={handleAddTaskToColumn}
          searchTerm={searchTerm}
        />
      </div>
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        task={selectedTask}
        onSave={handleSaveTask}
      />
    </DashboardLayout>
  );
}
