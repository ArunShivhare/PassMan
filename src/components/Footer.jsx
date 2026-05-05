import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full py-8 mt-auto border-t border-yellow-100 bg-white/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">
        
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="logo font-black text-xl tracking-tighter">
            <span className="text-yellow-600">&lt;</span>
            <span className="text-slate-800">Pass</span>
            <span className="text-yellow-600">Man/&gt;</span>
          </div>
        </div>

        {/* Credits */}
        <div className="flex flex-col items-center">
          <p className="text-slate-500 text-sm font-medium flex items-center gap-1">
            Designed with <span className="text-red-500 animate-pulse">❤</span> by 
            <span className="text-slate-800 font-bold hover:text-yellow-600 transition-colors cursor-pointer"> Arun Shivhare</span>
          </p>
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">
            © {new Date().getFullYear()} Secure Vault Protocol
          </p>
        </div>

        {/* Social / Github quick link */}
        <div className="flex gap-6 mt-2">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="opacity-40 hover:opacity-100 transition-opacity">
            <img src="icons/github.svg" alt="GitHub" className="w-5 h-5" />
          </a>
        </div>
        
      </div>
    </footer>
  );
};


export default Footer
