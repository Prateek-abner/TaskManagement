// app/layout.js
import React from 'react';
import { UserProvider } from './contexts/UserContext'; // Ensure path is correct
import './globals.css'; // Import global styles if you have any

export const metadata = {
  title: 'Your App Title',
  description: 'Description of your app',
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {/* You can include a header or other layout components here */}
          {children}
          {/* You can include a footer or other layout components here */}
        </UserProvider>
      </body>
    </html>
  );
}

export default RootLayout;
