import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/user/signup",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response", response.data);

      // If signup is successful, navigate to the login page
      router.push("/login");
    } catch (err: any) {
      console.error(err);

      // Extract and set a more user-friendly error message
      if (err.response && err.response.data) {
        setError(err.response.data.message || "An error occurred during signup");
      } else {
        setError("An error occurred during signup");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-400">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 object-cover w-full h-full opacity-75 z-0"
      >
        <source src="/video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Sign Up Form */}
      <div className="absolute mt-16 right-20 flex justify-center items-center w-1/3 z-10">
        <div className="bg-white bg-opacity-50 rounded-lg p-6 shadow-md w-80">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Sign Up</h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-800">Username</label>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black" // Text color set to black
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-800">Email</label>
            <input
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black" // Text color set to black
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-800">Password</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black" // Text color set to black
            />
          </div>
          <button
            onClick={handleSignUp}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            Sign Up
          </button>
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default SignUp;