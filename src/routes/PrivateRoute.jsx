import React from "react";
import { Outlet } from "react-router";
import { AuthUser } from "../helpers/AuthUser";
import Unauthorized from "../pages/Unauthorized";

const PrivateRoute = () => {
  // Checking if the user is authenticated
  // If authenticated, rendering the child routes
  // If not authenticated, rendering the Unauthorized page
  return AuthUser.isAuthenticated() ? <Outlet /> : <Unauthorized />;
};

export default PrivateRoute;
