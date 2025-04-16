"use client";

import { useState } from "react";

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

interface MemberProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember;
  onEdit: () => void;
}

export default function MemberProfileModal({ isOpen, onClose, member, onEdit }: MemberProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'projects'>('overview');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container member-profile-modal">
        <div className="modal-header">
          <h2>Member Profile</h2>
          <button className="modal-close" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="member-profile-content">
          <div className="member-profile-header">
            <div className="member-avatar-large">
              {member.avatar}
              <span className={`status-indicator ${member.status}`}></span>
            </div>
            <div className="member-info-large">
              <h3 className="member-name-large">{member.name}</h3>
              <p className="member-role-large">{member.role}</p>
              <p className="member-email">{member.email}</p>
              <p className="member-department">Department: {member.department}</p>
            </div>
          </div>

          <div className="member-profile-tabs">
            <button
              className={`profile-tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`profile-tab ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              Tasks
            </button>
            <button
              className={`profile-tab ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
          </div>

          <div className="member-profile-tab-content">
            {activeTab === 'overview' && (
              <div className="member-overview">
                <div className="member-stats">
                  <div className="member-stat">
                    <span className="member-stat-value">{member.tasks.assigned}</span>
                    <span className="member-stat-label">Assigned Tasks</span>
                  </div>
                  <div className="member-stat">
                    <span className="member-stat-value">{member.tasks.completed}</span>
                    <span className="member-stat-label">Completed Tasks</span>
                  </div>
                  <div className="member-stat">
                    <span className="member-stat-value">{member.projects.length}</span>
                    <span className="member-stat-label">Projects</span>
                  </div>
                </div>

                <div className="member-progress">
                  <div className="progress-label">
                    <span>Task Completion Rate</span>
                    <span>{Math.round((member.tasks.completed / (member.tasks.assigned || 1)) * 100)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${Math.round((member.tasks.completed / (member.tasks.assigned || 1)) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="member-activity">
                  <h4>Recent Activity</h4>
                  <div className="activity-timeline">
                    <div className="activity-item">
                      <div className="activity-icon bg-status-done">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div className="activity-content">
                        <div className="activity-title">Completed Task</div>
                        <div className="activity-description">Completed "Design Landing Page"</div>
                        <div className="activity-time">2 hours ago</div>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon bg-status-in-progress">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 4 23 10 17 10"></polyline>
                          <polyline points="1 20 1 14 7 14"></polyline>
                          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                        </svg>
                      </div>
                      <div className="activity-content">
                        <div className="activity-title">Started Task</div>
                        <div className="activity-description">Started working on "Implement Drag and Drop"</div>
                        <div className="activity-time">1 day ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="member-tasks-list">
                <h4>Assigned Tasks</h4>
                {member.tasks.assigned > 0 ? (
                  <div className="tasks-list">
                    {/* This would be populated with actual tasks in a real app */}
                    <div className="task-item">
                      <div className="task-status" data-status="in-progress"></div>
                      <div className="task-info">
                        <div className="task-title">Implement Drag and Drop</div>
                        <div className="task-meta">
                          <span className="task-priority" data-priority="medium">Medium</span>
                          <span className="task-due-date">Due Jun 18</span>
                        </div>
                      </div>
                    </div>
                    <div className="task-item">
                      <div className="task-status" data-status="todo"></div>
                      <div className="task-info">
                        <div className="task-title">Design Landing Page</div>
                        <div className="task-meta">
                          <span className="task-priority" data-priority="high">High</span>
                          <span className="task-due-date">Due Jun 15</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="no-tasks-message">No tasks assigned yet.</p>
                )}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="member-projects-list">
                <h4>Assigned Projects</h4>
                {member.projects.length > 0 ? (
                  <div className="projects-list">
                    {member.projects.map((project, index) => (
                      <div key={index} className="project-item">
                        <div className="project-name">{project}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-projects-message">No projects assigned yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn-outline" onClick={onClose}>
            Close
          </button>
          <button type="button" className="btn-primary" onClick={onEdit}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
