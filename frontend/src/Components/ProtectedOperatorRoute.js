import React from "react";
import { Navigate } from "react-router-dom";
import Utils from "../Utils/utils";

const ProtectedOperatorRoute = ({ redirectPath, children }) => {
  // const userRoles = JSON.parse(sessionStorage.getItem("userRoles"));
  const user = sessionStorage.getItem("user");

  let userRoles = sessionStorage.getItem('userRoles') ? JSON.parse(sessionStorage.getItem('userRoles')) : [];
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
