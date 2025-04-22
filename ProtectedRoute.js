import React from 'react';
import { useAuth } from './auth';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in to access this page.</div>;
  }

  return children;
};

export default ProtectedRoute;
