import React, { useState } from "react";
import "./Signin.scss";
import { useAuth } from "../../../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Utils from "../../../Utils/utils";
import LeftBackground from "../../../Assets/Images/Background/sign-in-left-background.jpg";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login, loading } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("No Email or Password provided!");
      return;
    }

    try {
      // Call the login function from the context
      let user = await login(email, password);
      // let token = user.token;
      // let uid = user.data.tokenResult.uid;
      // let userRoles = user.userData;
      // let encryptedUserRoles = [];

      // for (const role of userRoles) {
      //   let encryptedRole = Utils.encryptValue(role);
      //   encryptedUserRoles.push(encryptedRole);
      // }

      // sessionStorage.setItem("uid", uid);
      // sessionStorage.setItem("userToken", token);
      // sessionStorage.setItem("userRoles", JSON.stringify(encryptedUserRoles));

      // window.dispatchEvent(new Event("sessionStorageUpdated"));

      let userRoles = sessionStorage.getItem('userRoles') ? JSON.parse(sessionStorage.getItem('userRoles')) : [];
      let decryptedRoles = userRoles.map(role => Utils.decryptValue(role));
      console.log({
        userRoles: userRoles,
        decryptedRoles: decryptedRoles
      })

      if (decryptedRoles.includes("admin")) {
        navigate("/admin/dashboard");
      }

      if (decryptedRoles.includes("operator")) {
        navigate("/operator-dashboard");
        console.log('in refirect')
      }

      if (decryptedRoles.includes("user")) {
        navigate("/homepage");
      }
    } catch (error) {
      setError("Wrong Email or Password! Please Signin with correct data!");
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
    <div className="flex box-border">
      <div
        className="lg:flex justify-center items-center h-screen lg:w-2/5 hidden "
        style={style}
      >
      </div>
      <div className="flex justify-center items-center h-screen lg:w-3/5 w-full">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Sign in to your account
          </h2>
          <p>
            Not a member? <span><Link className="text-sky-400 hover:text-sky-500 font-bold" to="/signup">Create a free acount here!</Link></span>
          </p>
          <div className="mb-4 mt-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2 text-left"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="emailLogin"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 mt-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2 text-left"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="passwordLogin"
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
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
