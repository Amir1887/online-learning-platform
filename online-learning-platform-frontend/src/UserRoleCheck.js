import UserDashboard from "./pages/UserDashboard";
import AuthorDashboard from "./pages/AuthorDashboard";
import useUserRole from "./useUserRole";

export default function UserRoleCheck() {
 const {userType, loading} = useUserRole();

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      {userType === 'user' ? <UserDashboard /> : <AuthorDashboard />}
    </div>
  );
}
