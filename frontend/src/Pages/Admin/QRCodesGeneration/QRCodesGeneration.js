import React, { useState, useEffect } from "react";
import { generateQRCodes } from "../../../Actions/AdminAction";
import "./QRCodesGeneration.scss";

const QRCodesGeneration = () => {
  const [date, setDate] = useState("");
  const [names, setNames] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    let data = {
      date: date,
      names: names,
      beneficiary: beneficiary.toLowerCase().split(' ').join('-'),
    };
    e.preventDefault();
    setLoading(true);

    
    try {
        let result = await generateQRCodes(data);
        if (result) setLoading(false);
        clearForm();

    } catch(err) {  
        setError(err);
        setLoading(false);
    }
    
  };

  const clearForm = () => {
    document.querySelector('input').value = null;
    setDate('');
    setNames('');
    setBeneficiary('');
  }

  return (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <div className="m-top-3">ceva</div>
      <div className="p-6">altceva</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="beneficiary"
          >
            Your name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="beneficiary"
            type="text"
            placeholder="Your Name"
            value={beneficiary}
            onChange={(e) => setBeneficiary(e.target.value)}
            required="true"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="text"
            placeholder="DDMMYYYY"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required="true"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="names"
            type="text"
            placeholder="Ex.:antonia-theo,..."
            value={names}
            onChange={(e) => setNames(e.target.value)}
            required="true"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QRCodesGeneration;
