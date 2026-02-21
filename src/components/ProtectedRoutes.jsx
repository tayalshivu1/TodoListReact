import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoutes = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return children;
  }
  return <Navigate to="/" replace />;
};
