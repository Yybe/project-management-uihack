"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import MemberProfileModal from "../../../components/modals/MemberProfileModal";
import AssignTaskModal from "../../../components/modals/AssignTaskModal";
import EditProfileModal from "../../../components/modals/EditProfileModal";

import "../dashboard/dashboard.css";

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

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Smith",
      role: "Project Manager",
      email: "john.smith@example.com",
      avatar: "JS",
      department: "Management",
      status: "online",
      tasks: {
        assigned: 12,
        completed: 8,
      },
      projects: ["Website Redesign", "Mobile App Development"],
    },
    {
      id: "2",
      name: "Jane Doe",
      role: "UI/UX Designer",
      email: "jane.doe@example.com",
      avatar: "JD",
      department: "Design",
      status: "online",
      tasks: {
        assigned: 15,
        completed: 10,
      },
      projects: ["Website Redesign", "Marketing Campaign"],
    },
    {
      id: "3",
      name: "Bob Johnson",
      role: "Frontend Developer",
      email: "bob.johnson@example.com",
      avatar: "BJ",
      department: "Development",
      status: "away",
      tasks: {
        assigned: 18,
        completed: 12,
      },
      projects: ["Website Redesign", "Mobile App Development"],
    },
    {
      id: "4",
      name: "Alice Williams",
      role: "Backend Developer",
      email: "alice.williams@example.com",
      avatar: "AW",
      department: "Development",
      status: "offline",
      tasks: {
        assigned: 14,
        completed: 9,
      },
      projects: ["Mobile App Development", "Database Migration"],
    },
    {
      id: "5",
      name: "David Brown",
      role: "Marketing Specialist",
      email: "david.brown@example.com",
      avatar: "DB",
      department: "Marketing",
      status: "online",
      tasks: {
        assigned: 10,
        completed: 7,
      },
      projects: ["Marketing Campaign", "User Research"],
    },
    {
      id: "6",
      name: "Sarah Miller",
      role: "QA Engineer",
      email: "sarah.miller@example.com",
      avatar: "SM",
      department: "Quality Assurance",
      status: "offline",
      tasks: {
        assigned: 16,
        completed: 14,
      },
      projects: ["Mobile App Development", "Website Redesign"],
    },
  ]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    message: "",
    projects: [] as string[]
  });
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAssignTaskModalOpen, setIsAssignTaskModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);


  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("taskverse_logged_in");
    if (!isLoggedIn) {
      window.location.href = "/";
    }

    // Load team members from localStorage
    if (typeof window !== 'undefined') {
      const savedMembers = localStorage.getItem('taskverse_members');
      if (savedMembers) {
        try {
          const parsedMembers = JSON.parse(savedMembers);
          setMembers(parsedMembers);
        } catch (error) {
          console.error('Error parsing members from localStorage:', error);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Reset filter to "all" if search term is not empty to show all matching members
    if (e.target.value.trim() !== '') {
      setFilter('all');
    }
  };

  const filteredMembers = members.filter(member => {
    // Filter by department
    if (filter !== "all" && member.department.toLowerCase() !== filter.toLowerCase()) {
      return false;
    }

    // Filter by search term (improved to search in more fields)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase().trim();
      return (
        member.name.toLowerCase().includes(searchLower) ||
        member.role.toLowerCase().includes(searchLower) ||
        member.department.toLowerCase().includes(searchLower) ||
        member.email.toLowerCase().includes(searchLower) ||
        member.status.toLowerCase().includes(searchLower) ||
        member.projects.some(project => project.toLowerCase().includes(searchLower)) ||
        String(member.tasks.assigned).includes(searchLower) ||
        String(member.tasks.completed).includes(searchLower)
      );
    }

    return true;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace('invite-', '');

    if (id === 'invite-projects' && e.target instanceof HTMLSelectElement) {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
      setNewMember(prev => ({
        ...prev,
        projects: selectedOptions
      }));
    } else {
      setNewMember(prev => ({
        ...prev,
        [fieldName]: value
      }));
    }
  };

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate initials for avatar
    const nameParts = newMember.name.split(' ');
    let initials = '';
    if (nameParts.length >= 2) {
      initials = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    } else {
      initials = nameParts[0].substring(0, 2).toUpperCase();
    }

    // Create a new member object
    const member: TeamMember = {
      id: (members.length + 1).toString(),
      name: newMember.name,
      role: newMember.role,
      email: newMember.email,
      avatar: initials,
      department: newMember.department,
      status: "offline",
      tasks: {
        assigned: 0,
        completed: 0,
      },
      projects: newMember.projects.map(p => {
        switch(p) {
          case 'website-redesign': return 'Website Redesign';
          case 'mobile-app': return 'Mobile App Development';
          case 'marketing-campaign': return 'Marketing Campaign';
          case 'database-migration': return 'Database Migration';
          case 'user-research': return 'User Research';
          default: return p;
        }
      })
    };

    // Add the new member to the members array
    const updatedMembers = [member, ...members];
    setMembers(updatedMembers);

    // Save to localStorage for persistence
    localStorage.setItem('taskverse_members', JSON.stringify(updatedMembers));

    // Reset the form and close the modal
    setNewMember({
      name: "",
      email: "",
      role: "",
      department: "",
      message: "",
      projects: []
    });
    setIsInviteModalOpen(false);
  };

  const departments = ["All", "Management", "Design", "Development", "Marketing", "Quality Assurance"];

  return (
    <DashboardLayout activePage="team">
        <header className="dashboard-header glass">
          <div className="dashboard-header-left">
            <h1 className="dashboard-title">Team</h1>
            <p className="dashboard-description">
              Manage your team members and their roles
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
                placeholder="Search team members..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <button
              className="btn-primary invite-button"
              onClick={() => setIsInviteModalOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
              Add Member
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
          <div className="team-container">
            <div className="team-filters">
              <div className="filter-tabs">
                {departments.map(department => (
                  <button
                    key={department.toLowerCase()}
                    className={`filter-tab ${filter === department.toLowerCase() ? "active" : ""}`}
                    onClick={() => setFilter(department.toLowerCase())}
                  >
                    {department}
                  </button>
                ))}
              </div>
              <div className="team-stats">
                <div className="team-stat">
                  <span className="team-stat-value">{members.length}</span>
                  <span className="team-stat-label">Total Members</span>
                </div>
                <div className="team-stat">
                  <span className="team-stat-value">{members.filter(m => m.status === "online").length}</span>
                  <span className="team-stat-label">Online</span>
                </div>
              </div>
            </div>
            <div className="team-grid animate-fade-in">
              {filteredMembers.length > 0 ? (
                filteredMembers.map(member => (
                  <div
                    key={member.id}
                    className="team-card"
                  >
                    <div className="team-card-header">
                      <div className="team-member-avatar">
                        {member.avatar}
                        <span className={`status-indicator ${member.status}`}></span>
                      </div>
                      <div className="team-member-info">
                        <h3 className="team-member-name">{member.name}</h3>
                        <p className="team-member-role">{member.role}</p>
                      </div>
                    </div>
                    <div className="team-member-details">
                      <div className="team-member-detail">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span>{member.email}</span>
                      </div>
                      <div className="team-member-detail">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span>{member.department}</span>
                      </div>
                    </div>
                    <div className="team-member-tasks">
                      <div className="task-progress">
                        <div className="progress-label">
                          <span>Tasks Progress</span>
                          <span>{Math.round((member.tasks.completed / member.tasks.assigned) * 100)}%</span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${(member.tasks.completed / member.tasks.assigned) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="task-stats">
                        <div className="task-stat">
                          <span className="task-stat-value">{member.tasks.assigned}</span>
                          <span className="task-stat-label">Assigned</span>
                        </div>
                        <div className="task-stat">
                          <span className="task-stat-value">{member.tasks.completed}</span>
                          <span className="task-stat-label">Completed</span>
                        </div>
                      </div>
                    </div>
                    <div className="team-member-projects">
                      <h4>Projects</h4>
                      <div className="project-tags">
                        {member.projects.map(project => (
                          <span key={project} className="project-tag">{project}</span>
                        ))}
                      </div>
                    </div>
                    <div className="team-card-actions">
                      <button
                        className="btn-outline"
                        onClick={() => {
                          setSelectedMember(member);
                          setIsProfileModalOpen(true);
                        }}
                      >
                        View Profile
                      </button>
                      <button
                        className="btn-primary"
                        onClick={() => {
                          setSelectedMember(member);
                          setIsAssignTaskModalOpen(true);
                        }}
                      >
                        Assign Task
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-members">
                  <div className="no-members-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3>No team members found</h3>
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

      {/* Member Profile Modal */}
      {selectedMember && isProfileModalOpen && (
        <MemberProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          member={selectedMember}
          onEdit={() => {
            setIsProfileModalOpen(false);
            setIsEditProfileModalOpen(true);
          }}
        />
      )}

      {/* Assign Task Modal */}
      {selectedMember && isAssignTaskModalOpen && (
        <AssignTaskModal
          isOpen={isAssignTaskModalOpen}
          onClose={() => setIsAssignTaskModalOpen(false)}
          member={selectedMember}
        />
      )}

      {/* Edit Profile Modal */}
      {selectedMember && isEditProfileModalOpen && (
        <EditProfileModal
          isOpen={isEditProfileModalOpen}
          onClose={() => setIsEditProfileModalOpen(false)}
          member={selectedMember}
          onSave={(updatedMember) => {
            // Update the member in the members array
            const updatedMembers = members.map(member =>
              member.id === updatedMember.id ? updatedMember : member
            );
            setMembers(updatedMembers);
            setSelectedMember(updatedMember);

            // Save to localStorage
            localStorage.setItem('taskverse_members', JSON.stringify(updatedMembers));

            // Close the modal
            setIsEditProfileModalOpen(false);
          }}
        />
      )}

      {/* Invite Member Modal */}
      {isInviteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Add Team Member</h2>
              <button
                className="modal-close"
                onClick={() => setIsInviteModalOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form className="modal-form" onSubmit={handleInviteMember}>
              <div className="form-group">
                <label htmlFor="invite-name">Member Name</label>
                <input
                  type="text"
                  id="invite-name"
                  placeholder="Enter member name"
                  required
                  value={newMember.name || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="invite-email">Email Address</label>
                <input
                  type="email"
                  id="invite-email"
                  placeholder="Enter email address"
                  required
                  value={newMember.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="invite-role">Role</label>
                  <select id="invite-role" required value={newMember.role} onChange={handleInputChange}>
                    <option value="">Select a role</option>
                    <option value="project-manager">Project Manager</option>
                    <option value="designer">Designer</option>
                    <option value="developer">Developer</option>
                    <option value="marketing">Marketing</option>
                    <option value="qa">QA Engineer</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="invite-department">Department</label>
                  <select id="invite-department" required value={newMember.department} onChange={handleInputChange}>
                    <option value="">Select a department</option>
                    <option value="management">Management</option>
                    <option value="design">Design</option>
                    <option value="development">Development</option>
                    <option value="marketing">Marketing</option>
                    <option value="quality-assurance">Quality Assurance</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="invite-message">Personal Message (Optional)</label>
                <textarea
                  id="invite-message"
                  name="message"
                  placeholder="Add a personal message to the invitation"
                  rows={4}
                  value={newMember.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="invite-projects">Assign to Projects</label>
                <select id="invite-projects" name="invite-projects" multiple onChange={handleInputChange}>
                  <option value="website-redesign">Website Redesign</option>
                  <option value="mobile-app">Mobile App Development</option>
                  <option value="marketing-campaign">Marketing Campaign</option>
                  <option value="database-migration">Database Migration</option>
                  <option value="user-research">User Research</option>
                </select>
                <small className="form-help">Hold Ctrl/Cmd to select multiple projects</small>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setIsInviteModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="modal-container member-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Team Member Details</h2>
              <button
                className="modal-close"
                onClick={() => setSelectedMember(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="member-details">
              <div className="member-profile">
                <div className="member-avatar large">
                  {selectedMember.avatar}
                  <span className={`status-indicator ${selectedMember.status}`}></span>
                </div>
                <div className="member-info">
                  <h3 className="member-name">{selectedMember.name}</h3>
                  <p className="member-role">{selectedMember.role}</p>
                  <p className="member-department">{selectedMember.department}</p>
                </div>
              </div>
              <div className="member-contact">
                <div className="contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>{selectedMember.email}</span>
                </div>
                <div className="contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>123 Main St, Anytown, USA</span>
                </div>
              </div>
              <div className="member-stats">
                <div className="stat-card">
                  <div className="stat-value">{selectedMember.tasks.assigned}</div>
                  <div className="stat-label">Tasks Assigned</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{selectedMember.tasks.completed}</div>
                  <div className="stat-label">Tasks Completed</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{selectedMember.projects.length}</div>
                  <div className="stat-label">Projects</div>
                </div>
              </div>
              <div className="member-projects">
                <h4>Assigned Projects</h4>
                <div className="project-list">
                  {selectedMember.projects.map(project => (
                    <div key={project} className="project-item">
                      <div className="project-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                      <div className="project-name">{project}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="member-actions">
                <button className="btn-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Edit Profile
                </button>
                <button className="btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Assign Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
