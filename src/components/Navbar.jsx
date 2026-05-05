import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsLoggedIn, isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-4 z-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(184,146,33,0.08)] border border-white/50 rounded-[2rem] px-6 py-3 flex justify-between items-center transition-all duration-300">
        
        {/* Logo Section */}
        <div className="logo font-black text-2xl tracking-tighter cursor-pointer" onClick={() => navigate("/")}>
          <span className="text-yellow-600">&lt;</span>
          <span className="text-slate-800">Pass</span>
          <span className="text-yellow-600">Man/&gt;</span>
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/ArunShivhare"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-white hover:border-yellow-400 hover:text-yellow-700 transition-all group"
          >
            <img
              className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity"
              src="icons/github.svg"
              alt="GitHub"
            />
            <span className="hidden sm:block text-xs font-bold uppercase tracking-wider">Source</span>
          </a>

          {isLoggedIn && (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                navigate("/login");
              }}
              className="px-5 py-2 rounded-2xl bg-slate-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-black active:scale-95 transition-all shadow-md shadow-slate-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
