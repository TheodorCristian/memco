import React from "react";
import "./Footer.scss";
import Github from "../../../Assets/Icons/github-white.png";
import Linkedin from "../../../Assets/Icons/linkedin-white.png";

const Footer = () => {
  return (
    <div className="bg-[#1b1e29] text-[#f6f6f6] flex justify-between items-center py-[50px] px-[100px]">
      <div className="flex justify-between">
        <div className="pl-[10px] max-w-[30px]">
          <a href="" className="w-full">
            <img src={Github} className="w-full h-auto"/>
          </a>
        </div>
        <div className="pl-[10px] max-w-[30px]">
          <a href="" className="w-full">
            <img src={Linkedin} className="w-full h-auto"/>
          </a>
        </div>
      </div>
      <div>
        <p className="text-left text-[14px] font-bold">
          <span className="text-[18px]">Ⓒ</span> MEMCO
        </p>
        <p className="text-left text-[14px] font-bold">
          <span className="text-[18px]">est</span> 2025
        </p>
      </div>
    </div>
  );
};

export default Footer;
