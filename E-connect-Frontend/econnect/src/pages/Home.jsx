import { useEffect, useState } from "react";
import { postAPI } from "../api";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postAPI.getAll();
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesFilter = filter === "all" || post.category?.toLowerCase() === filter.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      {/* Hero */}
      <div className="text-center mb-12 bg-gradient-to-r from-green-100 to-blue-100 p-10 rounded-2xl shadow-sm">
        <h1 className="text-5xl font-extrabold text-green-800 mb-4">🌍 EcoConnect</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Recycle. Share. Connect. Join your local community to make a cleaner, greener Earth.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {["all", "plastic", "paper", "e-waste", "metal", "glass", "other"].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === category
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-green-100"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="🔍 Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 w-full md:w-64"
        />
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
          <p className="text-2xl text-gray-500 font-medium mb-2">No posts found 🗑️</p>
          <p className="text-gray-400">Be the first to share a recyclable item!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
