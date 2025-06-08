import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Menu, X, Home, BarChart3, Users, Settings, Plus, Bell, Search } from 'lucide-react';

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);
  return {
    darkMode,
    toggleDarkMode: () => setDarkMode(!darkMode)
  };
};
const CrudWithComments = ({ darkMode }) => (
  <div className={`p-6 rounded shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
    <h2 className="text-xl font-semibold mb-4">CRUD Operations</h2>
    <p>CRUD with Comments component would be here</p>
  </div>
);

function Dashboard() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const weeklyData = [
    { name: 'Mon', posts: 4, comments: 24, users: 12 },
    { name: 'Tue', posts: 3, comments: 18, users: 15 },
    { name: 'Wed', posts: 6, comments: 32, users: 20 },
    { name: 'Thu', posts: 8, comments: 28, users: 18 },
    { name: 'Fri', posts: 5, comments: 35, users: 22 },
    { name: 'Sat', posts: 2, comments: 12, users: 8 },
    { name: 'Sun', posts: 3, comments: 15, users: 10 }
  ];

  const categoryData = [
    { name: 'React', value: 42, color: '#3B82F6' },
    { name: 'JavaScript', value: 38, color: '#F59E0B' },
    { name: 'CSS', value: 27, color: '#8B5CF6' },
    { name: 'Tailwind', value: 19, color: '#10B981' },
    { name: 'Node.js', value: 15, color: '#EF4444' }
  ];

  const monthlyGrowth = [
    { month: 'Jan', posts: 85, comments: 420 },
    { month: 'Feb', posts: 92, comments: 468 },
    { month: 'Mar', posts: 108, comments: 542 },
    { month: 'Apr', posts: 125, comments: 625 },
    { month: 'May', posts: 142, comments: 710 },
    { month: 'Jun', posts: 156, comments: 780 }
  ];

  const engagementData = [
    { day: 'Mon', engagement: 65 },
    { day: 'Tue', engagement: 72 },
    { day: 'Wed', engagement: 85 },
    { day: 'Thu', engagement: 78 },
    { day: 'Fri', engagement: 90 },
    { day: 'Sat', engagement: 45 },
    { day: 'Sun', engagement: 38 }
  ];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const chartColors = {
    primary: darkMode ? '#60A5FA' : '#3B82F6',
    secondary: darkMode ? '#34D399' : '#10B981',
    accent: darkMode ? '#F472B6' : '#EC4899',
    text: darkMode ? '#F3F4F6' : '#374151',
    grid: darkMode ? '#374151' : '#E5E7EB'
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'crud', label: 'CRUD', icon: Plus },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-r flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Panel
              </h1>
            )}
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                sidebarCollapsed ? 'mx-auto' : ''
              }`}
            >
              {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? darkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-500 text-white'
                        : darkMode
                        ? 'hover:bg-gray-700 text-gray-300'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <IconComponent size={20} />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
              U
            </div>
            {!sidebarCollapsed && (
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">Administrator</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
              </h2>
              <div className="hidden md:flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <Search size={16} />
                  <input
                    placeholder="Search..."
                    className="bg-transparent outline-none text-sm w-40"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative`}>
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button
                onClick={toggleDarkMode}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
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
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeSection === "crud" ? (
            <CrudWithComments darkMode={darkMode} />
          ) : activeSection === "dashboard" ? (
            <div className={`p-6 rounded-lg shadow-lg max-w-7xl mx-auto ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dashboard Analytics
                </h3>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
              
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ${
                  darkMode ? "bg-gradient-to-br from-blue-900 to-blue-800" : "bg-gradient-to-br from-blue-50 to-blue-100"
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium mb-2 text-sm opacity-80">Total Posts</h4>
                      <p className="text-3xl font-bold">24</p>
                      <p className="text-sm text-green-500 font-medium">+12% from last week</p>
                    </div>
                    <div className="text-4xl opacity-20">📝</div>
                  </div>
                </div>
                
                <div className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ${
                  darkMode ? "bg-gradient-to-br from-green-900 to-green-800" : "bg-gradient-to-br from-green-50 to-green-100"
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium mb-2 text-sm opacity-80">Total Comments</h4>
                      <p className="text-3xl font-bold">142</p>
                      <p className="text-sm text-green-500 font-medium">+8% from last week</p>
                    </div>
                    <div className="text-4xl opacity-20">💬</div>
                  </div>
                </div>
                
                <div className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ${
                  darkMode ? "bg-gradient-to-br from-purple-900 to-purple-800" : "bg-gradient-to-br from-purple-50 to-purple-100"
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium mb-2 text-sm opacity-80">Active Users</h4>
                      <p className="text-3xl font-bold">18</p>
                      <p className="text-sm text-green-500 font-medium">+5% from last week</p>
                    </div>
                    <div className="text-4xl opacity-20">👥</div>
                  </div>
                </div>

                <div className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ${
                  darkMode ? "bg-gradient-to-br from-orange-900 to-orange-800" : "bg-gradient-to-br from-orange-50 to-orange-100"
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium mb-2 text-sm opacity-80">Engagement Rate</h4>
                      <p className="text-3xl font-bold">87%</p>
                      <p className="text-sm text-green-500 font-medium">+3% from last week</p>
                    </div>
                    <div className="text-4xl opacity-20">📊</div>
                  </div>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Weekly Activity Chart */}
                <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    📈 Weekly Activity
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                      <XAxis dataKey="name" stroke={chartColors.text} />
                      <YAxis stroke={chartColors.text} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: darkMode ? '#374151' : '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="posts" 
                        stroke={chartColors.primary} 
                        strokeWidth={3}
                        dot={{ fill: chartColors.primary, strokeWidth: 2, r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="comments" 
                        stroke={chartColors.secondary} 
                        strokeWidth={3}
                        dot={{ fill: chartColors.secondary, strokeWidth: 2, r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="users" 
                        stroke={chartColors.accent} 
                        strokeWidth={3}
                        dot={{ fill: chartColors.accent, strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Category Distribution */}
                <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    🎯 Category Distribution
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: darkMode ? '#374151' : '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Monthly Growth & Engagement */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Monthly Growth */}
                <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    📅 Monthly Growth Trend
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyGrowth}>
                      <defs>
                        <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors.secondary} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={chartColors.secondary} stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                      <XAxis dataKey="month" stroke={chartColors.text} />
                      <YAxis stroke={chartColors.text} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: darkMode ? '#374151' : '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="posts" 
                        stroke={chartColors.primary} 
                        fillOpacity={1} 
                        fill="url(#colorPosts)" 
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="comments" 
                        stroke={chartColors.secondary} 
                        fillOpacity={1} 
                        fill="url(#colorComments)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Engagement Rate */}
                <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    🔥 Daily Engagement Rate
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                      <XAxis dataKey="day" stroke={chartColors.text} />
                      <YAxis stroke={chartColors.text} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: darkMode ? '#374151' : '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Bar 
                        dataKey="engagement" 
                        fill={chartColors.primary}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bottom Section - Recent Activity & Popular Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    🕒 Recent Posts
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "How to implement dark mode",
                      "React hooks explained", 
                      "Getting started with Tailwind CSS",
                      "Building responsive layouts",
                      "Best practices for React components"
                    ].map((post, index) => (
                      <li key={index} className={`p-3 rounded-lg border-l-4 border-blue-500 ${
                        darkMode ? "bg-gray-800" : "bg-gray-50"
                      } hover:shadow-md transition-all duration-200`}>
                        {post}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    🏷️ Popular Categories
                  </h4>
                  <div className="space-y-3">
                    {categoryData.map((category, index) => (
                      <div key={index} className="flex justify-between items-center p-3 rounded-lg hover:shadow-md transition-all duration-200">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                          darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"
                        }`}>
                          {category.value} posts
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`p-6 rounded shadow-md max-w-xl mx-auto ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className="text-xl font-semibold mb-4">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
              </h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                This is a placeholder for the {activeSection.toLowerCase()} section. Content for this section has not been implemented yet.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;