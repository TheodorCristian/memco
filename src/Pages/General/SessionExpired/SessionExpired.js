import React from "react";
import { useNavigate } from "react-router-dom";

const SessionExpired = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Session Expired</h1>
      <p className="text-lg mb-6">
        Oups! It seems your session has expired. Please log in again to
        continue.
      </p>
      {/* You can add a button to redirect to the login page */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          // Redirect to the login page
          // Example using React Router
          navigate("/signin"); // Replace '/login' with your actual login route
        }}
      >
        Sign in
      </button>
    </div>
  );
};

export default SessionExpired;
