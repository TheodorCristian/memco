import React from "react";
import LeftSide from "../LeftSide/LeftSide";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <div className="flex">
        <LeftSide />
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
