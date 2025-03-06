import React from "react";
import "./GeneralLayout.scss";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const GeneralLayout = ({ children }) => {
  return (
    <div className ="">
      <Navigation />
      <div className="">
        <div className="main-content w-full">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default GeneralLayout;
