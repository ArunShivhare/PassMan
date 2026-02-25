import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';
// import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      // transition={Bounce}
      />

      {/* Background */}
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-10 px-4 pb-28">

        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
              <span className="text-yellow-900">&lt;</span>
              <span className="text-black">Pass</span>
              <span className="text-yellow-900">Man/&gt;</span>
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Securely manage your passwords in one place
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-6 sm:p-8 border border-yellow-200">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <input
                value={form.site}
                onChange={handleChange}
                type="text"
                name="site"
                placeholder="Enter Website URL"
                className="md:col-span-3 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-yellow-900 outline-none"
              />

              <input
                value={form.username}
                onChange={handleChange}
                type="text"
                name="username"
                placeholder="Enter Username"
                className="rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-yellow-900 outline-none"
              />

              {/* Password Field with YOUR Eye Icon */}
              <div className="relative">
                <input
                  ref={passwordRef}
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:ring-2 focus:ring-yellow-900 outline-none"
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={showPassword}
                >
                  <img
                    ref={ref}
                    className="w-6"
                    src="icons/eye.png"
                    alt="toggle"
                  />
                </span>
              </div>

              <button
                onClick={savePassword}
                className="bg-yellow-900 hover:bg-yellow-800 text-white rounded-lg px-6 py-3 font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <lord-icon
                  className="invert"
                  src="https://cdn.lordicon.com/jgnvfzqg.json"
                  trigger="hover"
                ></lord-icon>
                Save
              </button>

            </div>
          </div>

          {/* Password Cards */}
          <div className="mt-12">

            <h2 className="text-2xl font-bold mb-6">Your Passwords</h2>

            {passwordsArray.length === 0 && (
              <div className="text-gray-500 text-center py-6">
                No passwords saved yet.
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {passwordsArray.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-md rounded-xl p-5 border border-yellow-100 hover:shadow-xl transition duration-300"
                >
                  <div className="space-y-4">

                    {/* Website */}
                    <div>
                      <p className="text-xs text-gray-500">Website</p>
                      <div className="flex justify-between items-center">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-900 font-medium truncate"
                        >
                          {item.site}
                        </a>

                        <div
                          className="cursor-pointer size-6"
                          onClick={() => copyText(item.site)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </div>

                    {/* Username */}
                    <div>
                      <p className="text-xs text-gray-500">Username</p>
                      <div className="flex justify-between items-center">
                        <span className="truncate">{item.username}</span>

                        <div
                          className="cursor-pointer size-6"
                          onClick={() => copyText(item.username)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <p className="text-xs text-gray-500">Password</p>
                      <div className="flex justify-between items-center">
                        <span>{"*".repeat(item.password.length)}</span>

                        <div
                          className="cursor-pointer size-6"
                          onClick={() => copyText(item.password)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-3 border-t mt-3">

                      <span
                        className="cursor-pointer"
                        onClick={() => editPassword(item._id)}
                      >
                        <lord-icon
                          className="size-6"
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                        ></lord-icon>
                      </span>

                      <span
                        className="cursor-pointer"
                        onClick={() => deletePassword(item._id)}
                      >
                        <lord-icon
                          className="size-6"
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                        ></lord-icon>
                      </span>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Manager
