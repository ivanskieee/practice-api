import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/posts'

function App() {
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [editingPost, setEditingPost] = useState(null)

  const fetchPosts = async () => {
    const res = await axios.get(API_URL)
    setPosts(res.data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingPost) {
      await axios.put(`${API_URL}/${editingPost.id}`, { post: { title, body } })
      setEditingPost(null)
    } else {
      await axios.post(API_URL, { post: { title, body } })
    }
    setTitle('')
    setBody('')
    fetchPosts()
  }

  const handleEdit = (post) => {
    setTitle(post.title)
    setBody(post.body)
    setEditingPost(post)
  }

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`)
    fetchPosts()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">📘 Posts CRUD</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-xl mx-auto mb-8">
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          {editingPost ? 'Update Post' : 'Create Post'}
        </button>
      </form>

      <div className="max-w-xl mx-auto space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded shadow-sm flex justify-between items-start">
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
        ))}
      </div>
    </div>
  )
}

export default App
