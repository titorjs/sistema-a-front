// src/PrivateRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { authenticated } = useAuth();

  if (authenticated === false) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
