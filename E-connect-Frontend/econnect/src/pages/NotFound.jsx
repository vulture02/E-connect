

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-green-600">404</h1>
        <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}