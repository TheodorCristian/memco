import React from "react";
import LeftSideLink from "../LeftSideLink/LeftSideLink";

const LeftSide = () => {
  return (
    <div className="bg-neutral-50 fixed">
      <div className="sidebar w-[3.25rem] overflow-hidden hover:w-56 hover:bg-white hover:shadow-lg">
        <div className="flex h-screen flex-col justify-between pt-2 pb-6 my-28">
          <div>
            <ul className="mt-6 space-y-2 tracking-wide">
              <LeftSideLink
                name={"Dashboard"}
                redirectPath={"/admin/dashboard"}
              />
              <LeftSideLink
                name={"Video Templates"}
                redirectPath={"/admin/video-templates"}
              />
              <LeftSideLink name={"Orders"} redirectPath={"/admin/orders"} />
              <LeftSideLink name={"Other Data"} redirectPath={"/admin/other"} />
              <LeftSideLink name={"Finance"} redirectPath={"/admin/finance"} />
              <LeftSideLink
                name={"QR Codes Generation"}
                redirectPath={"/admin/qr-codes-generation"}
              />
              <LeftSideLink
                name={"Settings"}
                redirectPath={"/admin/settings"}
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
