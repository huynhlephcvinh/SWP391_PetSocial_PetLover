import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; 
import "./resetpassword.scss";

function ResetPassword() {
  const { token } = useParams();
  const [authCode, setAuthCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://103.253.147.216:8080/reset_password",
        {
          token: authCode,
          password: password,
        }
      );

      setMessage(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  }, [token]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password">
        <h2 className="title">Reset Password</h2>
        <form className="form-reset" onSubmit={handleResetPassword}>
          <input
            className="form-input"
            type="text"
            placeholder="Enter Auth Code"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
          />
          <input
            className="form-input"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="show-password-container">
            <div className="show-password-checkbox">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              <label>Show Password</label>
            </div>
            <button className="resetSubmit" type="submit">
              Reset Password
            </button>
          </div>
        </form>

        {message && <p className="msg">{message}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;