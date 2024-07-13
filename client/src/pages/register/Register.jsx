import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./Register.scss";
import { BASE_URL } from "../../services/heapler";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("rrrrrr");

  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handlePassword = () => {
    setPassword(passwordRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    const generatedUsername = generateRandomId();

    setUsername(generatedUsername);
    try {
      await axios.post(`${BASE_URL}/api/auth/register`, {
        username: generatedUsername,
        email,
        password,
      });

      history.push("/");
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 409) {
        alert("User already exists. Please try another email.");
      }
    }
  };


  const generateRandomId = () => {
    return uuidv4();
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <h1 className="logo">Flixxit </h1>
          <button
            className="loginButton"
            onClick={() => {
              history.push("/");
            }}
          >
            Sign In
          </button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="password"
              placeholder="password"
              ref={passwordRef}
              onChange={handlePassword}
            />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
