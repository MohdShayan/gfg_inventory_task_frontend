import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imgURL: ""
  });
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState();
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("https://gfg-inventory-task.vercel.app/api/product/add", form, {
        withCredentials: true,
      });
      if (res.data.success) {
        setMessage(" Product added successfully!");
        setForm({ name: "", description: "", price: "", imgURL: "" });
      }
    } catch (err) {
      setMessage(" Failed to add product.");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post("https://gfg-inventory-task.vercel.app/api/user/logout", {}, {
        withCredentials: true
      });
      if (res.data.success) {
        setProfile(null);
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleProfileClick = async () => {
    if (!profile) {
      try {
        const res = await axios.get("https://gfg-inventory-task.vercel.app/api/user/me", { withCredentials: true });
        if (res.data.success) {
          setProfile(res.data.user);
        }
      } catch (err) {
        console.error("Unable to fetch profile:", err);
      }
    }
    setShowProfile(prev => !prev); 
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8 relative">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8 relative">
        <div className="relative">
          <button
            onClick={handleProfileClick}
            className="bg-gray-800 hover:bg-gray-700 text-lime-400 border border-lime-500 px-4 py-2 rounded"
          >
            Profile
          </button>

          {/* Profile Popup */}
          {showProfile && profile && (
            <div className="absolute z-10 mt-2 left-0 bg-gray-900 text-white border border-lime-500 p-4 rounded shadow-lg w-64">

              <p><span className="text-lime-400 font-medium">Name:</span> {profile.name}</p>
              <p><span className="text-lime-400 font-medium">Email:</span> {profile.email}</p>
              <p><span className="text-lime-400 font-medium">Role:</span> {profile.role}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6 text-lime-400">Admin Panel</h1>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg space-y-5"
      >
        {["name", "description", "price", "imgURL"].map((field) => (
          <div key={field}>
            <label className="block capitalize mb-1">{field}</label>
            <input
              type={field === "price" ? "number" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
              placeholder={`Enter product ${field}`}
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-lime-500 hover:bg-lime-600 text-black font-semibold py-2 rounded"
        >
          + Add Product
        </button>
        {message && (
          <p className="text-center text-sm mt-2 text-green-300">{message}</p>
        )}
      </form>

      <div className="mt-8 text-center">
        <button
          className="bg-gradient-to-br from-yellow-400 to-green-500 text-black font-semibold py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-600 transition duration-150"
          onClick={() => navigate('/products')}
        >
          Go To Inventory
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
