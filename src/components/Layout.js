import React from 'react';
import Navbar from './Navbar';

// Regular layout for most pages (with navbar spacing)
export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="h-40"/> {/* This creates space for the navbar */}
      <main>
        {children}
      </main>
    </div>
  );
};

// Special layout for home page (without navbar spacing)
export const HomeLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
