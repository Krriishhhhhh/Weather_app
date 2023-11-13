import { useRouter } from "next/router";

export function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
