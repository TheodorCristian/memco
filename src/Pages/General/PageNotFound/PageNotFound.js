import React from "react";
import "./PageNotFound.scss";

const PageNotFound = () => {
  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Oops! Page not found.</p>
        <a
          href="/homepage"
          className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
