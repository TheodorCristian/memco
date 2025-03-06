import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserVideoPage.scss";

const UserVideoPage = () => {
  const { couplename} = useParams();

  const [header, setHeader] = useState();

  const generatePageHeader = (couplename) => { 
    const couplenameFinal = couplename.split("-").join("&");
    setHeader(couplenameFinal);
  };

  useEffect(() => {
    generatePageHeader(couplename);
  }, []);

  return (
    <div className="center">
      <h2>{header}</h2>
    </div>
  );
};

export default UserVideoPage;
