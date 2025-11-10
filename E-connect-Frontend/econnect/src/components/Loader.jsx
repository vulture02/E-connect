import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    </div>
  )
}

export default Loader