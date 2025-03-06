import React, { useEffect, useState } from "react";
import { retrieveCounties, retrieveCities } from "../../../Actions/AddressActions";

const AddOrder = () => {
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [productId, setProductId] = useState("");
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [postCode, setPostCode] = useState("");
  const [county, setCounty] = useState({});
  const [city, setCity] = useState("");
  const [countiesList, setCountiesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

//   let disableCity = true;


  const [inviteesNames, setInviteesNames] = useState([]);

  const handleSubmitOrder = (e) => {};
  const handleRetrieveCounties = async () => {
    const counties = await retrieveCounties();
    setCountiesList(counties);
  };
  const handleRetrieveCities = async () => {    
    const cities = await retrieveCities(county.countyCode);
    setCitiesList(cities);
  }


  return (
    <div className="flex box-border h-screen">
      <div className="lg:flex justify-center items-center lg:w-2/5 hidden "></div>
      <div className="flex justify-center items-center lg:w-3/5 w-full h-full my-auto">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form
          onSubmit={handleSubmitOrder}
          className="w-full max-w-2xl px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Let's order</h2>
          <div className="mb-4 mt-4 flex items-center">
            <div className="w-1/2 mr-4">
              <label
                className="block text-gray-700 text-lg font-bold mb-2 text-left"
                htmlFor="firstName"
              >
                Prenume
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required="true"
              />
            </div>
            <div className="w-1/2">
              <label
                className="block text-gray-700 text-lg font-bold mb-2 text-left"
                htmlFor="lastName"
              >
                Nume
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required="true"
              />
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <div className="w-1/2 mr-4">
              <label
                className="block text-gray-700 text-lg font-bold mb-2 text-left"
                htmlFor="phoneNumber"
              >
                Numar de telefon
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required="true"
              />
            </div>
            <div className="w-1/2">
              <label
                className="block text-gray-700 text-lg font-bold mb-2 text-left"
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required="true"
              />
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <div className="w-1/2 mr-4">
              <label
                className="block text-gray-700 text-lg font-bold mb-2 text-left"
                htmlFor="streetName"
              >
                Strada
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="streetName"
                type="text"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                required="true"
              />
            </div>
            <div className="w-1/2">
              <label
                className="block text-gray-700 text-lg font-bold mb-2 text-left"
                htmlFor="streetNumber"
              >
                Numar
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="streetNumber"
                type="text"
                value={streetNumber}
                onChange={(e) => setStreetNumber(e.target.value)}
                required="true"
              />
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <div className="w-1/2 mr-4">
              <label
                className="block text-gray-700 text-lg font-bold mb-2 text-left"
                htmlFor="buildingNumber"
              >
                Bloc
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="buildingNumber"
                type="text"
                value={buildingNumber}
                onChange={(e) => setBuildingNumber(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label
                className="block text-gray-700 text-lg font-bold mb-2 text-left"
                htmlFor="apartmentNumber"
              >
                Apartament
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="apartmentNumber"
                type="text"
                value={apartmentNumber}
                onChange={(e) => setApartmentNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <div className="w-1/3 mr-4 cursor-pointer">
              <label
                className="block text-gray-700 text-lg font-bold mb-2 text-left"
                htmlFor="county"
              >
                Judet
              </label>
              {/* <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="county"
                type="text"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                required="true"
              /> */}
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onClick={handleRetrieveCounties}
                onChange={(e) => {
                    const county = JSON.parse(e.target.value)
                    setCounty({countyCode: county.countyCode, countyName: county.countyName});
                }}
              >
                {countiesList.map((county) => {
                  return <option value={JSON.stringify({countyCode: county.auto, countyName: county.nume})} key={county.auto}>{county.nume}</option>;
                })}
              </select>
            </div>
            <div className="w-1/3 mr-4">
              <label
                className="block text-gray-700 text-lg font-bold mb-2 text-left"
                htmlFor="city"
              >
                Oras
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onClick={handleRetrieveCities}
                onChange={(e) => {
                    setCity(e.target.value);
                }}
                // disabled={disableCity}
              >
                {citiesList.sort((a,b) => a.nume.localeCompare(b.nume)).map((city) => {
                  return <option value={city.name}>{city.nume}</option>;
                })}
              </select>
            </div>
            <div className="w-1/3">
              <label
                className="block text-gray-700 text-lg font-bold mb-2 text-left"
                htmlFor="postCode"
              >
                Cod Postal
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="postCode"
                type="text"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
                required="true"
              />
            </div>
          </div>
          {/* <div className="flex items-center justify-center">
            <button
              className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full bg-sky-400 text-white hover:bg-sky-500 ease-in duration-300"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Signup"}
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default AddOrder;
