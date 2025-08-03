import { useNavigate } from "react-router-dom";
import { FaWarehouse } from "react-icons/fa";

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Main content wrapper */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 py-10">
        {/* Logo or Icon */}
        <div className="mb-6 text-lime-400 text-6xl animate-bounce">
          <FaWarehouse />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-lime-400 text-center mb-4">
          Inventory Master
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg text-center max-w-xl mb-8">
          Simplify your product inventory, streamline management, and stay in control — all from one sleek dashboard.
        </p>

        {/* Buttons */}
        <div className="flex gap-6 flex-wrap justify-center">
          <button
            onClick={() => navigate("/login")}
            className="bg-lime-500 hover:bg-lime-600 text-black font-semibold px-6 py-3 rounded-md text-lg transition-transform duration-200 transform hover:scale-105 hover:text-white shadow-md"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/products")}
            className="border border-lime-500 text-lime-400 hover:bg-lime-500 hover:text-black px-6 py-3 rounded-md text-lg transition-transform duration-200 transform hover:scale-105 shadow-md"
          >
            Check Out Inventory
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-600 border-t border-gray-700">
        &copy; {new Date().getFullYear()} Inventory Master • All rights reserved
      </footer>
    </div>
  );
}

export default App;
