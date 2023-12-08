import React from "react";
import "./Homepage.scss";

const Homepage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md py-8 px-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to My Tailwind CSS App
        </h1>
        <p className="text-gray-700">
          This is a simple homepage created using Tailwind CSS in a React
          application.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Homepage;
