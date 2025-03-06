import React, { useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Utils from "../../../Utils/utils";

const QRLandingPage = () => {
  const { beneficiary, couplename, date, id } = useParams();
  const navigate = useNavigate();

  const userRoles = (sessionStorage.getItem("userRoles")) ? JSON.parse(sessionStorage.getItem("userRoles")) : [];
  const uid = (sessionStorage.getItem("uid")) ? sessionStorage.getItem("uid") : '';

  const decryptedUserRoles = [];

  for (const role of userRoles) {
    let decodedRoleName = Utils.decryptValue(role);
    decryptedUserRoles.push(decodedRoleName);
  }

  useEffect(() => {
    if (!userRoles || !uid) {
      navigate("*");
    }


    if (
      decryptedUserRoles.includes("operator") ||
      decryptedUserRoles.includes("admin")
    ) {
      navigate(`/${beneficiary}/${couplename}/${date}/${id}/operator`);
    } else {
      navigate(`/${couplename}/${date}/${id}`);
    }
  }, []);

  return <div>QRLandingPage</div>;
};

export default QRLandingPage;
