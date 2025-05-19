import { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import CrudWithComments from "./CrudWithComments";

function Dashboard() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`
        ${sidebarCollapsed ? "w-16" : "w-64"} 
        transition-all duration-300 ease-in-out
        ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } 
        border-r shadow-lg flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          {!sidebarCollapsed && (
            <h2 className="font-bold text-lg">Admin Panel</h2>
          )}
          <button
            onClick={toggleSidebar}
            className={`${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            } transition-colors`}
          >
            {sidebarCollapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 8 16 12 12 16"></polyline>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 16 8 12 12 8"></polyline>
                <line x1="16" y1="12" x2="8" y2="12"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 pt-4">
          <ul>
            {/* Dashboard Item */}
            <li>
              <button
                onClick={() => setActiveSection("dashboard")}
                className={`
                  flex items-center w-full p-3 mb-1
                  ${sidebarCollapsed ? "justify-center" : "justify-start pl-6"}
                  ${
                    activeSection === "dashboard"
                      ? darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-blue-50 text-blue-700"
                      : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                  transition-colors rounded-l-lg
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
              </button>
            </li>

            {/* CRUD with Comments Item */}
            <li>
              <button
                onClick={() => setActiveSection("crud")}
                className={`
                  flex items-center w-full p-3 mb-1
                  ${sidebarCollapsed ? "justify-center" : "justify-start pl-6"}
                  ${
                    activeSection === "crud"
                      ? darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-blue-50 text-blue-700"
                      : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                  transition-colors rounded-l-lg
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                {!sidebarCollapsed && <span className="ml-3">CRUD with Comments</span>}
              </button>
            </li>

            {/* Users Item */}
            <li>
              <button
                onClick={() => setActiveSection("users")}
                className={`
                  flex items-center w-full p-3 mb-1
                  ${sidebarCollapsed ? "justify-center" : "justify-start pl-6"}
                  ${
                    activeSection === "users"
                      ? darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-blue-50 text-blue-700"
                      : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                  transition-colors rounded-l-lg
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                {!sidebarCollapsed && <span className="ml-3">Users</span>}
              </button>
            </li>

            {/* Analytics Item */}
            <li>
              <button
                onClick={() => setActiveSection("analytics")}
                className={`
                  flex items-center w-full p-3 mb-1
                  ${sidebarCollapsed ? "justify-center" : "justify-start pl-6"}
                  ${
                    activeSection === "analytics"
                      ? darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-blue-50 text-blue-700"
                      : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                  transition-colors rounded-l-lg
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                {!sidebarCollapsed && <span className="ml-3">Analytics</span>}
              </button>
            </li>

            {/* Settings Item */}
            <li>
              <button
                onClick={() => setActiveSection("settings")}
                className={`
                  flex items-center w-full p-3 mb-1
                  ${sidebarCollapsed ? "justify-center" : "justify-start pl-6"}
                  ${
                    activeSection === "settings"
                      ? darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-blue-50 text-blue-700"
                      : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                  transition-colors rounded-l-lg
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                {!sidebarCollapsed && <span className="ml-3">Settings</span>}
              </button>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div
          className={`p-4 mt-auto border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <button
            onClick={toggleDarkMode}
            className={`
              flex items-center gap-2 px-4 py-2 rounded transition-colors duration-300 w-full
              ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }
            `}
          >
            {sidebarCollapsed ? (
              darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )
            ) : darkMode ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className={`p-4 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">
              {activeSection === "crud"
                ? "CRUD with Comments"
                : activeSection.charAt(0).toUpperCase() +
                  activeSection.slice(1)}
            </h1>
            <div className="flex items-center gap-3">
              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Welcome, Admin
              </span>
              <button
                className={`p-2 rounded-full ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                onClick={() => (window.location.href = "/login")}
                title="Logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeSection === "crud" ? (
            <CrudWithComments darkMode={darkMode} />
          ) : activeSection === "dashboard" ? (
            <div
              className={`p-6 rounded shadow-md max-w-4xl mx-auto ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className={`p-4 rounded-lg shadow ${darkMode ? "bg-gray-700" : "bg-blue-50"}`}>
                  <h3 className="font-medium mb-2">Total Posts</h3>
                  <p className="text-2xl font-bold">24</p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>+12% from last week</p>
                </div>
                
                <div className={`p-4 rounded-lg shadow ${darkMode ? "bg-gray-700" : "bg-green-50"}`}>
                  <h3 className="font-medium mb-2">Total Comments</h3>
                  <p className="text-2xl font-bold">142</p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>+8% from last week</p>
                </div>
                
                <div className={`p-4 rounded-lg shadow ${darkMode ? "bg-gray-700" : "bg-purple-50"}`}>
                  <h3 className="font-medium mb-2">Active Users</h3>
                  <p className="text-2xl font-bold">18</p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>+5% from last week</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-4 rounded-lg shadow ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                  <h3 className="font-medium mb-3">Recent Posts</h3>
                  <ul className="space-y-2">
                    <li className="border-b pb-2 border-gray-200 dark:border-gray-600">How to implement dark mode</li>
                    <li className="border-b pb-2 border-gray-200 dark:border-gray-600">React hooks explained</li>
                    <li className="border-b pb-2 border-gray-200 dark:border-gray-600">Getting started with Tailwind CSS</li>
                    <li className="border-b pb-2 border-gray-200 dark:border-gray-600">Building responsive layouts</li>
                    <li>Best practices for React components</li>
                  </ul>
                </div>
                
                <div className={`p-4 rounded-lg shadow ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                  <h3 className="font-medium mb-3">Popular Categories</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>React</span>
                      <span className={`px-2 py-1 text-xs rounded ${darkMode ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800"}`}>42 posts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>JavaScript</span>
                      <span className={`px-2 py-1 text-xs rounded ${darkMode ? "bg-yellow-900 text-yellow-200" : "bg-yellow-100 text-yellow-800"}`}>38 posts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>CSS</span>
                      <span className={`px-2 py-1 text-xs rounded ${darkMode ? "bg-purple-900 text-purple-200" : "bg-purple-100 text-purple-800"}`}>27 posts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tailwind</span>
                      <span className={`px-2 py-1 text-xs rounded ${darkMode ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800"}`}>19 posts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Node.js</span>
                      <span className={`px-2 py-1 text-xs rounded ${darkMode ? "bg-red-900 text-red-200" : "bg-red-100 text-red-800"}`}>15 posts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`p-6 rounded shadow-md max-w-xl mx-auto ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}{" "}
                Section
              </h2>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                This is a placeholder for the {activeSection.toLowerCase()}{" "}
                section. Content for this section has not been implemented yet.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;