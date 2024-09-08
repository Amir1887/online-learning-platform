import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'

function ProfilePage() {
  return (
    <div className='flex items-center justify-center text-primary-dark mt-4'>
      <h1 className='text-4xl'>profile page..</h1>
      <div >
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link to="/sign-in">Sign In</Link>
            </SignedOut>
          </div>
    </div>
  )
}

export default ProfilePage
