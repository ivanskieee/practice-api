import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentsList from "../components/CommentsList";
import CommentForm from "../components/CommentForm";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`);
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-2">{post.body}</p>

      <CommentForm postId={id} onCommentAdded={() => window.location.reload()} />
      <CommentsList postId={id} />
    </div>
  );
}
