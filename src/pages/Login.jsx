import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { callApi, clearState, selectApi } from "../store/apiSlice";
import { AUTH_API } from "../constants/apiConstants";
import { Link, useNavigate } from "react-router";
import { AuthUser } from "../helpers/AuthUser";
import Taskify from "../../src/assets/images/taskify.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Getting loading state and login response from Redux store
  const {
    loading, // True while the API request is in progress
    loginInfo = {
      // Stores the login response (success or failure)
      data: {},
    },
  } = useSelector(selectApi);

  // If login is successful, saving the login data and navigating to the taskboard
  useEffect(() => {
    if (loginInfo?.status === "success" && loginInfo?.data?.token) {
      AuthUser.saveLoginData(loginInfo?.data);
      // Clearing the loginInfo state after saving the login data
      // This is done to prevent the login data from being stored in Redux
      dispatch(
        clearState({
          output: "loginInfo",
        })
      );
      navigate("/taskboard");
    }
  }, [
    loginInfo?.data?.token,
    loginInfo?.data,
    loginInfo?.status,
    navigate,
    dispatch,
  ]);

  // Setting up form handling with Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // Form validation rules using Yup
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    // What happens when the form is submitted
    onSubmit: (values) => {
      console.log("values", values);
      dispatch(
        callApi({
          // Making an API request to login
          operationId: AUTH_API.LOGIN, // The API endpoint for login
          parameters: {
            method: "POST", // POST method for login
            body: JSON.stringify(values), // Convert form data to JSON format
          },
          output: "loginInfo", // Store API response in Redux under `loginInfo`
          storeName: "loginInfo",
        })
      );
    },
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img alt="Taskify" src={Taskify} className="mx-auto h-16 w-auto" />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <Input
              label="Email address"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""
              }
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
            />

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  to="/register"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  New user? Register here
                </Link>
              </div>
            </div>

            <Button type="submit" variant="primary" isLoading={loading}>
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
