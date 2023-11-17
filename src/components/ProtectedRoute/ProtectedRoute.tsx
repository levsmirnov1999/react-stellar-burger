import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

interface IProtectedRoute {
  children: React.ReactNode;
  redirectTo?: string;
  restricted?: boolean;
}

function ProtectedRoute({
  children,
  redirectTo = "/",
  restricted = false,
}: IProtectedRoute) {
  const { user } = useSelector((state: any) => state.userSlice);
  const location = useLocation();

  if (!user && !restricted) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (user && restricted) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
