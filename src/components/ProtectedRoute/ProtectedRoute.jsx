import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, redirectTo = "/", restricted = false }) {
  const { user } = useSelector((state) => state.userSlice);
  const location = useLocation();

  if (!user && !restricted) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (user && restricted) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

export default ProtectedRoute;
