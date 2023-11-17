import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { BrowserRouter } from "react-router-dom";
const clientId =
  "863758027481-5dt37ota9odb7gmlkn9hu0to1hifvulv.apps.googleusercontent.com";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <App />
        </GoogleOAuthProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
