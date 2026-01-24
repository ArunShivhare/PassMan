import React from 'react'
import { useRef, useState, useEffect } from 'react'

const Manager = () => {
  const ref = useRef()

  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordsArray, setpasswordsArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordsArray(JSON.parse(passwords))
    }
  }, [])


  const showPassword = () => {
    // alert("show the password")
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png"
    }
    else {
      ref.current.src = "icons/eyecross.png"
    }
  }

  const savePassword = (params) => {
    // console.log(form)
    setpasswordsArray([...passwordsArray, form])
    localStorage.setItem("passwords", JSON.stringify([...passwordsArray, form]))
    console.log([...passwordsArray, form])
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }



  return (
    <>
      <div class="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

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
              <input value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-gray-500 w-full p-4 py-1' type="text" name="password" id="" />
              <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1' width={25} src="icons/eye.png" alt="" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='flex justify-center items-center text-white bg-yellow-900 rounded-full gap-2 px-5 py-2 w-fit hover:bg-yellow-950 border border-yellow-50'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Save Password</button>
        </div>
        <div className="passwords">
          <h2 className='text-2xl font-bold py-4'>Your Passwords</h2>
          <table class="table-auto w-full rounded-md overflow-hidden">
            <thead className='bg-yellow-950 text-white'>
              <tr>
                <th className='py-2'>Song</th>
                <th className='py-2'>Artist</th>
                <th className='py-2'>Year</th>
              </tr>
            </thead>
            <tbody className='bg-yellow-50'>
              <tr>
              <td className='py-2 border border-white text-center w-32'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td className='py-2 border border-white text-center w-32'>Malcolm Lockyer</td>
              <td className='py-2 border border-white text-center w-32'>1961</td>
              </tr>
              <tr>
              <td className='py-2 border border-white text-center w-32'>Witchy Woman</td>
              <td className='py-2 border border-white text-center w-32'>The Eagles</td>
              <td className='py-2 border border-white text-center w-32'>1972</td>
              </tr>
              <tr>
              <td className='py-2 border border-white text-center w-32'>Shining Star</td>
              <td className='py-2 border border-white text-center w-32'>Earth, Wind, and Fire</td>
              <td className='py-2 border border-white text-center w-32'>1975</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Manager
