import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
// import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()

  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordsArray, setpasswordsArray] = useState([])

  const getPasswords = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("https://passman-mjsm.onrender.com", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }

    const data = await res.json();
    setpasswordsArray(data);
  };

  useEffect(() => {
    // let passwords = localStorage.getItem("passwords");
    // if (passwords) {
    //   setpasswordsArray(JSON.parse(passwords))
    // }
    const token = localStorage.getItem("token");
    if (token) {
      getPasswords();
    }
  }, [])

  const copyText = (text) => {
    toast('copy to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
    navigator.clipboard.writeText(text)
  }


  const showPassword = () => {
    // alert("show the password")
    passwordRef.current.type = "text"
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png"
      passwordRef.current.type = "password"
    }
    else {
      ref.current.src = "icons/eyecross.png"
      passwordRef.current.type = "text"
    }
  }

  const savePassword = async () => {
    // console.log(form)
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      // if any such id exists already

      // await fetch("https://passman-mjsm.onrender.com", {
      //   method: "DELETE", headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ id: form.id })
      // })

      // setpasswordsArray([...passwordsArray, { ...form, id: uuidv4() }])
      // await fetch("https://passman-mjsm.onrender.com", {
      //   method: "POST", headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ ...form, id: uuidv4() })
      // })
      // setform({ site: "", username: "", password: "" })

      // localStorage.setItem("passwords", JSON.stringify([...passwordsArray, { ...form, id: uuidv4() }]))
      // console.log([...passwordsArray, form])

      // If editing existing entry → delete old one first
      if (form._id) {
        await fetch("https://passman-mjsm.onrender.com", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ id: form._id })
        });
      }

      // Save new/updated
      await fetch("https://passman-mjsm.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(form)
      });

      await getPasswords();

      setform({
        site: "",
        username: "",
        password: ""
      });

      toast('Password Saved', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    }
    else {
      toast('Invalid Input', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    }
  }

  const deletePassword = async (id) => {
    let c = confirm("Are you sure ?")
    if (c) {
      // setpasswordsArray(passwordsArray.filter(item => item.id !== id))

      // localStorage.setItem("passwords", JSON.stringify(passwordsArray.filter(item => item.id !== id)))

      // let req = await fetch("https://passman-mjsm.onrender.com", {
      //   method: "DELETE", headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ id })
      // })

      await fetch("https://passman-mjsm.onrender.com", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ id })
      });

      getPasswords();

      toast('Password Deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    }
    // console.log([...passwordsArray, form])
  }

  const editPassword = async (id) => {
    // setform({...passwordsArray.filter(item => item.id === id)[0], id: id})
    // setpasswordsArray(passwordsArray.filter(item => item.id !== id))

    const item = passwordsArray.find(i => i._id === id);
    if (!item) return;
    setform(item);

    // localStorage.setItem("passwords", JSON.stringify([...passwordsArray, {...form, id: uuidv4()}]))
    // console.log([...passwordsArray, form])
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      {/* Background */}
    <div className="min-h-[90vh] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops)) flex items-center justify-center py-12 px-4">
  <div className="max-w-6xl mx-auto">
    
    {/* Header Section */}
    <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
      <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight">
        <span className="text-yellow-700">&lt;</span>
        <span className="text-slate-900">Pass</span>
        <span className="text-yellow-700">Man/&gt;</span>
      </h1>
      <div className="mt-3 flex justify-center">
        <span className="h-1 w-20 bg-yellow-600 rounded-full"></span>
      </div>
      <p className="text-gray-500 mt-4 text-lg font-medium">
        Your digital vault, simplified and secured.
      </p>
    </div>

    {/* Input Form Card */}
    <div className="bg-white/40 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/60 mb-16 transform transition-all hover:shadow-yellow-100/50">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* URL Input */}
        <div className="md:col-span-12 group">
          <input
            value={form.site}
            onChange={handleChange}
            type="text"
            name="site"
            placeholder="Website URL (e.g., https://google.com)"
            className="w-full rounded-xl border-0 bg-white/80 px-5 py-4 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-yellow-700 transition-all outline-none"
          />
        </div>

        {/* Username Input */}
        <div className="md:col-span-5">
          <input
            value={form.username}
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="Username / Email"
            className="w-full rounded-xl border-0 bg-white/80 px-5 py-4 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-yellow-700 transition-all outline-none"
          />
        </div>

        {/* Password Input */}
        <div className="md:col-span-4 relative group">
          <input
            ref={passwordRef}
            value={form.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            className="w-full rounded-xl border-0 bg-white/80 px-5 py-4 pr-12 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-yellow-700 transition-all outline-none"
          />
          <button 
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
            onClick={showPassword}
          >
            <img ref={ref} className="w-5" src="icons/eye.png" alt="toggle" />
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={savePassword}
          className="md:col-span-3 bg-slate-900 hover:bg-yellow-800 text-white rounded-xl px-8 py-4 font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg active:scale-95 group"
        >
          <lord-icon
            className="invert"
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
            style={{ width: '24px', height: '24px' }}
          ></lord-icon>
          <span>Save Password</span>
        </button>
      </div>
    </div>

    {/* Password Display Section */}
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold text-slate-800">Vault Contents</h2>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-bold rounded-full">
          {passwordsArray.length}
        </span>
      </div>

      {passwordsArray.length === 0 ? (
        <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-3xl py-20 text-center">
          <p className="text-gray-400 font-medium">No credentials found in your vault.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {passwordsArray.map((item) => (
            <div
              key={item._id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Card Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-yellow-600 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Website</p>
                    <a href={item.site} target="_blank" rel="noreferrer" className="text-slate-900 font-bold truncate block hover:text-yellow-700 transition-colors">
                      {item.site.replace('https://', '').replace('www.', '')}
                    </a>
                  </div>
                  <button onClick={() => copyText(item.site)} className="p-2 hover:bg-yellow-50 rounded-lg transition-colors">
                    <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ width: '20px', height: '20px' }}></lord-icon>
                  </button>
                </div>

                <div className="space-y-4 flex-grow">
                  <div className="flex justify-between items-center bg-gray-50/50 p-3 rounded-xl">
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase font-bold text-gray-400">User</p>
                      <p className="text-sm font-medium truncate text-slate-700">{item.username}</p>
                    </div>
                    <button onClick={() => copyText(item.username)} className="opacity-50 hover:opacity-100 transition-opacity">
                      <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ width: '18px', height: '18px' }}></lord-icon>
                    </button>
                  </div>

                  <div className="flex justify-between items-center bg-gray-50/50 p-3 rounded-xl">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400">Password</p>
                      <p className="text-sm tracking-widest text-slate-700">••••••••</p>
                    </div>
                    <button onClick={() => copyText(item.password)} className="opacity-50 hover:opacity-100 transition-opacity">
                      <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ width: '18px', height: '18px' }}></lord-icon>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-100">
                  <button onClick={() => editPassword(item._id)} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors">
                    <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ width: '20px', height: '20px' }}></lord-icon>
                    EDIT
                  </button>
                  <button onClick={() => deletePassword(item._id)} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-red-600 transition-colors">
                    <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{ width: '20px', height: '20px' }}></lord-icon>
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>
      <ToastContainer />
    </>
  )
}

export default Manager
