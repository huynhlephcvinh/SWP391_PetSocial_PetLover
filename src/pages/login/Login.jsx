import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { OAuthProvider, OAuthButton } from "@react-oauth/google";
import axios from "axios";

import "./login.scss";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  async function login(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/signin", {
        email: email,
        password: password,
      });

      console.log(response.data);

      if (response.data === "Activated") {
        setError("Your account has not been activated!");
      } else if (response.data === "Incorrect") {
        setError("Incorrect username or password");
      } else {
        localStorage.setItem("token", response.data);
        const token = localStorage.getItem("token");
        const response1 = await axios.get(
          "http://localhost:8080/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("res1: "+response1.data.data.postDTOList);
        localStorage.setItem(
          "currentUser",
          JSON.stringify(response1.data.data)
        );
        localStorage.setItem(
          "postsListDTO",
          JSON.stringify(response1.data.data.postDTOList)
        );
        // const user2 = JSON.parse(localStorage.getItem("currentUser"));
        // console.log("list ="+JSON.parse(localStorage.getItem('postsListDTO')));
        // console.log("current ="+user2.postDTOList);
        // console.log("current ="+user2.name);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h2 style={{ fontSize: 50 }}>Welcome</h2>
          <p>
            Dog Cat is a social networking platform that helps connect animal
            lovers, specifically dogs and cats, together. People can connect and
            exchange their pets.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <button>Login with google</button>
          <form onSubmit={login}>
            {error && (
              <h5 style={{ color: "red", fontStyle: "italic", fontSize: 12 }}>
                {error}
              </h5>
            )}
            {/* {error && <h5 style={{color:'red'}}>{error}</h5>} */}
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
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
