import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPublishedPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/post/published");
        setPosts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to fetch published posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPublishedPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Published Posts by Others</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="bg-white p-4 rounded shadow flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-lg">{post.title}</span>
                  <span className="ml-2 text-green-600 text-xs">Published</span>
                </div>
              </div>
              <div className="text-gray-700">{post.subject}</div>
              <div className="text-gray-500 text-sm">{post.content}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 