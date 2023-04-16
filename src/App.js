import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import "bootstrap/dist/css/bootstrap.min.css";
import sea from "./assests/sea.png";
import facebook from "./assests/facebookicon.png";
import google from "./assests/GoogleLogo.png";
import "./App.scss";

function App() {
  const [enableDash, setEnableDash] = useState(false);
  const [inputs, setInputs] = useState({ username: "", password: "" });

  const handleInputs = (e) => {
    const { value, name } = e?.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleApi = async () => {
    const url = "http://localhost:3000/api/register";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Registered successfully");
        console.log(data);
        setInputs({});
        setEnableDash(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGetApi = async () => {
    const url = "http://localhost:3000/api/login";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Login successfull");
        console.log(data);
        setInputs({});
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <div className="login-container">
        {!enableDash && (
          <div className="d-flex flex-column login-input-container slide-right">
            <h2>Log In </h2>
            <p className="mb-5">
              Log in to your account to see your payments history and add your
              payments.
            </p>
            <TextField
              required
              id="outlined-required"
              label="Username or Email"
              className="mb-2"
              name="usename"
              value={inputs?.username}
              onChange={handleInputs}
            />
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              name="password"
              value={inputs?.password}
              onChange={handleInputs}
            />
            <div className="mt-4 mb-3 login-button-container">
              <p className="forgot-text">Forgot password ?</p>
              <Button
                variant="contained"
                size="large"
                endIcon={<EastOutlinedIcon />}
                onClick={() => {
                  handleGetApi();
                }}
              >
                Login
              </Button>
            </div>

            <hr />
            <p className="text-center text-muted">Or login with</p>
            <div className="social-container">
              <button className="d-flex">
                {" "}
                <img src={facebook} alt="Facebook" /> Facebook
              </button>
              <button>
                {" "}
                <img src={google} alt="Google" />
                Google
              </button>
            </div>
            <p className="text-center mt-3">
              Don’t have an account yet?{" "}
              <span
                onClick={() => {
                  setEnableDash(true);
                }}
              >
                Sign up
              </span>
            </p>
          </div>
        )}
        <div className={`${enableDash ? "slide-right" : "slide-left"}`}>
          <img src={sea} alt="sea" />
        </div>
        {enableDash && (
          <div className="d-flex flex-column login-input-container slide-left">
            <h2>Sign Up </h2>
            <p className="mb-3">create account to login account to login</p>
            <TextField
              required
              id="outlined-required"
              label="Username or Email"
              className="mb-2"
              name="email"
              value={inputs?.email}
              onChange={handleInputs}
            />
            <TextField
              required
              id="outlined-required"
              label="Username"
              className="mb-2"
              name="username"
              value={inputs?.username}
              onChange={handleInputs}
            />

            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              className="mb-2"
              autoComplete="current-password"
              name="password"
              value={inputs?.password}
              onChange={handleInputs}
            />
            <TextField
              required
              id="outlined-password-input"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              name="confirmpassword"
              value={inputs?.confirmpassword}
              onChange={handleInputs}
            />
            <div className="mt-4 mb-3 login-button-container">
              <p className="forgot-text"></p>
              <Button
                variant="contained"
                size="large"
                endIcon={<EastOutlinedIcon />}
                onClick={() => {
                  handleApi();
                }}
              >
                SignUp
              </Button>
            </div>

            <hr />
            <p className="text-center mt-3">
              Already having an account?{" "}
              <span
                onClick={() => {
                  setEnableDash(false);
                }}
              >
                Login
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
