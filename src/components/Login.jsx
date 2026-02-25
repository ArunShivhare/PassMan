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
     <div className="h-screen overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center px-4">

    <div className="bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-full max-w-md border border-yellow-200">

      <div className="text-center mb-8">
        <h1 className="font-bold text-3xl">
          <span className="text-yellow-900">&lt;</span>
          <span className="text-black">Pass</span>
          <span className="text-yellow-900">Man/&gt;</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Secure access to your vault
        </p>
      </div>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-900 outline-none"
        value={authForm.email}
        onChange={(e) =>
          setAuthForm({ ...authForm, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Enter your password"
        className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-900 outline-none"
        value={authForm.password}
        onChange={(e) =>
          setAuthForm({ ...authForm, password: e.target.value })
        }
      />

      <button
        onClick={handleLogin}
        className="w-full bg-yellow-900 hover:bg-yellow-800 text-white py-3 rounded-lg font-medium transition duration-200"
      >
        Continue
      </button>

    </div>
  </div>
  );
};

export default Login;