import React from 'react'

import Header from '../components/Header'
function HomePage() {
  return (
    <div className='flex flex-col items-center justify-center mt-4 text-primary-dark'>
      <h1 className='text-4xl'>Welcome to the Online Learning Platform</h1>
        <Header/>    
    </div>
  )
}

export default HomePage
