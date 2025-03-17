import React from "react";
import { Outlet } from "react-router";
import { AuthUser } from "../helpers/AuthUser";
import Unauthorized from "../pages/Unauthorized";

const PrivateRoute = () => {
  return AuthUser.isAuthenticated() ? <Outlet /> : <Unauthorized />;
};

export default PrivateRoute;
