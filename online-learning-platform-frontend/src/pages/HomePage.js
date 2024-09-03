import React from 'react'
import { Link } from 'react-router-dom'
function HomePage() {
  return (
    <div className='flex flex-col items-center justify-center mt-4 text-primary-dark'>
      <h1 className='text-4xl'>Welcome to the Online Learning Platform</h1>
      <div>
        <ul className='flex  items-center gap-8 mt-6 text-primary text-xl '>
          <li className='px-4 py-2 hover:text-black hover:underline hover:bg-blue-300 rounded-xl'><Link to={"/signin"}>Sign In</Link></li>
          <li className='px-4 py-2 hover:text-black hover:underline hover:bg-blue-300 rounded-xl'><Link to={"/signup"}>Sign Up</Link></li>
          <li className='px-4 py-2 hover:text-black hover:underline hover:bg-blue-300 rounded-xl'><Link to={"/courses"}>Courses</Link></li>
          <li className='px-4 py-2 hover:text-black hover:underline hover:bg-blue-300 rounded-xl'><Link to={"/profile"}>Profile</Link></li>
          <li className='px-4 py-2 hover:text-black hover:underline hover:bg-blue-300 rounded-xl'><Link to={"/about"}>About</Link></li>
          <li className='px-4 py-2 hover:text-black hover:underline hover:bg-blue-300 rounded-xl'><Link to={"/contact"}>Contact</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default HomePage
