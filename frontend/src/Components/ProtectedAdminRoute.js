import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Utils from "../Utils/utils";

const ProtectedAdminRoute = ({ redirectPath, children }) => {
  const userRoles = JSON.parse(sessionStorage.getItem("userRoles"));
  const uid = sessionStorage.getItem("uid");

  const decryptedUserRoles = [];

  if (!userRoles || !uid) {
    return <Navigate to={redirectPath} />;
  }

  for (const role of userRoles) {
    let decodedRoleName = Utils.decryptValue(role);
    decryptedUserRoles.push(decodedRoleName);
  }

  if (decryptedUserRoles.includes("admin")) {
    return children;
  } else {
    return <Navigate to={"/forbidden"} />;
  }
};

export default ProtectedAdminRoute;
