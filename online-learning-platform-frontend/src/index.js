import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Import the layouts
import RootLayout from './layouts/root-layout';
import DashboardLayout from './layouts/dashboard-layout';

// Import the components
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import CoursePage from './pages/CoursePage ';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
// import DashboardPage from './pages/DashboardPage';
import InvoicesPage from './pages/InvoicesPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import UserRoleCheck from './UserRoleCheck';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/update-profile', element: <UpdateProfilePage /> },
      { path: '/courses', element: <CoursesPage /> },
      { path: '/course/:id', element: <CoursePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/sign-in/*', element: <SignInPage /> },
      { path: '/sign-up/*', element: <SignUpPage /> },
      {
        element: <DashboardLayout />,
        path: 'dashboard',
        children: [
          { path: '/dashboard', element: <UserRoleCheck /> },
          { path: '/dashboard/invoices', element: <InvoicesPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
