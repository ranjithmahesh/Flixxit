import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/user";
import "./LogIn1.scss";

function LogIn1() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });

      dispatch(login(res.data));
      console.log(res.data);
      history.push("/");
    } catch (err) {
      console.log(err);

      if (err.response && err.response.status === 401) {
        alert("Wrong email or password. Please try again.");
      }
    }
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <h1 className="logo">Flixxit </h1>
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Sign In
          </button>

          <span>
            New to Flixxit?{" "}
            <b
              onClick={() => {
                history.push("/register");
              }}
            >
              Sign up now.
            </b>
          </span>
        </form>
      </div>
    </div>
  );
}

export default LogIn1;
