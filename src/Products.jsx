import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://gfg-inventory-task.vercel.app/api/product", {
        withCredentials: true,
      });
      setProducts(res.data.products);
      setDisplayed(res.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`https://gfg-inventory-task.vercel.app/api/product/${id}`,{ withCredentials: true });
      if (res.data.success) {
        setMessage("Product deleted successfully!");
        fetchProducts();
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      setMessage("Failed to delete product.");
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(value)
    );
    setDisplayed(filtered);
  };
  useEffect(() => {
  if (message) {
    const timer = setTimeout(() => {
      setMessage("");  
    }, 3000);

    return () => clearTimeout(timer);  
  }
}, [message]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 relative">
      {/* Add button - top right */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/admin")}
          className="bg-lime-500 hover:bg-lime-600 text-black font-bold py-2 px-5 rounded shadow"
        >
          + Add New Item
        </button>
      </div>

      {/* Centered Title and Search */}
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="p-3 text-4xl font-bold text-transparent bg-gradient-to-bl from-lime-400 to-cyan-300 bg-clip-text mb-8">
          Inventory
        </h1>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search products..."
          className="bg-gray-800 border border-lime-400 rounded px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
        />
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center my-10">
          <div className="w-12 h-12 border-4 border-lime-400 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {/* Message */}
      {message && <p className="text-center text-green-400 mb-6">{message}</p>}

      {/* Product Cards */}
      {!loading && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayed.length > 0 ? (
            displayed.map((product) => (
              <div key={product._id} className="bg-gray-900 p-4 rounded-lg shadow-lg relative group">
                {/* Image + Delete Icon */}
                <div className="relative">
                  <img
                    src={product.imgURL}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow opacity-90 group-hover:opacity-100"
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H3.5a.5.5 0 000 1H4v10a2 2 0 002 2h8a2 2 0 002-2V5h.5a.5.5 0 000-1H15V3a1 1 0 00-1-1H6zm2 5a.5.5 0 011 0v7a.5.5 0 01-1 0V7zm4 0a.5.5 0 011 0v7a.5.5 0 01-1 0V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {/* Text */}
                <h2 className="text-xl font-semibold text-lime-300 mt-3">{product.name}</h2>
                <p className="text-sm text-gray-300 mb-2">{product.description}</p>
                <p className="text-lime-400 font-bold text-lg">₹{product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
