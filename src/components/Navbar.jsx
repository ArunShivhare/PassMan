import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-white/80 backdrop-blur-md shadow-sm border-b border-yellow-100 sticky top-0 z-10'>
      {/* can add mycontainer utility made in index.css */}
      <div className="flex justify-between items-center px-5 py-5 h-12">
        <div className='logo font-bold text-2xl'>
          <span className='text-yellow-900'> &lt;</span>
          Pass
          <span className='text-yellow-900'>Man/&gt;</span>
        </div>
        <ul>
          <li className='flex gap-4 items-center'>
            {/* <a className='text-black hover:font-bold' href="/">Home</a>
            <a className='text-black hover:font-bold' href="#">About</a>
            <a className='text-black hover:font-bold' href="#">Contact</a> */}
            <a
              href="https://github.com/ArunShivhare"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="p-2 w-11 hover:w-12 transition-all duration-200"
                src="icons/github.svg"
                alt="GitHub"
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
