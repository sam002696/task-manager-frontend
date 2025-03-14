import { lazy, Suspense } from "react";
// import PrivateRoute from "./PrivateRoute";
import { Navigate } from "react-router";
import Loader from "../components/ui/Loader";

// const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Taskboard = lazy(() => import("../pages/Taskboard"));
// const NotFound = lazy(() => import("../pages/NotFound"));

const routes = [
  { path: "/", element: <Navigate to="/login" replace /> },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<Loader />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/taskboard",
    element: (
      <Suspense fallback={<Loader />}>
        <Taskboard />
      </Suspense>
    ),
  },
  // {
  //   path: "*",
  //   element: (
  //     <Suspense fallback={<Loader />}>
  //       <NotFound />
  //     </Suspense>
  //   ),
  // },
];

export default routes;
