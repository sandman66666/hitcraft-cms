import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  allowedRoles?: string[];
}

const ProtectedRoute = ({
  children,
  requireAuth = true,
  allowedRoles = [],
}: ProtectedRouteProps) => {
  const location = useLocation();
  const {
    descope: { user, isAuthenticated, isSessionLoading },
  } = useAuth();

  // Show loading state while session is being checked
  if (isSessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If authentication is required and user is not authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified, check if user has required role
  if (allowedRoles.length > 0 && user) {
    const userRoles = user.customAttributes?.userRoles || [];
    const hasRequiredRole = allowedRoles.some((role) =>
      userRoles.includes(role)
    );

    if (!hasRequiredRole) {
      return <Navigate to="/" replace />;
    }
  }

  // If registration is not complete, redirect to registration
  if (requireAuth && user && !user.customAttributes?.v2Registered) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  // If everything is fine, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
