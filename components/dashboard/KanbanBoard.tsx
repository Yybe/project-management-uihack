"use client";

import { useState, useEffect } from "react";
import KanbanColumn from "./KanbanColumn";
import { TaskCardProps } from "./TaskCard";

// Sample data
const initialTasks: Omit<TaskCardProps, "index" | "onClick">[] = [
  {
    id: "1",
    title: "Design Landing Page",
    description: "Create a visually stunning landing page for TaskVerse",
    status: "todo",
    priority: "high",
    dueDate: "2023-06-15",
    assignee: "John Smith",
  },
  {
    id: "2",
    title: "Implement Drag and Drop",
    description: "Add drag and drop functionality to the Kanban board",
    status: "todo",
    priority: "medium",
    dueDate: "2023-06-18",
    assignee: "John Smith",
  },
  {
    id: "3",
    title: "Create Task Detail Modal",
    description: "Implement the task detail modal with all required fields",
    status: "todo",
    priority: "low",
    dueDate: "2023-06-20",
    assignee: "John Smith",
  },
  {
    id: "4",
    title: "Write Documentation",
    description: "Create comprehensive documentation for the TaskVerse platform",
    status: "in-progress",
    priority: "high",
    dueDate: "2023-06-22",
    assignee: "John Smith",
  },
  {
    id: "5",
    title: "User Testing",
    description: "Conduct user testing sessions to gather feedback",
    status: "in-progress",
    priority: "medium",
    dueDate: "2023-06-25",
    assignee: "John Smith",
  },
  {
    id: "6",
    title: "Implement Authentication",
    description: "Add user authentication and authorization to the platform",
    status: "review",
    priority: "high",
    dueDate: "2023-06-10",
    assignee: "John Smith",
  },
  {
    id: "7",
    title: "Project Setup",
    description: "Initialize project repository and set up development environment",
    status: "done",
    priority: "medium",
    dueDate: "2023-06-05",
    assignee: "John Smith",
  },
  {
    id: "8",
    title: "Design System",
    description: "Create a consistent design system for the TaskVerse platform",
    status: "done",
    priority: "low",
    dueDate: "2023-06-08",
    assignee: "John Smith",
  },
];

interface KanbanBoardProps {
  onTaskClick: (id: string) => void;
  onAddTask: (status: string) => void;
  projectId?: string;
  searchTerm?: string;
}

export default function KanbanBoard({ onTaskClick, onAddTask, projectId, searchTerm: externalSearchTerm }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<Omit<TaskCardProps, "index" | "onClick">[]>(initialTasks);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('taskverse_tasks');
      if (savedTasks) {
        try {
          const parsedTasks = JSON.parse(savedTasks);

          // If projectId is provided, filter tasks for this project
          if (projectId) {
            // Filter saved tasks by projectId
            const projectTasks = parsedTasks.filter((task: any) =>
              task.projectId === projectId
            );

            // If no project tasks yet, use sample tasks but add projectId
            if (projectTasks.length === 0) {
              const sampleProjectTasks = initialTasks.map(task => ({
                ...task,
                projectId
              }));
              setTasks(sampleProjectTasks);
              // Save these sample project tasks
              localStorage.setItem('taskverse_tasks', JSON.stringify([
                ...parsedTasks,
                ...sampleProjectTasks
              ]));
            } else {
              setTasks(projectTasks);
            }
          } else {
            // No projectId, show all tasks
            // Use initial tasks for now to ensure consistent IDs
            setTasks(initialTasks);
          }
        } catch (error) {
          console.error('Error parsing tasks from localStorage:', error);
          // Fallback to initial tasks if there's an error
          setTasks(initialTasks);
        }
      } else {
        // If no saved tasks, use the initial sample tasks
        localStorage.setItem('taskverse_tasks', JSON.stringify(initialTasks));
        setTasks(initialTasks);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);
  // Search functionality - passed from parent component
  const [searchTerm, setSearchTerm] = useState("");

  // Update searchTerm when it changes in the parent component
  useEffect(() => {
    if (externalSearchTerm !== undefined) {
      setSearchTerm(externalSearchTerm);
    } else if (typeof window !== 'undefined') {
      const storedSearchTerm = localStorage.getItem('taskverse_search_term');
      if (storedSearchTerm) {
        setSearchTerm(storedSearchTerm);
      }
    }
  }, [externalSearchTerm]);

  const columns = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
  ];

  // Function to move a task to a different status
  const moveTask = (taskId: string, newStatus: string) => {
    console.log(`Moving task ${taskId} to ${newStatus}`);

    // Create a copy of the tasks array
    const updatedTasks = [...tasks];

    // Find the task that was moved
    const taskIndex = updatedTasks.findIndex(task => task.id === taskId);
    console.log('Task index:', taskIndex, 'Task found:', updatedTasks[taskIndex]);

    if (taskIndex !== -1) {
      // Update the task's status
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        status: newStatus
      };

      console.log('Updated task:', updatedTasks[taskIndex]);

      // Update the state
      setTasks(updatedTasks);

      // Get all tasks from localStorage
      const savedTasks = localStorage.getItem('taskverse_tasks');
      if (savedTasks) {
        try {
          const allTasks = JSON.parse(savedTasks);
          console.log('All tasks from localStorage:', allTasks);

          // Find and update the specific task in all tasks
          const globalTaskIndex = allTasks.findIndex((t: any) => t.id === taskId);
          console.log('Global task index:', globalTaskIndex);

          if (globalTaskIndex !== -1) {
            allTasks[globalTaskIndex] = updatedTasks[taskIndex];

            // Save all tasks back to localStorage
            localStorage.setItem('taskverse_tasks', JSON.stringify(allTasks));

            // Show notification (this would be handled by a notification system in a real app)
            console.log(`Task moved to ${newStatus.replace('-', ' ')}`);
          } else {
            // If task not found in localStorage, add it
            allTasks.push(updatedTasks[taskIndex]);
            localStorage.setItem('taskverse_tasks', JSON.stringify(allTasks));
            console.log('Added new task to localStorage');
          }
        } catch (error) {
          console.error('Error updating tasks in localStorage:', error);
        }
      } else {
        // If no tasks in localStorage, create new array
        localStorage.setItem('taskverse_tasks', JSON.stringify([updatedTasks[taskIndex]]));
        console.log('Created new tasks array in localStorage');
      }
    } else {
      console.error('Task not found in state:', taskId);
    }
  };

  // Filter tasks based on search term
  const filteredTasks = searchTerm
    ? tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tasks;

  // Group tasks by status
  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter(task => task.status === status);
  };

  return (
    <div className="kanban-container" style={{ userSelect: 'none' }}>
      {columns.map(column => (
        <KanbanColumn
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={getTasksByStatus(column.id)}
          onAddTask={onAddTask}
          onTaskClick={onTaskClick}
          onMoveTask={moveTask}
        />
      ))}
    </div>
  );
}
