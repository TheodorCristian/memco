import React from "react";
import { Navigate } from "react-router-dom";
import Utils from "../Utils/utils";

const ProtectedUserRoute = ({ redirectPath, children }) => {
  const userRoles = JSON.parse(sessionStorage.getItem("userRoles"));
  const uid = sessionStorage.getItem("uid");

  if (!userRoles || !uid) {
    return <Navigate to={redirectPath} />;
  }

  const decryptedUserRoles = [];

  for (const role of userRoles) {
    let decodedRoleName = Utils.decryptValue(role);
    decryptedUserRoles.push(decodedRoleName);
  }

  if (
    decryptedUserRoles.includes("admin") ||
    decryptedUserRoles.includes("user")
  ) {
    return children;
  } else {
    return <Navigate to={"/forbidden"} />;
  }
};

export default ProtectedUserRoute;
