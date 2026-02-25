import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsLoggedIn, isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-yellow-100 sticky top-0 z-10">
      <div className="flex justify-between items-center px-5 py-5 h-12">
        <div className="logo font-bold text-2xl">
          <span className="text-yellow-900"> &lt;</span>
          Pass
          <span className="text-yellow-900">Man/&gt;</span>
        </div>

        <ul className="flex items-center">
          <li className="flex gap-4 items-center">
            <a
              href="https://github.com/ArunShivhare"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="p-2 w-11 hover:w-12 transition-all duration-200"
                src="icons/github.svg"
                alt="GitHub"
              />
            </a>
          </li>

          <li>
          {isLoggedIn && (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                navigate("/login");
              }}
            >
              Logout
            </button>
          )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;