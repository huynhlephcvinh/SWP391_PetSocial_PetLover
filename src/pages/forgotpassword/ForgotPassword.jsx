import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./forgotpassword.scss";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate=useNavigate();
  const handleForgotPassword = async (event) => {
    event.preventDefault();

    try {
      // Send a request to your backend to initiate the password reset process
      const response = await axios.post(
        "http://localhost:8080/forgot_password",
        {
          email: email,
        }
      );
      console.log(response.data);

      // setMessage(response.data.data);
      if (response.status === 200) {
        navigate("/reset-password");
      }
    } catch (error) {
      console.log(error.response.status);
      if(error.response.status===404){
        setMessage("Not found email");
      }
      console.error(error);
      console.log(message);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password">
        <h2 className="title">Forgot Password</h2>
        {message && <p className="msg">{message}</p>}

        <form className="form-pass" onSubmit={handleForgotPassword}>
          <input
            className="contentforgot"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="submitforgot" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
