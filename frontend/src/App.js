import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import Utils from "./Utils/utils";

import ProtectedAdminRoute from "./Components/ProtectedAdminRoute";
import ProtectedOperatorRoute from "./Components/ProtectedOperatorRoute";
import Signup from "./Pages/General/Signup/Signup";
import Signin from "./Pages/General/Signin/Signin";
import Homepage from "./Pages/General/Homepage/Homepage";
import OperatorDashboard from "./Pages/Operator/OperatorDashboard/OperatorDashboard";
import PageNotFound from "./Pages/General/PageNotFound/PageNotFound";
import ForbiddenPage from "./Pages/General/ForbiddenPage/ForbiddenPage";
import SessionExpired from "./Pages/General/SessionExpired/SessionExpired";
import AdminLayout from "./Components/Admin/AdminLayout/AdminLayout";
import GeneralLayout from "./Components/General/GeneralLayout/GeneralLayout";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import VideoTemplates from "./Pages/Admin/VideoTemplates/VideoTemplates";
import Orders from "./Pages/Admin/Orders/Orders";
import QRLandingPage from "./Pages/General/QRLandingPage/QRLandingPage";
import OperatorVideoPage from "./Pages/Operator/OperatorVideoPage/OperatorVideoPage";
import UserVideoPage from "./Pages/User/UserVideoPage/UserVideoPage";
import QRCodesGeneration from "./Pages/Admin/QRCodesGeneration/QRCodesGeneration";
import Other from "./Pages/Admin/Other/Other";
import Settings from "./Pages/Admin/Settings/Settings";
import Finance from "./Pages/Admin/Finance/Finance";
import AddOrder from "./Pages/User/AddOrder/AddOrder";
import ProtectedUserRoute from "./Components/ProtectedUserRoute";
import ProductPage from "./Pages/General/ProductPage/ProductPage";

function App() {
  useEffect(() => {
    Utils.handlesessionStorageRefresh();
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/*"
              element={
                <GeneralLayout>
                  {/* Nested Routes for Admin */}
                  <Routes>
                    {/* GENERAL ROUTES START*/}
                    <Route
                      exact
                      path="/"
                      element={<Navigate replace to="/homepage" />}
                    />
                    <Route exact path="/product/:productSlug" element={<ProductPage />} />
                    <Route exact path="/signin" element={<Signin />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="/homepage" element={<Homepage />} />
                    <Route
                      exact
                      path="/:beneficiary/:couplename/:date/:id/qr-landing-page"
                      element={<QRLandingPage />}
                    />
                    <Route
                      exact
                      path="/:couplename/:date/:id"
                      element={<UserVideoPage />}
                    />
                    <Route
                      exact
                      path="/forbidden"
                      element={<ForbiddenPage />}
                    />
                    <Route
                      exact
                      path="/session-expired"
                      element={<SessionExpired />}
                    />
                    {/* GENERAL ROUTES END*/}

                    {/* ------------------ */}

                    {/* USER ROUTES START*/}

                    <Route
                      path="/user/*"
                      element={
                        <>
                          {/* Nested Routes for Admin */}
                          <Routes>
                            <Route exact path="/add-order" element={
                              <ProtectedUserRoute redirectPath="/signin">
                                <AddOrder />
                              </ProtectedUserRoute>
                              }
                          />
                          </Routes>
                          </>
                      }
                    />

                    {/* USER ROUTES END*/}

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

                    <Route
                      exact
                      path="/:beneficiary/:couplename/:date/:id/operator"
                      element={
                        <ProtectedOperatorRoute redirectPath="/signin">
                          <OperatorVideoPage />
                        </ProtectedOperatorRoute>
                      }
                    />
                    {/* OPERATOR ROUTES END*/}

                    {/* ------------------ */}

                    {/* ADMIN ROUTES START*/}

                    <Route
                      path="/admin/*"
                      element={
                        <AdminLayout>
                          {/* Nested Routes for Admin */}
                          <Routes>
                            <Route
                              path="/dashboard"
                              element={
                                <ProtectedAdminRoute redirectPath="/signin">
                                  <Dashboard />
                                </ProtectedAdminRoute>
                              }
                            />
                            <Route
                              path="/video-templates"
                              element={
                                <ProtectedAdminRoute redirectPath="/signin">
                                  <VideoTemplates />
                                </ProtectedAdminRoute>
                              }
                            />
                            <Route
                              path="/orders"
                              element={
                                <ProtectedAdminRoute redirectPath="/signin">
                                  <Orders />
                                </ProtectedAdminRoute>
                              }
                            />
                            <Route
                              path="/other"
                              element={
                                <ProtectedAdminRoute redirectPath="/signin">
                                  <Other />
                                </ProtectedAdminRoute>
                              }
                            />
                            <Route
                              path="/qr-codes-generation"
                              element={
                                <ProtectedAdminRoute redirectPath="/signin">
                                  <QRCodesGeneration />
                                </ProtectedAdminRoute>
                              }
                            />
                            <Route
                              path="/finance"
                              element={
                                <ProtectedAdminRoute redirectPath="/signin">
                                  <Finance />
                                </ProtectedAdminRoute>
                              }
                            />
                            <Route
                              path="/settings"
                              element={
                                <ProtectedAdminRoute redirectPath="/signin">
                                  <Settings />
                                </ProtectedAdminRoute>
                              }
                            />
                            {/* Add more nested routes for admin section */}
                          </Routes>
                        </AdminLayout>
                      }
                    />

                    {/* ADMIN ROUTES END*/}

                    {/* 404 Page Not Found*/}
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </GeneralLayout>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
