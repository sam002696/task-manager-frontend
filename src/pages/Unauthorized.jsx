import React from "react";
import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-red-600">401</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Unauthorized Access
        </h1>
        <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl">
          You do not have permission to view this page. Please log in with the
          correct credentials.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/login"
            className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Unauthorized;
