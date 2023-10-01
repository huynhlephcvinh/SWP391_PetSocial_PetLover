import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
// import { setAuthHeader } from "../../components/helper/axios_helper";
// import { request } from "../../components/helper/axios_helper"; // Import the request function
// Import the request function
import axios from "axios";

import "./login.scss";

function Login() {
  // const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 200) {
        // Authentication successful
        console.log("Login successful!");
        navigate("/home");
        // Handle token storage, user state update, and redirection here
      } else {
        // Authentication failed
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      // Network error or other issues
      console.error("Login failed:", error.message);
    }
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={login}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
