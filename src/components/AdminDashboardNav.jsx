import { LuUser } from "react-icons/lu";
import { AuthContext } from "../authContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";

const AdminDashboardNav = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    dispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  };

  return (
    <nav className="flex justify-between w-full px-12 py-4">
      <h1 className="text-4xl font-extrabold text-white">App</h1>

      <button
        className="flex items-center bg-[#9BFF00] px-4 rounded-3xl gap-1.5 text-sm"
        onClick={handleLogout}
      >
        <LuUser size={20} className="text-[#696969]" /> Logout
      </button>

      {loading && (
        <div className="flex items-center justify-center h-screen text-5xl text center">
          Loading...
        </div>
      )}
    </nav>
  );
};

export default AdminDashboardNav;
