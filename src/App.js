import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "./User";
import Admin from "./Admin";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
// import { AuthProvider } from "./context/authContext";

function App() {
  return (
    // <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<User />}>
          <Route index element={<Home />} />
          <Route path="profile/:userID" element={<Profile />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="admin/*" element={<Admin />} />
      </Routes>
    </Router>
    // </AuthProvider>
  );
}

export default App;
