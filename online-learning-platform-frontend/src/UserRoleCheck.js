import { useUser } from "@clerk/clerk-react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserDashboard from "./pages/UserDashboard";
import AuthorDashboard from "./pages/AuthorDashboard";

export default function UserRoleCheck() {
  const { user } = useUser();
  // console.log("here is the user", user)
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true); 

//Make sure that user is available and correctly populated before making the API call
  useEffect(() => {
    if (user) {
      const checkUserType = async () => {
        try {
          const response = await axios.post('http://localhost:4000/check-user-type', {
            email: user.emailAddresses[0].emailAddress,
          });
          setUserType(response.data.type);
        } catch (error) {
          console.error('Error checking user type:', error);
        } finally {
          setLoading(false);
        }
      };
      
      checkUserType();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      {userType === 'user' ? <UserDashboard /> : <AuthorDashboard />}
    </div>
  );
}
