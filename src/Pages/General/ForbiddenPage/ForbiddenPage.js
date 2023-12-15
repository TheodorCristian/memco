import React from "react";
import "./ForbiddenPage.scss";
import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        Oops! Access Forbidden
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Sorry, you do not have permission to access this page. If you believe
        this is an error, please contact the administrator.
      </p>
      <Link
        to="/homepage" // Update the route to redirect users where needed
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Go to homepage
      </Link>
    </div>
  );
};

export default ForbiddenPage;
