// app/components/OfflineModeIndicator.js
'use client'; // Ensure this is a client component

import React, { useEffect, useState } from 'react';

const OfflineModeIndicator = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <div>
      {isOffline ? <p>You are currently offline.</p> : <p>Online</p>}
    </div>
  );
};

export default OfflineModeIndicator;
