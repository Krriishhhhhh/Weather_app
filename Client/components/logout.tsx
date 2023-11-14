import { useRouter } from "next/router";

export function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="text-center">
      <button
        onClick={handleLogout}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Logout
      </button>
    </div>
  );
}
