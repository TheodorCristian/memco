import React, { useEffect, useState } from "react";
import "./LeftSideLink.scss";
import { Link, useNavigate } from "react-router-dom";

import Dashboard from "../../../Assets/Icons/dashboard.png";
import VideoTemplates from "../../../Assets/Icons/video-templates.png";
import Orders from "../../../Assets/Icons/orders.png";
import OtherData from "../../../Assets/Icons/other-data.png";
import Finance from "../../../Assets/Icons/finance.png";
import Settings from "../../../Assets/Icons/settings.png";
import QRCodesGeneration from "../../../Assets/Icons/qr-code.png";

const LeftSideLink = ({ name, redirectPath }) => {
  const [sourceName, setSourceName] = useState("");

  const setImageSourceName = () => {
    switch (name) {
      case "Dashboard":
        setSourceName(Dashboard);
        break;
      case "Video Templates":
        setSourceName(VideoTemplates);
        break;
      case "Orders":
        setSourceName(Orders);
        break;
      case "Other Data":
        setSourceName(OtherData);
        break;
      case "Finance":
        setSourceName(Finance);
        break;
      case "QR Codes Generation":
        setSourceName(QRCodesGeneration);
        break;
      case "Settings":
        setSourceName(Settings);
        break;
    }
  };

  useEffect(() => {
    setImageSourceName();
  }, []);
  return (
    <li className="min-w-max pointer">
      <Link to={redirectPath}>
        <div
          aria-label={name}
          className="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600"
        >
          <img className="icon" src={sourceName} />
          <span className="-mr-1 font-medium">{name}</span>
        </div>
      </Link>
    </li>
  );
};

export default LeftSideLink;
