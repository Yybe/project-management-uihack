"use client";

import { useState } from "react";

export interface TaskCardProps {
  id: string;
  index: number;
  title: string;
  description: string;
  status: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  assignee: string;
  projectId?: string;
  onClick: (id: string) => void;
}

export default function TaskCard({
  id,
  index,
  title,
  description,
  status,
  priority,
  dueDate,
  assignee,
  onClick,
}: TaskCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return "No date";

    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();

    return `${month} ${day}`;
  };

  const formattedDate = formatDate(dueDate);
  const statusText = status.replace("-", " ");

  return (
    <div
      className={`task-card ${isDragging ? "dragging" : ""}`}
      data-status={status}
      data-task-id={id}
      onClick={() => onClick(id)}
      tabIndex={0}
      role="article"
      aria-label={`${title}, ${priority} priority, status ${statusText}`}
    >
      <div className={`task-card-priority ${priority}`} title={`${priority} priority`}></div>
      <span className="task-card-status-badge">{statusText}</span>
      <h4 className="task-card-title">{title}</h4>
      <p className="task-card-description">{description}</p>
      <div className="task-card-meta">
        <span className="task-card-due">Due: {formattedDate}</span>
        <div className="task-card-assignee" title={`Assigned to ${assignee}`}>
          {assignee.toUpperCase().substring(0, 2)}
        </div>
      </div>
    </div>
  );
}
