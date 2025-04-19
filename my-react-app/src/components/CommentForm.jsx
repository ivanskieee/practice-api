import { useState } from "react";

export default function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!content.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: { content } }),
      });

      if (!res.ok) throw new Error("Failed to post comment");

      const newComment = await res.json();
      onCommentAdded(newComment);
      setContent("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
        Add Comment
      </button>
    </form>
  );
}
