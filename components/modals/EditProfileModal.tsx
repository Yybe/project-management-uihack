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

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember;
  onSave: (updatedMember: TeamMember) => void;
}

export default function EditProfileModal({ isOpen, onClose, member, onSave }: EditProfileModalProps) {
  const [formData, setFormData] = useState<TeamMember>({
    ...member
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "tasks.assigned" || name === "tasks.completed") {
      // Handle nested properties
      const [parent, child] = name.split(".");
      setFormData(prev => {
        // Create a safe copy of the tasks object
        const parentObj = prev[parent as keyof TeamMember] as Record<string, number>;
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [child]: parseInt(value) || 0
          }
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button className="modal-close" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
              >
                <option value="Management">Management</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="avatar">Avatar Text</label>
              <input
                type="text"
                id="avatar"
                name="avatar"
                value={formData.avatar}
                onChange={handleInputChange}
                maxLength={2}
                required
              />
              <small className="form-help">1-2 characters for the avatar</small>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="away">Away</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tasks.assigned">Assigned Tasks</label>
              <input
                type="number"
                id="tasks.assigned"
                name="tasks.assigned"
                value={formData.tasks.assigned}
                onChange={handleInputChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tasks.completed">Completed Tasks</label>
              <input
                type="number"
                id="tasks.completed"
                name="tasks.completed"
                value={formData.tasks.completed}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
