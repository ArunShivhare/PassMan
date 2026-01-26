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

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordsArray(JSON.parse(passwords))
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

  const savePassword = () => {
    // console.log(form)
    setpasswordsArray([...passwordsArray, {...form, id: uuidv4()}])
    localStorage.setItem("passwords", JSON.stringify([...passwordsArray, {...form, id: uuidv4()}]))
    console.log([...passwordsArray, form])
    setform({ site: "", username: "", password: "" })
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

  const deletePassword = (id) => {
    let c = confirm("Are you sure ?")
    if(c){
    setpasswordsArray(passwordsArray.filter(item=>item.id!==id))
    localStorage.setItem("passwords", JSON.stringify(passwordsArray.filter(item=>item.id!==id)))
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

  const editPassword = (id) => {
    setform(passwordsArray.filter(item=>item.id===id)[0])
    setpasswordsArray(passwordsArray.filter(item=>item.id!==id))
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
      
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

      <div className="text-black mycontainer">
        <h1 className='font-bold text-4xl text-center'><span className='text-yellow-900'> &lt;</span>
          Pass
          <span className='text-yellow-900'>Man/&gt;</span>
        </h1>
        <p className='text-lg text-center'>Hey, I am here to manage your Passwords</p>
        <div className="flex flex-col p-4 text-black gap-3 items-center">
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-gray-500 w-full p-4 py-1' type="text" name="site" id="" />
          <div className="flex w-full gap-5 justify-between">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-gray-500 w-full p-4 py-1' type="text" name="username" id="" />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-gray-500 w-full p-4 py-1' type="password" name="password" id="" />
              <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1' width={25} src="icons/eye.png" alt="" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='flex justify-center items-center text-white bg-yellow-900 rounded-full gap-2 px-5 py-2 w-fit hover:bg-yellow-950 border border-yellow-50'>
            <lord-icon className='invert'
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Save</button>
        </div>
        <div className="passwords">
          <h2 className='text-2xl font-bold py-4'>Your Passwords</h2>
          {passwordsArray.length === 0 && <div>There is no passwords to show</div>}
          {passwordsArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className='bg-yellow-950 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-yellow-50'>
              {passwordsArray.map((item, index) => {
                return <tr key={index}>
                  <td className='py-2 border border-white text-center'>
                    <div className='flex items-center justify-center'>
                      <a href={item.site} target='_blank'>{item.site}</a>
                      <div className='cursor-pointer size-6 px-2' onClick={() => { copyText(item.site) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover">
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-white text-center'>
                    <div className='flex items-center justify-center'>
                      {item.username}
                      <div className='cursor-pointer size-6 px-2' onClick={() => { copyText(item.username) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover">
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-white text-center'>
                    <div className='flex items-center justify-center'>
                      {item.password}
                      <div className='cursor-pointer size-6 px-2' onClick={() => { copyText(item.password) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover">
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-white text-center'>
                    <span className='cursor-pointer px-1' onClick={()=>{editPassword(item.id)}}>
                      <lord-icon className='size-6'
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover">
                      </lord-icon>
                    </span>
                    <span className='cursor-pointer px-1' onClick={()=>{deletePassword(item.id)}}>
                      <lord-icon className='size-6'
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover">
                      </lord-icon>
                    </span>
                  </td>
                </tr>
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </>
  )
}

export default Manager
