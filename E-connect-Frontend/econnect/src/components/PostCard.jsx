export default function PostCard({ post, onDelete, showDelete = false }) {
  const categoryColors = {
    plastic: "bg-blue-100 text-blue-800",
    paper: "bg-yellow-100 text-yellow-800",
    "e-waste": "bg-purple-100 text-purple-800",
    metal: "bg-gray-100 text-gray-800",
    glass: "bg-green-100 text-green-800",
    other: "bg-pink-100 text-pink-800",
  };

  const categoryColor = categoryColors[post.category?.toLowerCase()] || categoryColors.other;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
          {post.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <span>📍</span>
            <span>{post.location || "Location not specified"}</span>
          </div>
          <div className="mt-1">
            <span className="text-xs">Posted by: {post.userEmail}</span>
          </div>
        </div>

        {showDelete && onDelete && (
          <button
            onClick={() => onDelete(post.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}