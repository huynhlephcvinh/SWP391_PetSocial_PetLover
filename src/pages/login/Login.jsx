import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";
import { Button } from "@mui/material";

const Login = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    login();
  };

  const handleGoogleLogin = () => {
    // Xử lý đăng nhập bằng Google ở đây
  };

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
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
          </form>

          <Button
            variant="contained"
            color="primary" // Thay đổi màu sắc tùy ý
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon />} // Sử dụng Google icon component
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
