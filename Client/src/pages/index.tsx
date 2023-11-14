import { useRouter } from 'next/router';
import React from 'react';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

function Root() {
  const router = useRouter();

  const handleSignupClick = () => {
    router.push('/signup');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative font-roboto">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0"
      >
        <source
          src="/video.mp4" // Replace with your own video source
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="z-10 text-white text-center">
        <h1 className="text-6xl font-bold mb-8 tracking-wide text-green-400">
          Welcome to Weather App
        </h1>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleSignupClick}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out shadow-lg"
          >
            Signup
          </button>
          <button
            onClick={handleLoginClick}
            className="bg-white text-green-500 hover:text-green-600 px-8 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out shadow-lg"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Root;