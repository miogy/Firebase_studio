import React from "react";
import { useAuthContext } from "../components/context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, repuireAdmin }) {
  const { user } = useAuthContext();
  if (!user || (repuireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace={true} />;
    // replace={true} : history를 남기지 않음
  }

  return children;
}

export default ProtectedRoute;
