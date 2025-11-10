
import { Link } from "react-router-dom";
import { logOut } from "../firebase";


export default function Navbar({ user }) {
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl">♻️</div>
            <span className="text-xl font-bold text-green-600">EcoConnect</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/create"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Create Post
                </Link>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-3">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-sm text-gray-700">{user.displayName}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}