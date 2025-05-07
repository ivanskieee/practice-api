import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "./ThemeContext";

const API_URL = "http://localhost:3000/api/posts";
const CATEGORIES_URL = "http://localhost:3000/api/categories";

function Dashboard() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  // New state for sidebar
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("posts");

  const [postErrors, setPostErrors] = useState([]);
  const [commentErrors, setCommentErrors] = useState({});
  const [newComments, setNewComments] = useState({});
  const [editingComments, setEditingComments] = useState({});
  const [commentsByPostId, setCommentsByPostId] = useState({});
  const [isFading, setIsFading] = useState(false);

  const fetchPosts = async () => {
    const res = await axios.get(API_URL);
    setPosts(res.data);
    for (const post of res.data) {
      const commentRes = await axios.get(`${API_URL}/${post.id}/comments`);
      setCommentsByPostId((prev) => ({ ...prev, [post.id]: commentRes.data }));
    }
  };

  const fetchCategories = async () => {
    const res = await axios.get(CATEGORIES_URL);
    setCategories(res.data);
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (postErrors.length > 0) {
      setIsFading(false);
      const fadeTimer = setTimeout(() => setIsFading(true), 1000);
      const clearTimer = setTimeout(() => setPostErrors([]), 2000);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(clearTimer);
      };
    }
  }, [postErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostErrors([]);
    try {
      const postPayload = {
        title,
        body,
        category_id: categoryId,
      };
      if (editingPost) {
        await axios.put(`${API_URL}/${editingPost.id}`, { post: postPayload });
        setEditingPost(null);
      } else {
        await axios.post(API_URL, { post: postPayload });
      }
      setTitle("");
      setBody("");
      setCategoryId("");
      fetchPosts();
    } catch (err) {
      setPostErrors(err.response?.data?.errors || ["Something went wrong."]);
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setCategoryId(post.category_id || "");
    setEditingPost(post);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchPosts();
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    const commentBody = newComments[postId] || "";
    setCommentErrors((prev) => ({ ...prev, [postId]: [] }));

    try {
      if (editingComments[postId]) {
        await axios.put(
          `${API_URL}/${postId}/comments/${editingComments[postId].id}`,
          { comment: { body: commentBody } }
        );
        setEditingComments((prev) => ({ ...prev, [postId]: null }));
      } else {
        await axios.post(`${API_URL}/${postId}/comments`, {
          comment: { body: commentBody },
        });
      }
      setNewComments((prev) => ({ ...prev, [postId]: "" }));
      fetchPosts();
    } catch (err) {
      setCommentErrors((prev) => ({
        ...prev,
        [postId]: err.response?.data?.errors || ["Something went wrong"],
      }));
    }
  };

  const handleEditComment = (postId, comment) => {
    setNewComments((prev) => ({ ...prev, [postId]: comment.body }));
    setEditingComments((prev) => ({ ...prev, [postId]: comment }));
  };

  const handleDeleteComment = async (postId, commentId) => {
    await axios.delete(`${API_URL}/${postId}/comments/${commentId}`);
    setEditingComments((prev) => ({ ...prev, [postId]: null }));
    setNewComments((prev) => ({ ...prev, [postId]: "" }));
    fetchPosts();
  };

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

            {/* Posts Item */}
            <li>
              <button
                onClick={() => setActiveSection("posts")}
                className={`
                  flex items-center w-full p-3 mb-1
                  ${sidebarCollapsed ? "justify-center" : "justify-start pl-6"}
                  ${
                    activeSection === "posts"
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
                {!sidebarCollapsed && <span className="ml-3">Posts</span>}
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
              {activeSection === "posts"
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
          {activeSection === "posts" && (
            <>
              {/* Post Form */}
              <form
                onSubmit={handleSubmit}
                className={`p-6 rounded shadow-md max-w-xl mx-auto mb-8 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-lg font-semibold mb-4">
                  {editingPost ? "Edit Post" : "Create New Post"}
                </h2>
                <input
                  type="text"
                  placeholder="Title"
                  className={`w-full p-2 mb-4 border rounded ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Body"
                  className={`w-full p-2 mb-4 border rounded ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                />

                {/* Category Dropdown */}
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className={`w-full p-2 mb-4 border rounded ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                {postErrors.length > 0 && (
                  <div
                    className={`mb-4 text-sm transition-opacity duration-1000 ${
                      isFading ? "opacity-0" : "opacity-100"
                    } ${darkMode ? "text-red-400" : "text-red-600"}`}
                  >
                    <ul className="list-disc list-inside">
                      {postErrors.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                  {editingPost ? "Update Post" : "Create Post"}
                </button>
              </form>

              {/* Posts and Comments */}
              <div className="max-w-xl mx-auto space-y-4">
                <h2 className="text-lg font-semibold mb-4">All Posts</h2>
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className={`p-4 rounded shadow-sm ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p>{post.body}</p>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className={`${
                            darkMode ? "text-blue-400" : "text-blue-600"
                          } hover:underline`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className={`${
                            darkMode ? "text-red-400" : "text-red-600"
                          } hover:underline`}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Comments */}
                    <div
                      className={`mt-4 pl-4 border-l ${
                        darkMode ? "border-gray-600" : "border-gray-300"
                      }`}
                    >
                      <h3 className="text-md font-bold mb-2">Comments</h3>
                      {commentsByPostId[post.id]?.map((comment) => (
                        <div
                          key={comment.id}
                          className="mb-2 flex justify-between items-start"
                        >
                          <p className="text-sm">{comment.body}</p>
                          <div className="space-x-1 text-sm">
                            <button
                              onClick={() =>
                                handleEditComment(post.id, comment)
                              }
                              className={`${
                                darkMode ? "text-blue-400" : "text-blue-500"
                              } hover:underline`}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteComment(post.id, comment.id)
                              }
                              className={`${
                                darkMode ? "text-red-400" : "text-red-500"
                              } hover:underline`}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}

                      <form
                        onSubmit={(e) => handleCommentSubmit(e, post.id)}
                        className="mt-2"
                      >
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          className={`w-full p-2 border rounded text-sm ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300"
                          }`}
                          value={newComments[post.id] || ""}
                          onChange={(e) =>
                            setNewComments((prev) => ({
                              ...prev,
                              [post.id]: e.target.value,
                            }))
                          }
                          required
                        />
                        {commentErrors[post.id]?.length > 0 && (
                          <div
                            className={`text-sm mt-1 ${
                              darkMode ? "text-red-400" : "text-red-600"
                            }`}
                          >
                            <ul className="list-disc list-inside">
                              {commentErrors[post.id].map((err, idx) => (
                                <li key={idx}>{err}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <button
                          type="submit"
                          className="mt-1 bg-blue-500 text-white text-sm py-1 px-2 rounded hover:bg-blue-600"
                        >
                          {editingComments[post.id]
                            ? "Update Comment"
                            : "Add Comment"}
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeSection !== "posts" && (
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
