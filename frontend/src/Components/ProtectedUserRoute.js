import React from "react";
import { Navigate } from "react-router-dom";
import Utils from "../Utils/utils";
import { useAuth } from "../Contexts/AuthContext";

const ProtectedUserRoute = ({ redirectPath, children }) => {
  const {user, userRoles} = useAuth();


  if (!userRoles || !user) {
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
