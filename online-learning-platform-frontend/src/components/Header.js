import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='flex items-center justify-center mt-4 text-primary-dark'>
      <ul className='flex  items-center gap-8 mt-6 text-primary text-xl '>
          <li className='px-4 py-2 hover:text-black hover:underline hover:bg-blue-300 rounded-xl'><Link to={"/courses"}>Courses</Link></li>
          <li className='px-4 py-2 hover:text-black hover:underline hover:bg-blue-300 rounded-xl'><Link to={"/profile"}>Profile</Link></li>
          <li className='px-4 py-2 hover:text-black hover:underline hover:bg-blue-300 rounded-xl'><Link to={"/about"}>About</Link></li>
          <li className='px-4 py-2 hover:text-black hover:underline hover:bg-blue-300 rounded-xl'><Link to={"/contact"}>Contact</Link></li>
          <li className='px-4 py-2 hover:text-black hover:underline hover:bg-blue-300 rounded-xl'><Link to={"/sign-in"}>Sign In</Link></li>
          <li className='px-4 py-2 hover:text-black hover:underline hover:bg-blue-300 rounded-xl'><Link to={"/sign-up"}>Sign Up</Link></li>

        </ul>
    </div>
  )
}

export default Header
