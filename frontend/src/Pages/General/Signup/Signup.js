import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";
import { useAuth } from "../../../Contexts/AuthContext";
import LeftBackground from "../../../Assets/Images/Background/sign-up-left-background.jpg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { signup} = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let userData = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: address,
      phoneNumber: phoneNumber,
      role: "user",
    };

    if (!email || !password) {
      setError("No Email or Password provided!");
      return;
    }

    setLoading(true);
    try {
      // Call the login function from the context
      let uid = await signup(userData);
    } catch (error) {
      console.error("Login error:", error.message);
    } finally {
      setLoading(false);
      navigate('/homepage');
    }
  };

  const style = {
    backgroundImage: `url(${LeftBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    margin: "0",
    padding: "0",
  };

  return (
    <div className="flex box-border h-screen">
      <div
        className="lg:flex justify-center items-center lg:w-2/5 hidden "
        style={style}
      ></div>
      <div className="flex justify-center items-center lg:w-3/5 w-full h-full my-auto">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form
          onSubmit={handleSignUp}
          className="w-full max-w-md px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create a new account
          </h2>
          <p>
            Already have an account? <span><Link className="text-sky-400 hover:text-sky-500 font-bold" to="/signin">
                Sign in here!
              </Link>
            </span>
          </p>
          <div className="mb-4 mt-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2 text-left"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2 text-left"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2 text-left"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2 text-left"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2 text-left"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-lg font-bold mb-2 text-left"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full bg-sky-400 text-white hover:bg-sky-500 ease-in duration-300"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
