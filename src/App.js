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
  const [error, setError] = useState(false);
  const emailRegex =
    /^[a-zA-Z0-9_]([\.-]?[a-zA-Z0-9_])*@[a-zA-Z0-9_]([\.-]?[a-zA-Z0-9_])*(\.[a-zA-Z0-9_]{2,})+$/;

  const handleInputs = (e) => {
    const { value, name } = e?.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleApi = async (e) => {
    e.preventDefault();
    if (
      Object(inputs)?.length === 4 &&
      inputs?.confirmpassword === inputs?.password
    ) {
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
          alert(data?.message);
          console.log(data);
          if (data?.status === "ok") {
            setInputs({});
            setError(false);
            setEnableDash(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setError(true);
    }
  };

  const handleGetApi = (e) => {
    e.preventDefault();
    setError(true);

    console.log("test");
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
        console.log(data);
        alert(data?.message);
        if (data?.status === "ok") {
          setError(false);
          setInputs({ username: "", password: "" });
        }
      })
      .catch((error) => {
        setError(false);
        console.error(error);
      });
  };

  return (
    <div className="App">
      <div className="login-container">
        {!enableDash && (
          <form onSubmit={handleGetApi}>
            <div className="d-flex flex-column login-input-container slide-right">
              <h2>Log In </h2>
              <p className="mb-3  ">
                Log in to your account to see your payments history and add your
                payments.
              </p>
              <TextField
                required
                id="outlined-required"
                label="Username"
                className="mb-2"
                name="username"
                value={inputs?.username || ""}
                onChange={handleInputs}
              />
              <TextField
                required
                error={error && !inputs?.password}
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
                  type="submit"
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
              <p className="text-center mt-2">
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
          </form>
        )}
        <div
          className={`sea-image ${enableDash ? "slide-right" : "slide-left"}`}
        >
          <img src={sea} alt="sea" />
        </div>
        {enableDash && (
          <form onSubmit={handleApi}>
            <div className="d-flex flex-column login-input-container slide-left">
              <h2>Sign Up </h2>
              <p className="mb-2">create account to login account to login</p>
              <TextField
                required
                error={!inputs?.email?.match(emailRegex) && error}
                id="outlined-required"
                label="Email"
                className="mb-2"
                name="email"
                value={inputs?.email}
                onChange={handleInputs}
              />
              <TextField
                error={error && !inputs?.username}
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
                error={error && !inputs?.password}
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
                error={
                  error &&
                  (!inputs?.confirmpassword ||
                    inputs?.confirmpassword !== inputs?.password)
                }
                helperText={`${
                  error && inputs?.confirmpassword !== inputs?.password
                    ? "Confirm password not matching"
                    : ""
                }`}
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                name="confirmpassword"
                value={inputs?.confirmpassword}
                onChange={handleInputs}
              />
              <div className="mt-3 mb-2 login-button-container">
                <p className="forgot-text"></p>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<EastOutlinedIcon />}
                  type="submit"
                >
                  SignUp
                </Button>
              </div>

              <hr />
              <p className="text-center mt-2">
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
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
