import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";

import ProtectedUserRoute from "./Components/ProtectedUserRoute";
import ProtectedAdminRoute from "./Components/ProtectedAdminRoute";
import ProtectedOperatorRoute from "./Components/ProtectedOperatorRoute";
import Signup from "./Pages/General/Signup/Signup";
import Signin from "./Pages/General/Signin/Signin";
import Homepage from "./Pages/General/Homepage/Homepage";
import OperatorDashboard from "./Pages/Operator/OperatorDashboard/OperatorDashboard";
import AdminDashboard from "./Pages/Admin/AdminDashboard/AdminDashboard";
import Order from "./Pages/Admin/Order/Order";
import PageNotFound from "./Pages/General/PageNotFound/PageNotFound";
import ForbiddenPage from "./Pages/General/ForbiddenPage/ForbiddenPage";
import SessionExpired from "./Pages/General/SessionExpired/SessionExpired";

function App() {
  const handlelocalStorageRefresh = () => {
    window.addEventListener("storage", (event) => {
      if (event.key === "localStorageUpdated") {
        // Handle the event here
        // Update session storage or refresh data after receiving the event
        console.log(event);
        const updatedData = JSON.parse(event.newValue); // Parse the new value from the event

        // Synchronize session storage with updated data received from another tab
        for (const key in updatedData) {
          if (updatedData.hasOwnProperty(key)) {
            localStorage.setItem(key, updatedData[key]);
          }
        }
      }
    });
  };
  useEffect(() => {
    handlelocalStorageRefresh();
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            {/* GENERAL ROUTES START*/}
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/homepage" element={<Homepage />} />
            <Route exact path="/forbidden" element={<ForbiddenPage />} />
            <Route exact path="/session-expired" element={<SessionExpired />} />
            {/* GENERAL ROUTES END*/}

            {/* ------------------ */}

            {/* OPERATOR ROUTES START*/}
            <Route
              exact
              path="/operator-dashboard"
              element={
                <ProtectedOperatorRoute redirectPath="/signin">
                  <OperatorDashboard />
                </ProtectedOperatorRoute>
              }
            />
            {/* OPERATOR ROUTES END*/}

            {/* ------------------ */}

            {/* ADMIN ROUTES START*/}

            <Route
              exact
              path="/admin-dashboard"
              element={
                <ProtectedAdminRoute redirectPath="/signin">
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route
              exact
              path="/admin/orders/:id"
              element={
                <ProtectedAdminRoute redirectPath="/signin">
                  <Order />
                </ProtectedAdminRoute>
              }
            />

            {/* ADMIN ROUTES END*/}

            {/* 404 Page Not Found*/}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
