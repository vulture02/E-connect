import { useEffect, useState } from "react";
import { postAPI, userAPI } from "../api";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";

export default function Dashboard({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    contributions: 0,
  });

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    try {
      const [postsResponse, contributionsResponse] = await Promise.all([
        postAPI.getByUser(user.email),
        userAPI.getContributions(user.email),
      ]);
      setPosts(postsResponse.data);
      setStats({
        totalPosts: postsResponse.data.length,
        contributions: contributionsResponse.data,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this post?")) {
      try {
        await postAPI.delete(id);
        setPosts(posts.filter((p) => p.id !== id));
        setStats((s) => ({ ...s, totalPosts: s.totalPosts - 1 }));
      } catch (error) {
        alert("Failed to delete post.");
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-green-700">
          Hey {user.displayName}! 🌱
        </h1>
        <p className="text-gray-600 mt-2">Here’s your recycling journey summary</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { title: "Total Posts", value: stats.totalPosts, icon: "📝", color: "bg-green-100" },
          { title: "Contributions", value: stats.contributions, icon: "🌟", color: "bg-blue-100" },
          {
            title: "Impact Level",
            value:
              stats.contributions >= 10
                ? "High"
                : stats.contributions >= 5
                ? "Medium"
                : "Beginner",
            icon: "🏆",
            color: "bg-yellow-100",
          },
        ].map((card, i) => (
          <div key={i} className={`p-6 rounded-xl shadow-sm bg-white border-t-4 border-green-400`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-full text-2xl`}>{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* My Posts */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">My Posts</h2>
        {posts.length === 0 ? (
          <div className="bg-white p-10 rounded-xl text-center shadow-sm">
            <p className="text-lg text-gray-500 mb-2">No posts yet 🌾</p>
            <p className="text-gray-400">Start contributing to the green movement!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                showDelete={true}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
