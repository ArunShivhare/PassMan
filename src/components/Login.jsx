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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login / Register
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={authForm.email}
          onChange={(e) =>
            setAuthForm({ ...authForm, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={authForm.password}
          onChange={(e) =>
            setAuthForm({ ...authForm, password: e.target.value })
          }
        />

        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Login;