import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { callApi, clearState, selectApi } from "../store/apiSlice";
import { AUTH_API } from "../constants/apiConstants";
import Taskify from "../../src/assets/images/taskify.png";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Getting the loading state and registration response from Redux store
  const {
    loading, // True when API request is in progress
    registerInfo = {
      // Stores registration response (success or failure)
      data: {},
    },
  } = useSelector(selectApi);

  // If registration is successful, navigating to the login page
  useEffect(() => {
    if (registerInfo?.status === "success") {
      dispatch(
        clearState({
          // Clearing the registerInfo state after registration
          output: "registerInfo",
        })
      );
      navigate("/login");
    }
  }, [registerInfo?.status, navigate, dispatch]);

  // Setting up form handling with Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    // Form validation rules using Yup
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    // What happens when the form is submitted
    onSubmit: (values) => {
      dispatch(
        callApi({
          operationId: AUTH_API.REGISTER,
          parameters: {
            method: "POST", // The API endpoint for registration
            body: JSON.stringify(values), // Convert form data to JSON format
          },
          output: "registerInfo", // Store API response in Redux under `registerInfo`
          storeName: "registerInfo",
        })
      );
    },
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img alt="Taskify" src={Taskify} className="mx-auto h-16 w-auto" />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Register to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <Input
              label="Name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : ""
              }
            />

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
                  to="/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Already registered? Login here
                </Link>
              </div>
            </div>

            <Button type="submit" variant="primary" isLoading={loading}>
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
