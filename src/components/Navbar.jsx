import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-white'>
      {/* can add mycontainer utility made in index.css */}
      <div className="flex justify-between items-center px-5 py-5 h-12">
        <div className='logo font-bold text-2xl'>
          <span className='text-yellow-900'> &lt;</span>
          Pass
          <span className='text-yellow-900'>Man/&gt;</span>
          </div>
        <ul>
            <li className='flex gap-4'>
                <a className='text-black hover:font-bold' href="/">Home</a>
                <a className='text-black hover:font-bold' href="#">About</a>
                <a className='text-black hover:font-bold' href="#">Contact</a>
            </li>
        </ul>
        </div>
    </nav>
  )
}

export default Navbar
