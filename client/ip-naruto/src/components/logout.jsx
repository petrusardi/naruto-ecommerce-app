import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Hapus token atau status login dari localStorage
    localStorage.removeItem("token");

    // Arahkan pengguna ke halaman login
    navigate("/login");
  };
  return (
    <>
      <div className="space-x-1 hidden md:block">
        <button
          type="button"
          onClick={handleLogout}
          className="px-6 py-2 border rounded-full dark:text-slate-100  dark:hover:bg-red-800 text-red-900"
        >
          Log Out
        </button>
      </div>
    </>
  );
}
