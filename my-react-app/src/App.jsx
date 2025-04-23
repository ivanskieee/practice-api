import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingPost, setEditingPost] = useState(null);

  const [postErrors, setPostErrors] = useState([]);
  const [commentErrors, setCommentErrors] = useState({}); // key: postId

  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
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
  
  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (postErrors.length > 0) {
      setIsFading(false);    

      const fadeTimer = setTimeout(() => {
        setIsFading(true); 
      }, 1000); 

      const clearTimer = setTimeout(() => {
        setPostErrors([]);
      }, 2000); 

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
      if (editingPost) {
        await axios.put(`${API_URL}/${editingPost.id}`, {
          post: { title, body },
        });
        setEditingPost(null);
      } else {
        await axios.post(API_URL, { post: { title, body } });
      }
      setTitle("");
      setBody("");
      fetchPosts();
    } catch (err) {
      if (err.response?.data?.errors) {
        setPostErrors(err.response.data.errors);
      } else {
        setPostErrors(["body is too short (minimum is 10 characters)"]);
      }
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setEditingPost(post);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchPosts();
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    setCommentErrors((prev) => ({ ...prev, [postId]: [] }));

    try {
      if (editingComment) {
        await axios.put(`${API_URL}/${postId}/comments/${editingComment.id}`, {
          comment: { body: newComment },
        });
        setEditingComment(null);
      } else {
        await axios.post(`${API_URL}/${postId}/comments`, {
          comment: { body: newComment },
        });
      }
      setNewComment("");
      fetchPosts();
    } catch (err) {
      if (err.response?.data?.errors) {
        setCommentErrors((prev) => ({
          ...prev,
          [postId]: err.response.data.errors,
        }));
      } else {
        setCommentErrors((prev) => ({
          ...prev,
          [postId]: ["Something went wrong"],
        }));
      }
    }
  };

  const handleEditComment = (comment) => {
    setNewComment(comment.body);
    setEditingComment(comment);
  };

  const handleDeleteComment = async (postId, commentId) => {
    await axios.delete(`${API_URL}/${postId}/comments/${commentId}`);
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        CRUD with Comments
      </h1>

      {/* Post Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md max-w-xl mx-auto mb-8"
      >
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-4 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Body"
          className="w-full p-2 mb-4 border rounded"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        {postErrors.length > 0 && (
          <div
            className={`mb-4 text-sm text-red-600 transition-opacity duration-1000 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
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
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          {editingPost ? "Update Post" : "Create Post"}
        </button>
      </form>

      {/* Post List with Comments */}
      <div className="max-w-xl mx-auto space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-700">{post.body}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-4 pl-4 border-l">
              <h3 className="text-md font-bold mb-2">Comments</h3>
              {commentsByPostId[post.id]?.map((comment) => (
                <div
                  key={comment.id}
                  className="mb-2 flex justify-between items-start"
                >
                  <p className="text-sm text-gray-800">{comment.body}</p>
                  <div className="space-x-1 text-sm">
                    <button
                      onClick={() => handleEditComment(comment)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(post.id, comment.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {/* Comment Form */}
              <form
                onSubmit={(e) => handleCommentSubmit(e, post.id)}
                className="mt-2"
              >
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="w-full p-2 border rounded text-sm"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
                {commentErrors[post.id]?.length > 0 && (
                  <div className="text-sm text-red-600 mt-1">
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
                  {editingComment ? "Update Comment" : "Add Comment"}
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
