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
import InvoicesPage from './pages/InvoicesPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import UserRoleCheck from './UserRoleCheck';
import SingleLessonPage from './pages/SingleLessonPage';
import Enrollment from './pages/Enrollment';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // Public Routes (no need to be under /dashboard)
      { path: '/', element: <HomePage /> }, // Root-level routes
      { path: '/contact', element: <ContactPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/sign-in/*', element: <SignInPage /> },
      { path: '/sign-up/*', element: <SignUpPage /> },

      // Dashboard Layout (Nested routes inside /dashboard)
      {
        path: '/dashboard', // Dashboard prefix
        element: <DashboardLayout />,
        children: [
          { path: '', element: <UserRoleCheck /> }, // Dashboard root
          { path: 'home', element: <HomePage /> },  // Accessible as /dashboard/home
          { path: 'courses', element: <CoursesPage /> },  // Accessible as /dashboard/courses
          { path: 'course/:id', element: <CoursePage /> },  // Accessible as /dashboard/course/:id
          { path: 'course/:courseId/lesson/:lessonId', element: <SingleLessonPage /> },  // Accessible as /dashboard/course/:id/lessonId
          { path: 'course/:id/enrollment', element: <Enrollment /> },  // Accessible as /dashboard/course/:id/enrollment
          { path: 'about', element: <AboutPage /> },  // Accessible as /dashboard/about
          { path: 'profile', element: <ProfilePage /> },  // Accessible as /dashboard/profile
          { path: 'update-profile', element: <UpdateProfilePage /> },  // Accessible as /dashboard/update-profile
          { path: 'invoices', element: <InvoicesPage /> },  // Accessible as /dashboard/invoices
          { path: 'contact', element: <ContactPage /> },  // Accessible as /dashboard/contact
          // { path: '*', element: <NotFoundPage /> },

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
