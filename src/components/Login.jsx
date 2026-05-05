import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [authForm, setAuthForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    if (!authForm.email || !authForm.password) {
      toast.error("Enter email and password");
      return;
    }

    const res = await fetch("https://passman-mjsm.onrender.com/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authForm)
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);

      if (data.message === "Account created") {
        toast.success("Account created successfully 🎉");
      } else {
        toast.success("Login successful 👋");
      }

      navigate("/");
    } else {
      toast.error("Invalid credentials ❌");
    }
  };

  return (
    <div className="min-h-[90vh] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops)) flex items-center justify-center px-4">
  
  {/* Decorative Soft Orbs for depth */}
  <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-200/40 rounded-full blur-3xl -z-10" />
  <div className="absolute bottom-20 right-20 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl -z-10" />

  <div className="bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(184,146,33,0.1)] rounded-[2.5rem] p-12 w-full max-w-md border border-white/50 ring-1 ring-yellow-200/50">
    
    <div className="text-center mb-10">
      <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-yellow-100/50 border border-yellow-200 text-yellow-800 text-[10px] font-bold uppercase tracking-[0.15em]">
        Encryption Active
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight">
        <span className="text-yellow-600">Pass</span>
        <span className="text-slate-800 underline decoration-yellow-400 decoration-4 underline-offset-4">Man</span>
      </h1>
      <p className="text-slate-500 mt-4 font-medium">
        Welcome back. Your vault awaits.
      </p>
    </div>

    <div className="space-y-5">
      <div>
        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1 mb-2">Email Address</label>
        <input
          type="email"
          placeholder="name@company.com"
          className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 outline-none transition-all duration-300 placeholder:text-slate-300"
          value={authForm.email}
          onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
        />
      </div>

      <div>
        <div className="flex justify-between ml-1 mb-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Master Password</label>
            <button className="text-[11px] font-bold text-yellow-600 hover:text-yellow-700">Forgot?</button>
        </div>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 outline-none transition-all duration-300"
          value={authForm.password}
          onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
        />
      </div>

      <button
        onClick={handleLogin}
        className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg shadow-slate-200 hover:-translate-y-0.5 active:scale-95"
      >
        Unlock Vault
      </button>

      <p className="text-center text-slate-400 text-sm mt-6">
        New here? <button className="text-yellow-600 font-bold hover:underline">Create Account</button>
      </p>
    </div>
  </div>
</div>

  );
};

export default Login;