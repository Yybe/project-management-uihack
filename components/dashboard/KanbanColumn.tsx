"use client";

import TaskCard, { TaskCardProps } from "./TaskCard";

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Omit<TaskCardProps, "index" | "onClick">[];
  onAddTask: (status: string) => void;
  onTaskClick: (id: string) => void;
  onMoveTask: (taskId: string, newStatus: string) => void;
}

export default function KanbanColumn({
  id,
  title,
  tasks,
  onAddTask,
  onTaskClick,
  onMoveTask,
}: KanbanColumnProps) {
  return (
    <div className="kanban-column" data-status={id}>
      <div className="kanban-column-header">
        <h3 className="kanban-column-title">{title}</h3>
        <span className="kanban-column-count">{tasks.length}</span>
        <button
          className="add-task-button"
          onClick={() => onAddTask(id)}
          aria-label={`Add task to ${title}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
      <div className="kanban-cards" style={{ minHeight: '100px' }}>
        {tasks.map((task, index) => (
          <div key={task.id} className="task-card-wrapper">
            <TaskCard
              key={task.id}
              index={index}
              onClick={onTaskClick}
              {...task}
            />
            <div className="task-card-actions">
              {id !== 'todo' && (
                <button
                  className="task-move-btn"
                  onClick={() => onMoveTask(task.id, 'todo')}
                  title="Move to To Do"
                >
                  To Do
                </button>
              )}
              {id !== 'in-progress' && (
                <button
                  className="task-move-btn"
                  onClick={() => onMoveTask(task.id, 'in-progress')}
                  title="Move to In Progress"
                >
                  In Progress
                </button>
              )}
              {id !== 'review' && (
                <button
                  className="task-move-btn"
                  onClick={() => onMoveTask(task.id, 'review')}
                  title="Move to Review"
                >
                  Review
                </button>
              )}
              {id !== 'done' && (
                <button
                  className="task-move-btn"
                  onClick={() => onMoveTask(task.id, 'done')}
                  title="Move to Done"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
