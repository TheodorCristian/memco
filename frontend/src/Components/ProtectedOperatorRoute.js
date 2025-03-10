import React from "react";
import { Navigate } from "react-router-dom";
import Utils from "../Utils/utils";
import { useAuth } from "../Contexts/AuthContext";

const ProtectedOperatorRoute = ({ redirectPath, children }) => {
  const {userRoles, user} = useAuth();

  let decryptedRoles = userRoles.map(role => Utils.decryptValue(role));
  if (!userRoles || !user) {
    return <Navigate to={redirectPath} />;
  }

  // if (decryptedRoles.includes("admin") || decryptedRoles.includes("admin")) {
  if (decryptedRoles.includes("operator")) {
    return children;
  } else {
    return <Navigate to={"/forbidden"} />;
  }
};

export default ProtectedOperatorRoute;
