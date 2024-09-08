import {  Outlet, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

//This component acts as the root layout
export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer className="flex-none" />

      </div>
    </ClerkProvider>
  );
}
