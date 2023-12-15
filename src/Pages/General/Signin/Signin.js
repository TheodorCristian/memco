import React, { useState } from "react";
import "./Signin.scss";
import { useAuth } from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Utils from "../../../Utils/utils";

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
      let token = user.token;
      let uid = user.data.tokenResult.uid;
      let userRoles = user.userData;
      let encryptedUserRoles = [];

      for (const role of userRoles) {
        let encryptedRole = Utils.encryptValue(role);
        encryptedUserRoles.push(encryptedRole);
      }

      localStorage.setItem("uid", uid);
      localStorage.setItem("userToken", token);
      localStorage.setItem("userRoles", JSON.stringify(encryptedUserRoles));

      window.dispatchEvent(new Event("localStorageUpdated"));

      if (userRoles.includes("admin")) {
        navigate("/admin-dashboard");
      }

      if (userRoles.includes("operator")) {
        navigate("/operator-dashboard");
      }

      if (userRoles.includes("user")) {
        navigate("/homepage");
      }
    } catch (error) {
      setError("Wrong Email or Password! Please Signin with correct data!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="emailLogin"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="passwordLogin"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
