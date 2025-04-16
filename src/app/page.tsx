"use client";

import React, { useState, useEffect } from "react";
import { initScrollAnimations } from "./animation-utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "../../components/theme-provider";
import "./landing.css";

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("worker");
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const cleanup = initScrollAnimations();
    return cleanup;
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would authenticate the user
    localStorage.setItem("taskverse_logged_in", "true");
    localStorage.setItem("taskverse_email", email);
    localStorage.setItem("taskverse_role", "worker"); // Default role
    setIsLoginModalOpen(false);

    // Direct access to dashboard for demo purposes
    router.push("/dashboard");
    // Uncomment below to use role selection modal instead
    // setIsRoleModalOpen(true);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would create a new user
    localStorage.setItem("taskverse_logged_in", "true");
    localStorage.setItem("taskverse_email", email);
    localStorage.setItem("taskverse_name", name);
    localStorage.setItem("taskverse_role", "worker"); // Default role
    setIsSignupModalOpen(false);

    // Direct access to dashboard for demo purposes
    router.push("/dashboard");
    // Uncomment below to use role selection modal instead
    // setIsRoleModalOpen(true);
  };

  const handleRoleSelect = (selectedRole: string) => {
    localStorage.setItem("taskverse_role", selectedRole);
    setRole(selectedRole);
    router.push("/dashboard");
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="landing-logo">
          <Image
            src="/assets/icons/logo.svg"
            alt="TaskVerse Logo"
            width={32}
            height={32}
            className="logo-icon"
          />
          <span className="gradient-text">TaskVerse</span>
        </div>
        <nav className="landing-nav">
          <a href="#features" className="landing-nav-item">Features</a>
          <a href="#workflow" className="landing-nav-item">Workflow</a>
          <a href="#about" className="landing-nav-item">About</a>
          <a href="/dashboard" className="landing-nav-item highlight-nav-item">Dashboard</a>
          <button
            className="theme-toggle"
            onClick={() => {
              console.log('Main page theme toggle clicked');
              toggleTheme();
            }}
            aria-label="Toggle theme"
          >
            <Image
              src={theme === "light" ? "/assets/icons/theme-light.svg" : "/assets/icons/theme.svg"}
              alt="Theme"
              width={20}
              height={20}
            />
          </button>
          <button
            className="btn-outline"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Log In
          </button>
          <button
            className="btn-primary"
            onClick={() => setIsSignupModalOpen(true)}
          >
            Sign Up
          </button>
        </nav>
      </header>

      <main className="landing-main">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Modern Project Management for <span className="gradient-text">Modern Teams</span>
            </h1>
            <p className="hero-description">
              TaskVerse helps teams move work forward. Collaborate, manage projects, and reach new productivity peaks with our intuitive dashboard, task prioritization, and team management features.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">10k+</span>
                <span className="hero-stat-label">Users</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">50k+</span>
                <span className="hero-stat-label">Projects</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">99%</span>
                <span className="hero-stat-label">Satisfaction</span>
              </div>
            </div>
            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => setIsSignupModalOpen(true)}
              >
                Get Started
              </button>
              <a href="/dashboard" className="btn-secondary">
                Try Demo
              </a>
            </div>
          </div>
          <div className="hero-image-container">
            <div className="hero-image">
              <div className="dashboard-preview">
                <div className="dashboard-preview-header">
                  <div className="dashboard-preview-logo"></div>
                  <div className="dashboard-preview-nav">
                    <div className="dashboard-preview-nav-item"></div>
                    <div className="dashboard-preview-nav-item"></div>
                    <div className="dashboard-preview-nav-item"></div>
                  </div>
                  <div className="dashboard-preview-user"></div>
                </div>
                <div className="dashboard-preview-content">
                  <div className="dashboard-preview-sidebar">
                    <div className="dashboard-preview-sidebar-item active"></div>
                    <div className="dashboard-preview-sidebar-item"></div>
                    <div className="dashboard-preview-sidebar-item"></div>
                    <div className="dashboard-preview-sidebar-item"></div>
                  </div>
                  <div className="dashboard-preview-main">
                    <div className="dashboard-preview-kanban">
                      <div className="dashboard-preview-column">
                        <div className="dashboard-preview-card high"></div>
                        <div className="dashboard-preview-card medium"></div>
                        <div className="dashboard-preview-card low"></div>
                      </div>
                      <div className="dashboard-preview-column">
                        <div className="dashboard-preview-card medium"></div>
                        <div className="dashboard-preview-card high"></div>
                      </div>
                      <div className="dashboard-preview-column">
                        <div className="dashboard-preview-card high"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <h2 className="section-title animate-on-scroll">Features</h2>
          <div className="features-grid">
            <div className="feature-card animate-on-scroll animate-delay-100">
              <div className="feature-icon">
                <Image
                  src="/assets/icons/board.svg"
                  alt="Kanban Boards"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="feature-title">Kanban Boards</h3>
              <p className="feature-description">
                Visualize your workflow with our intuitive drag-and-drop Kanban boards. Easily move tasks between To Do, In Progress, Review, and Done columns.
              </p>
            </div>
            <div className="feature-card animate-on-scroll animate-delay-200">
              <div className="feature-icon">
                <Image
                  src="/assets/icons/task.svg"
                  alt="Task Management"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="feature-title">Task Prioritization</h3>
              <p className="feature-description">
                Clearly mark task priorities with our visual priority system. High, medium, and low priorities are instantly recognizable to keep your team focused on what matters most.
              </p>
            </div>
            <div className="feature-card animate-on-scroll animate-delay-300">
              <div className="feature-icon">
                <Image
                  src="/assets/icons/team.svg"
                  alt="Team Collaboration"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="feature-title">Team Management</h3>
              <p className="feature-description">
                Add team members directly to your projects with our streamlined team management. Assign tasks, track progress, and manage roles all in one place.
              </p>
            </div>
            <div className="feature-card animate-on-scroll animate-delay-400">
              <div className="feature-icon">
                <Image
                  src="/assets/icons/settings.svg"
                  alt="Project Tracking"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="feature-title">Project Tracking</h3>
              <p className="feature-description">
                Create and manage multiple projects with accurate progress tracking. Visual progress bars and status indicators help you stay on top of deadlines and milestones.
              </p>
            </div>
          </div>
        </section>

        <section id="workflow" className="workflow-section">
          <h2 className="section-title">How It Works</h2>
          <div className="workflow-steps">
            <div className="workflow-step animate-on-scroll">
              <div className="workflow-step-number">1</div>
              <div className="workflow-step-content">
                <h3 className="workflow-step-title">Create Projects</h3>
                <p className="workflow-step-description">
                  Start by creating projects for your team. Add details, set deadlines, and invite team members to collaborate.
                </p>
              </div>
            </div>
            <div className="workflow-step animate-on-scroll animate-delay-100">
              <div className="workflow-step-number">2</div>
              <div className="workflow-step-content">
                <h3 className="workflow-step-title">Add Tasks</h3>
                <p className="workflow-step-description">
                  Break down your projects into manageable tasks. Assign priorities, due dates, and team members to each task.
                </p>
              </div>
            </div>
            <div className="workflow-step animate-on-scroll animate-delay-200">
              <div className="workflow-step-number">3</div>
              <div className="workflow-step-content">
                <h3 className="workflow-step-title">Track Progress</h3>
                <p className="workflow-step-description">
                  Use the Kanban board to visualize your workflow. Drag and drop tasks between columns as they progress.
                </p>
              </div>
            </div>
            <div className="workflow-step animate-on-scroll animate-delay-300">
              <div className="workflow-step-number">4</div>
              <div className="workflow-step-content">
                <h3 className="workflow-step-title">Collaborate</h3>
                <p className="workflow-step-description">
                  Work together with your team in real-time. Assign tasks, update statuses, and keep everyone in the loop.
                </p>
              </div>
            </div>
          </div>
          <div className="workflow-cta animate-on-scroll animate-delay-400">
            <button
              className="btn-primary"
              onClick={() => setIsSignupModalOpen(true)}
            >
              Get Started Now
            </button>
            <a href="/dashboard" className="btn-outline">
              Try Demo Dashboard
            </a>
          </div>
        </section>

        <section id="about" className="about-section">
          <h2 className="section-title">About TaskVerse</h2>
          <p className="about-description">
            TaskVerse was created to help teams of all sizes manage their work more effectively. Our mission is to provide a simple, intuitive, and powerful project management tool that adapts to your workflow, not the other way around.
          </p>
          <div className="about-stats">
            <div className="stat-card">
              <h3 className="stat-number">10,000+</h3>
              <p className="stat-label">Users</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">500+</h3>
              <p className="stat-label">Teams</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">1M+</h3>
              <p className="stat-label">Tasks Completed</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Image
              src="/assets/icons/logo.svg"
              alt="TaskVerse Logo"
              width={24}
              height={24}
              className="logo-icon"
            />
            <span className="gradient-text">TaskVerse</span>
          </div>
          <div className="footer-links">
            <div className="footer-links-column">
              <h4 className="footer-links-title">Product</h4>
              <a href="#features" className="footer-link">Features</a>
              <a href="#workflow" className="footer-link">How It Works</a>
              <a href="#" className="footer-link">Roadmap</a>
            </div>
            <div className="footer-links-column">
              <h4 className="footer-links-title">Company</h4>
              <a href="#about" className="footer-link">About</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="#" className="footer-link">Blog</a>
            </div>
            <div className="footer-links-column">
              <h4 className="footer-links-title">Resources</h4>
              <a href="#" className="footer-link">Documentation</a>
              <a href="#" className="footer-link">Support</a>
              <a href="#" className="footer-link">Community</a>
            </div>
            <div className="footer-links-column">
              <h4 className="footer-links-title">Legal</h4>
              <a href="#" className="footer-link">Privacy</a>
              <a href="#" className="footer-link">Terms</a>
              <a href="#" className="footer-link">Security</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} TaskVerse. All rights reserved.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container auth-modal">
            <div className="modal-header">
              <h2>Log In</h2>
              <button className="modal-close" onClick={() => setIsLoginModalOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="form-group flex justify-between items-center">
                <div className="remember-me">
                  <input type="checkbox" id="remember" className="mr-2" />
                  <label htmlFor="remember" className="text-sm cursor-pointer">Remember me</label>
                </div>
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="btn-primary w-full">
                Log In
              </button>
              <div className="auth-divider">
                <span>or</span>
              </div>
              <button type="button" className="btn-outline w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                Continue with GitHub
              </button>
              <div className="auth-footer">
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="auth-link"
                    onClick={() => {
                      setIsLoginModalOpen(false);
                      setIsSignupModalOpen(true);
                    }}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container auth-modal">
            <div className="modal-header">
              <h2>Sign Up</h2>
              <button className="modal-close" onClick={() => setIsSignupModalOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSignup} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-email">Email</label>
                <input
                  type="email"
                  id="signup-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
              </div>
              <div className="form-group">
                <div className="terms">
                  <input type="checkbox" id="terms" required className="mt-1.5 mr-2" />
                  <label htmlFor="terms" className="text-sm cursor-pointer">
                    I agree to the{" "}
                    <a href="#" className="terms-link">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="terms-link">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full">
                Sign Up
              </button>
              <div className="auth-divider">
                <span>or</span>
              </div>
              <button type="button" className="btn-outline w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                Continue with GitHub
              </button>
              <div className="auth-footer">
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="auth-link"
                    onClick={() => {
                      setIsSignupModalOpen(false);
                      setIsLoginModalOpen(true);
                    }}
                  >
                    Log In
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Role Selection Modal */}
      {isRoleModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container role-modal">
            <div className="modal-header">
              <h2>Select Your Role</h2>
              <button className="modal-close" onClick={() => setIsRoleModalOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="role-selection">
              <div
                className={`role-card ${role === "worker" ? "selected" : ""}`}
                onClick={() => setRole("worker")}
              >
                <div className="role-icon">
                  <Image
                    src="/assets/icons/task.svg"
                    alt="Worker"
                    width={48}
                    height={48}
                  />
                </div>
                <h3 className="role-title">Worker</h3>
                <p className="role-description">
                  I want to manage my tasks and collaborate with my team.
                </p>
              </div>
              <div
                className={`role-card ${role === "assigner" ? "selected" : ""}`}
                onClick={() => setRole("assigner")}
              >
                <div className="role-icon">
                  <Image
                    src="/assets/icons/team.svg"
                    alt="Assigner"
                    width={48}
                    height={48}
                  />
                </div>
                <h3 className="role-title">Assigner</h3>
                <p className="role-description">
                  I want to create and assign tasks to my team members.
                </p>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn-primary w-full"
                onClick={() => handleRoleSelect(role)}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
