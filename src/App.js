import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./Pages/General/Signin/Signin";
import Signup from "./Pages/General/Signup/Signup";
import { AuthProvider } from "./Contexts/AuthContext";
import Orders from "./Pages/Admin/Orders/Orders";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route excact path ="/orders" element={<Orders />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
