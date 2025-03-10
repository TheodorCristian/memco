import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Utils from "../Utils/utils";
import {useAuth} from '../Contexts/AuthContext';

const ProtectedAdminRoute = ({ redirectPath, children }) => {
  const {user, userRoles} = useAuth();
  console.log({
    user: user,
    userRoles: userRoles
  })

  const decryptedUserRoles = [];

  if (!userRoles || !user) {
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
