import React, { useState } from "react";
import "./Navigation.scss";
import Logo from "../../../Assets/Images/logo.png";
import { useAuth } from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginIcon from "../../../Assets/Icons/login.png";

const Navigation = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const user = sessionStorage.getItem("user");
  const userRoles = sessionStorage.getItem("userRoles");
  const navigate = useNavigate();

  const style = {
    backgroundImage: `url(${LoginIcon})`,
    backgroundSize: "cover",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  };

  const toggleMenu = () => {
    setIsOpened(!isOpened);
  };

  const handleSignOut = async () => {
    try {
      let response = await logout();
      if (response.isSuccess) {
        setIsOpened(false);
        navigate("/homepage");
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <nav className="bg-neutral-50 py-1 px-8 flex justify-between items-center w-full z-10 absolute top-0 left-0">
      <div className="flex items-center w-32 flex items-center justify-start">
        <div className="w-24 h-24 bg-neutral-50 rounded-full mr-4">
          <img
            src={Logo}
            alt="Logo"
            onClick={() => {
              navigate("/homepage");
            }}
            className="cursor-pointer"
          />
        </div>
      </div>

      {user ? (
        <div className="relative flex items-center justify-end w-32">
          <button
            className={`menu ${isOpened ? "opened" : ""}`}
            onClick={toggleMenu}
            aria-label="Main Menu"
          >
            <svg width="45" height="45" viewBox="0 0 100 100">
              <path
                className="line line1"
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              />
              <path className="line line2" d="M 20,50 H 80" />
              <path
                className="line line3"
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              />
            </svg>
          </button>
          {isOpened && (
            <div>
              <ul className="profile-menu absolute top-full left-2/4 bg-white shadow-lg rounded w-40 translate-x-[-50%]">
                <li className="flex justify-center items-center py-4 px-8 border-b-2 border-gray-100">
                  <button className="text-gray-950 font-semibold text-xs">
                    Profile
                  </button>
                </li>
                <li className="flex justify-center items-center py-4 px-8 border-b-2 border-gray-100">
                  <button className="text-gray-950 font-semibold text-xs">
                    Orders
                  </button>
                </li>
                <li className="flex justify-center items-center py-4 px-8 ">
                  <button
                    className="text-gray-950 font-semibold text-xs"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div
          style={style}
          className="cursor-pointer hover:scale-125 ease-in duration-300 "
          onClick={() => {
            navigate("/signin");
          }}
        ></div>
      )}
    </nav>
  );
};

export default Navigation;
