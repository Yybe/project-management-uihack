"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useTheme } from "../../../components/theme-provider";
import Image from "next/image";
import "../dashboard/dashboard.css";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const { theme, toggleTheme } = useTheme();


  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("taskverse_logged_in");
    if (!isLoggedIn) {
      window.location.href = "/";
    }
  }, []);

  return (
    <DashboardLayout activePage="settings">
        <header className="dashboard-header glass">
          <div className="dashboard-header-left">
            <h1 className="dashboard-title">Settings</h1>
            <p className="dashboard-description">
              Customize your TaskVerse experience
            </p>
          </div>
          <div className="dashboard-header-right">

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
          <div className="settings-container">
            <div className="settings-sidebar">
              <button
                className={`settings-tab ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
              <button
                className={`settings-tab ${activeTab === "account" ? "active" : ""}`}
                onClick={() => setActiveTab("account")}
              >
                Account
              </button>
              <button
                className={`settings-tab ${activeTab === "appearance" ? "active" : ""}`}
                onClick={() => setActiveTab("appearance")}
              >
                Appearance
              </button>
              <button
                className={`settings-tab ${activeTab === "notifications" ? "active" : ""}`}
                onClick={() => setActiveTab("notifications")}
              >
                Notifications
              </button>
              <button
                className={`settings-tab ${activeTab === "integrations" ? "active" : ""}`}
                onClick={() => setActiveTab("integrations")}
              >
                Integrations
              </button>
            </div>
            <div className="settings-content">
              {activeTab === "profile" && (
                <div className="settings-section">
                  <h2 className="settings-section-title">Profile Settings</h2>
                  <div className="settings-form">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        defaultValue="John Smith"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        defaultValue="john.smith@example.com"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bio">Bio</label>
                      <textarea
                        id="bio"
                        defaultValue="Project manager with 5 years of experience in software development."
                        placeholder="Tell us about yourself"
                        rows={4}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      <select id="role" defaultValue="worker">
                        <option value="worker">Worker</option>
                        <option value="assigner">Assigner</option>
                      </select>
                    </div>
                    <button className="btn-primary">Save Changes</button>
                  </div>
                </div>
              )}
              {activeTab === "account" && (
                <div className="settings-section">
                  <h2 className="settings-section-title">Account Settings</h2>
                  <div className="settings-form">
                    <div className="form-group">
                      <label htmlFor="current-password">Current Password</label>
                      <input
                        type="password"
                        id="current-password"
                        placeholder="Enter your current password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="new-password">New Password</label>
                      <input
                        type="password"
                        id="new-password"
                        placeholder="Enter your new password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirm-password">Confirm New Password</label>
                      <input
                        type="password"
                        id="confirm-password"
                        placeholder="Confirm your new password"
                      />
                    </div>
                    <button className="btn-primary">Update Password</button>
                    <div className="danger-zone">
                      <h3>Danger Zone</h3>
                      <button className="btn-danger">Delete Account</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="settings-section">
                  <h2 className="settings-section-title">Notification Settings</h2>
                  <div className="settings-form">
                    <div className="form-group">
                      <label>Email Notifications</label>
                      <div className="notification-option">
                        <div className="notification-label">
                          <span>Task Assignments</span>
                          <p className="notification-description">Receive emails when tasks are assigned to you</p>
                        </div>
                        <div className="toggle-switch">
                          <input type="checkbox" id="task-assignment" defaultChecked />
                          <label htmlFor="task-assignment"></label>
                        </div>
                      </div>
                      <div className="notification-option">
                        <div className="notification-label">
                          <span>Task Updates</span>
                          <p className="notification-description">Receive emails when tasks you're assigned to are updated</p>
                        </div>
                        <div className="toggle-switch">
                          <input type="checkbox" id="task-update" defaultChecked />
                          <label htmlFor="task-update"></label>
                        </div>
                      </div>
                      <div className="notification-option">
                        <div className="notification-label">
                          <span>Due Date Reminders</span>
                          <p className="notification-description">Receive emails when tasks are approaching their due date</p>
                        </div>
                        <div className="toggle-switch">
                          <input type="checkbox" id="due-date" defaultChecked />
                          <label htmlFor="due-date"></label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>In-App Notifications</label>
                      <div className="notification-option">
                        <div className="notification-label">
                          <span>Task Assignments</span>
                          <p className="notification-description">Receive notifications when tasks are assigned to you</p>
                        </div>
                        <div className="toggle-switch">
                          <input type="checkbox" id="in-app-assignment" defaultChecked />
                          <label htmlFor="in-app-assignment"></label>
                        </div>
                      </div>
                      <div className="notification-option">
                        <div className="notification-label">
                          <span>Task Updates</span>
                          <p className="notification-description">Receive notifications when tasks you're assigned to are updated</p>
                        </div>
                        <div className="toggle-switch">
                          <input type="checkbox" id="in-app-update" defaultChecked />
                          <label htmlFor="in-app-update"></label>
                        </div>
                      </div>
                      <div className="notification-option">
                        <div className="notification-label">
                          <span>Due Date Reminders</span>
                          <p className="notification-description">Receive notifications when tasks are approaching their due date</p>
                        </div>
                        <div className="toggle-switch">
                          <input type="checkbox" id="in-app-due-date" defaultChecked />
                          <label htmlFor="in-app-due-date"></label>
                        </div>
                      </div>
                    </div>
                    <button className="btn-primary">Save Notification Settings</button>
                  </div>
                </div>
              )}
              {activeTab === "appearance" && (
                <div className="settings-section">
                  <h2 className="settings-section-title">Appearance</h2>
                  <div className="settings-form">
                    <div className="form-group">
                      <label>Theme</label>
                      <div className="theme-options">
                        <div className="theme-option">
                          <div className={`theme-preview light ${theme === 'light' ? 'active' : ''}`}>
                            <div className="theme-preview-header"></div>
                            <div className="theme-preview-content">
                              <div className="theme-preview-sidebar"></div>
                              <div className="theme-preview-main"></div>
                            </div>
                          </div>
                          <div className="theme-option-label">
                            <span>Light</span>
                            <button
                              className="btn-sm"
                              onClick={() => {
                                console.log('Light theme button clicked');
                                if (theme !== 'light') toggleTheme();
                              }}
                              disabled={theme === 'light'}
                            >
                              {theme === 'light' ? 'Active' : 'Activate'}
                            </button>
                          </div>
                        </div>
                        <div className="theme-option">
                          <div className={`theme-preview dark ${theme === 'dark' ? 'active' : ''}`}>
                            <div className="theme-preview-header"></div>
                            <div className="theme-preview-content">
                              <div className="theme-preview-sidebar"></div>
                              <div className="theme-preview-main"></div>
                            </div>
                          </div>
                          <div className="theme-option-label">
                            <span>Dark</span>
                            <button
                              className="btn-sm"
                              onClick={() => {
                                console.log('Dark theme button clicked');
                                if (theme !== 'dark') toggleTheme();
                              }}
                              disabled={theme === 'dark'}
                            >
                              {theme === 'dark' ? 'Active' : 'Activate'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "integrations" && (
                <div className="settings-section">
                  <h2 className="settings-section-title">Integrations</h2>
                  <div className="settings-form">
                    <div className="integration-list">
                      <div className="integration-item">
                        <div className="integration-info">
                          <div className="integration-icon github">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                          </div>
                          <div className="integration-details">
                            <h3>GitHub</h3>
                            <p>Connect your GitHub account to link tasks with issues and pull requests.</p>
                          </div>
                        </div>
                        <button className="btn-outline">Connect</button>
                      </div>
                      <div className="integration-item">
                        <div className="integration-info">
                          <div className="integration-icon slack">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"></path>
                              <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path>
                              <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"></path>
                              <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"></path>
                              <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"></path>
                              <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path>
                              <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"></path>
                              <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"></path>
                            </svg>
                          </div>
                          <div className="integration-details">
                            <h3>Slack</h3>
                            <p>Connect your Slack workspace to receive notifications and updates.</p>
                          </div>
                        </div>
                        <button className="btn-outline">Connect</button>
                      </div>
                      <div className="integration-item">
                        <div className="integration-info">
                          <div className="integration-icon google">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22v-9"></path>
                              <path d="M12 8V2"></path>
                              <path d="M5 12H2"></path>
                              <path d="M22 12h-3"></path>
                              <path d="M19.07 4.93l-2.12 2.12"></path>
                              <path d="M4.93 19.07l2.12-2.12"></path>
                              <path d="M4.93 4.93l2.12 2.12"></path>
                              <path d="M19.07 19.07l-2.12-2.12"></path>
                            </svg>
                          </div>
                          <div className="integration-details">
                            <h3>Google Calendar</h3>
                            <p>Connect your Google Calendar to sync task due dates and deadlines.</p>
                          </div>
                        </div>
                        <button className="btn-outline">Connect</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </DashboardLayout>
  );
}
