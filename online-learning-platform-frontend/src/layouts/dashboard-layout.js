import * as React from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'


//This component is designed for authenticated users
export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()

  // console.log('test', userId)

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in')
    }
  }, [isLoaded, userId, navigate])

  if (!isLoaded) return 'Loading...'
  
    {/* Render child routes inside the dashboard layout */}
  return <Outlet />
}