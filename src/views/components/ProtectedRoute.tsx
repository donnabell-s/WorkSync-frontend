// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  roles?: string[];
  children?: React.ReactNode;
}

export default function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
  const { user } = useAuth();

  // if (loading) {
  //   return <div>Loading...</div>; // Or a spinner
  // }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children ? children : <Outlet />}</>;
}