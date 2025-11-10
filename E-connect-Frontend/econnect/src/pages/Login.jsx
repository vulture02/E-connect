import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from "../firebase";
import { userAPI } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const saveUserToBackend = async (user) => {
    try {
      await userAPI.createOrUpdate({
        email: user.email,
        displayName: user.displayName || formData.name,
        photoURL: user.photoURL || null,
      });
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      await saveUserToBackend(user);
      navigate("/");
    } catch (err) {
      setError("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let user;
      if (isSignUp) user = await signUpWithEmail(formData.email, formData.password, formData.name);
      else user = await signInWithEmail(formData.email, formData.password);

      await saveUserToBackend(user);
      navigate("/");
    } catch (err) {
      setError("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">♻️</div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isSignUp ? "Join EcoConnect" : "Welcome Back"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {isSignUp ? "Create your eco-friendly profile" : "Sign in to continue your journey"}
          </p>
        </div>

        {error && <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-3">{error}</div>}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-400"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 chars)"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 my-4">or</div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full border border-gray-300 rounded-lg py-2.5 flex items-center justify-center gap-2 hover:border-green-500 transition"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="mt-5 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="text-green-600 hover:underline text-sm"
          >
            {isSignUp ? "Already have an account? Sign In" : "Don’t have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
