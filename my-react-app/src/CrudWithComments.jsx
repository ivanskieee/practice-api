import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "./ThemeContext";

const API_URL = "http://localhost:3000/api/posts";
const CATEGORIES_URL = "http://localhost:3000/api/categories";

function CrudWithComments() {
  const { darkMode } = useTheme();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

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

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className={`text-2xl font-bold mb-6 text-center ${darkMode ? "text-white" : "text-gray-800"}`}>
        CRUD with Comments
      </h1>
      
      {/* Post Form */}
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded shadow-lg max-w-xl mx-auto mb-8 ${
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
          rows={4}
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
        {posts.length === 0 ? (
          <p className={`text-center py-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            No posts yet. Create your first post above!
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className={`p-5 rounded shadow-md ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{post.body}</p>
                  {post.category && (
                    <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                      darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                    }`}>
                      {post.category.name}
                    </span>
                  )}
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
                className={`mt-4 pl-4 border-l-2 ${
                  darkMode ? "border-gray-600" : "border-gray-300"
                }`}
              >
                <h3 className="text-md font-bold mb-2">Comments</h3>
                {commentsByPostId[post.id]?.length === 0 ? (
                  <p className={`text-sm italic ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    No comments yet
                  </p>
                ) : (
                  commentsByPostId[post.id]?.map((comment) => (
                    <div
                      key={comment.id}
                      className={`mb-3 p-2 rounded ${
                        darkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
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
                    </div>
                  ))
                )}

                <form
                  onSubmit={(e) => handleCommentSubmit(e, post.id)}
                  className="mt-3"
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
                    className="mt-2 bg-blue-500 text-white text-sm py-1 px-3 rounded hover:bg-blue-600 transition"
                  >
                    {editingComments[post.id]
                      ? "Update Comment"
                      : "Add Comment"}
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CrudWithComments;