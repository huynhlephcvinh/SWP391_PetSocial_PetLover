import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// import { GoogleLogin } from "react-google-login";
import { signInWithGoogle } from "../../firebase";

import "./login.scss";
<<<<<<< HEAD
import { AuthContext, AuthContextProvider } from "../../context/authContext";
import { signInWithGoogle } from "../../firebase";

=======
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
<<<<<<< HEAD
  const { LoginAuth } = useContext(AuthContext);
  // let res;
  useEffect(()=>{
    let token = localStorage.getItem("token");
    if(token){
      navigate("/");
    }
  },[])
  
  const handleLogin = async () => {
    if (!username || !password) {
      return;
    }
    let res = await LoginAuth(username, password);
    // console.log(res);
    // console.log(">>Token : " + res.data);

    if (res.data === "Activated") {
      setError("Your account has not been activated!");
    } else if (res.data === "Incorrect") {
      setError("Incorrect username or password");
    } else {
      localStorage.setItem('token', res.data);
      const token = localStorage.getItem('token');
      const response1 = await axios.get('http://103.253.147.216:8080/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
=======
  async function login(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/signin", {
        email: email,
        password: password,
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
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
        navigate("/"); // Chuyển hướng tới trang chủ
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
          <button onClick={signInWithGoogle}>Login with google</button>
<<<<<<< HEAD
          <form
          // onSubmit={login}
          >
            {error && <h5 style={{ color: 'red', fontStyle: 'italic', fontSize: 12 }}>{error}</h5>}
=======
          <form onSubmit={login}>
            {error && (
              <h5 style={{ color: "red", fontStyle: "italic", fontSize: 12 }}>
                {error}
              </h5>
            )}
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
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
          <Link to="/forgot-password">Forgot Password</Link>
<<<<<<< HEAD

=======
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
        </div>
      </div>
    </div>
  );
}

export default Login;
