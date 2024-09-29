import UserDashboard from "./pages/UserDashboard";
import AuthorDashboard from "./pages/AuthorDashboard";
import useUserRole from "./useUserRole";

export default function UserRoleCheck() {
  const { userType, loading } = useUserRole();

  if (loading) return <div>Loading...</div>;

  if (userType === 'user') {
    return <UserDashboard />;
  } else if (userType === 'author') {
    return <AuthorDashboard />;
  } else {
    return <div>Error: Unknown user type.</div>; // Default error handling
  }
}
