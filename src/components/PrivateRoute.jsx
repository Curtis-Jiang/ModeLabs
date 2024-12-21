import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // 或者你可以返回一个加载指示器
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;