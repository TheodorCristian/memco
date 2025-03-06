import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { generateVideo } from "../../../Actions/OperatorAction";

const OperatorVideoPage = () => {
  const { beneficiary, couplename, date, id } = useParams();

  const handleVideoProcess = async () => {
    const data = {
      beneficiary: beneficiary,
      name: couplename,
    };


    let video = await generateVideo(data);
  };

  return (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <p>Operator video page</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleVideoProcess}
      >
        Generate Video
      </button>
    </div>
  );
};

export default OperatorVideoPage;
