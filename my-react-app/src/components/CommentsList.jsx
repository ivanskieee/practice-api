import { useEffect, useState } from "react";

export default function CommentsList({ postId }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await fetch(`http://localhost:3000/api/posts/${postId}/comments`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Comments</h3>
      <ul className="mt-2 space-y-2">
        {comments.map((c) => (
          <li key={c.id} className="border p-2 rounded">
            {c.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
