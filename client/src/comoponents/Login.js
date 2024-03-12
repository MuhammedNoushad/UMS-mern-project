import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import LoginCard from "../UI/Card";
import { Button } from "react-bootstrap";
import { useSignIn } from "react-auth-kit";

import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../UI/Toaster";
import { setUser, userLoggedIn } from "../store/userDataSlice";

function Login() {
  const signIn = useSignIn();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showToast = useToast();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  const formHandler = (event) => {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      emailRef.current.value.trim() === "" ||
      !emailPattern.test(emailRef.current.value)
    ) {
      setEmailError("Please enter valid email");
      return;
    }

    if (passwordRef.current.value.trim() === "") {
      setPasswordError("Please enter valid password");
      return;
    }

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post("/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.success) {
          signIn({
            token: res.data.token,
            expiresIn: 3800,
            tokenType: "Bearer",
            authState: { email: data.email },
          });
          dispatch(setUser([res.data.data]));
          dispatch(userLoggedIn(true));
          if (res.data.isAdmin) {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          showToast(res.data.message, "error");
        }
      })
      .catch((error) => {
        showToast("Invalid credentials", "error");
      });
  };

  return (
    <LoginCard>
      <h3 className="text-center">Login</h3>
      <form className="d-grid" onSubmit={formHandler} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            ref={emailRef}
            onChange={() => setEmailError("")}
          />
          {emailError && <p className="text-danger">{emailError}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            ref={passwordRef}
            onChange={() => setPasswordError("")}
          />
          {passwordError && <p className="text-danger">{passwordError}</p>}
        </div>
        <Button className="mx-auto" variant="secondary" type="submit">
          Login
        </Button>
        <br />
        <br />
        <p className="text-center d-flex justify-content-center">
          Not a Member ?
          <a href="/signup" className="text-primary fw-italic ms-2">
            Sign up
          </a>
        </p>
      </form>
    </LoginCard>
  );
}

export default Login;
