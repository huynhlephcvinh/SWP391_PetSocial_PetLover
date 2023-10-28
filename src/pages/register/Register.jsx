import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./register.scss";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  function isFormValid() {
    return name.trim() !== "" && email.trim() !== "" && phone.trim() !== "" && password.trim() !== "";
  }

  async function register(event) {
    event.preventDefault();

    if (!isFormValid()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/createUser", {
        name: name,
        email: email,
        phone: phone,
        password: password,
      }
      );

      console.log(response.data);

      if (response.data === true
        ) {
          setSuccess("Register success. Check your email to complete verification");
      } else {
        setError("Email is already exists");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={register}>
          {success && <h5 style={{ color: 'greenyellow', fontStyle: 'italic' }}>{success}</h5>}
          {error && <h5 style={{ color: 'red', fontStyle: 'italic' }}>{error}</h5>}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
