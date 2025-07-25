import { useEffect, useState } from "react";
import api from "../api";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", subject: "", content: "", published: false });
  const [editingId, setEditingId] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/post");
      setPosts(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editingId) {
        await api.patch(`/post/${editingId}`, form);
      } else {
        await api.post("/post", form);
      }
      setForm({ title: "", subject: "", content: "", published: false });
      setEditingId(null);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to save post");
    }
  };

  const handleEdit = (post) => {
    setForm({
      title: post.title,
      subject: post.subject,
      content: post.content,
      published: !!post.published,
    });
    setEditingId(post.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    setError("");
    try {
      await api.delete(`/post/${id}`);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to delete post");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Your Posts</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">{editingId ? "Edit Post" : "Create Post"}</h3>
        <div className="mb-2">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border px-2 py-1 rounded" required />
        </div>
        <div className="mb-2">
          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="w-full border px-2 py-1 rounded" />
        </div>
        <div className="mb-2">
          <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" className="w-full border px-2 py-1 rounded" rows={3} />
        </div>
        <div className="mb-2 flex items-center gap-2">
          <input type="checkbox" name="published" checked={form.published} onChange={handleChange} id="published" />
          <label htmlFor="published">Published</label>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">
          {editingId ? "Update" : "Create"}
        </button>
        {editingId && (
          <button type="button" className="ml-2 text-gray-600 underline" onClick={() => { setEditingId(null); setForm({ title: "", subject: "", content: "", published: false }); }}>
            Cancel
          </button>
        )}
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="bg-white p-4 rounded shadow flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-lg">{post.title}</span>
                  {post.published && <span className="ml-2 text-green-600 text-xs">Published</span>}
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 underline" onClick={() => handleEdit(post)}>Edit</button>
                  <button className="text-red-600 underline" onClick={() => handleDelete(post.id)}>Delete</button>
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