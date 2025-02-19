import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative mt-5 mx-auto mb-10 w-full px-4 flex items-center justify-between">
      <img src="./full_logo.svg" alt="Logo" width={150} />

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-10">
        <li>
          <Link to="/" className="hover:text-gray-600">
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hover:text-gray-600">
            Profile
          </Link>
        </li>
      </ul>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl focus:outline-none"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {menuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col justify-center items-center z-50">
          <ul className="flex flex-col items-center gap-8 text-2xl">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-gray-600"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="hover:text-gray-600"
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
