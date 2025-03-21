import { lazy } from "react";
import { Navigate } from "react-router";
import PrivateRoute from "./PrivateRoute";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Taskboard = lazy(() => import("../pages/Taskboard"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Defining routes
const routes = [
  { path: "/", element: <Navigate to="/login" replace /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [{ path: "taskboard", element: <Taskboard /> }],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
