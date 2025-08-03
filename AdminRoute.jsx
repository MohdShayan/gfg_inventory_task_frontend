
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await axios.get("https://gfg-inventory-task.vercel.app/api/user/me", {
          withCredentials: true,
        });

        if (!res.data.success || !res.data.user || res.data.user.role !== "admin") {
          navigate("/");
        } else {
          setChecking(false);
        }
      } catch (err) {
        console.error("Admin check failed:", err);
        navigate("/");
      }
    };

    verifyAdmin();
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-lime-400 text-xl">
        Checking admin access...
      </div>
    );
  }

  return children;
};

export default AdminRoute;
