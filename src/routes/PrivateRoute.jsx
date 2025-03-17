import React from "react";
import { Navigate, Outlet } from "react-router";
import { AuthUser } from "../helpers/AuthUser";

const PrivateRoute = () => {
  console.log("PrivateRoute rendered"); // ✅ Debugging
  console.log("AuthUser.isAuthenticated():", AuthUser.isAuthenticated()); // ✅ Debugging
  const isSomething = true;

  return isSomething ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
