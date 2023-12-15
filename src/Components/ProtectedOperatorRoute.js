import React from "react";
import { Navigate } from "react-router-dom";
import Utils from "../Utils/utils";

const ProtectedOperatorRoute = ({ redirectPath, children }) => {
  const userRoles = JSON.parse(localStorage.getItem("userRoles"));
  const uid = localStorage.getItem("uid");

  const decryptedUserRoles = [];

  for (const role of userRoles) {
    let decodedRoleName = Utils.decryptValue(role);
    decryptedUserRoles.push(decodedRoleName);
  }

  if (!userRoles || !uid) {
    return <Navigate to={redirectPath} />;
  }

  // if (decryptedUserRoles.includes("admin") || decryptedUserRoles.includes("admin")) {
  if (decryptedUserRoles.includes("operator")) {
    return children;
  } else {
    return <Navigate to={"/forbidden"} />;
  }
};

export default ProtectedOperatorRoute;
