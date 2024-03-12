import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

import SignupCard from "../UI/Card";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../UI/Toaster";

function Signup() {
  const navigate = useNavigate();
  const showToast = useToast();
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const usernameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const formHandler = (event) => {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (usernameRef.current.value.trim() === "") {
      setUsernameError("Please enter a valid username");
      return;
    }

    if (
      phoneRef.current.value.trim() === "" ||
      !phonePattern.test(phoneRef.current.value)
    ) {
      setPhoneError("Please enter a valid phone number");
      return;
    }

    if (
      emailRef.current.value.trim() === "" ||
      !emailPattern.test(emailRef.current.value)
    ) {
      setEmailError("Please enter a valid email");
      return;
    }

    if (passwordRef.current.value.trim() === "") {
      setPasswordError("Please enter a valid password");
      return;
    }

    // If all validations pass, submit the form
    const data = {
      username: usernameRef.current.value,
      phonenumber: phoneRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post("/signup", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        showToast(res.data.message, "success");
        navigate("/login");
      })
      .catch((error) => {
        showToast(error.message, "error");
      });
  };

  return (
    <SignupCard>
      <h3 className="text-center">Signup</h3>
      <form className="d-grid" onSubmit={formHandler} noValidate>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            ref={usernameRef}
            onChange={() => setUsernameError("")}
          />
          {usernameError && <p className="text-danger">{usernameError}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="phonenumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone-number"
            ref={phoneRef}
            onChange={() => setPhoneError("")}
          />
          {phoneError && <p className="text-danger">{phoneError}</p>}
        </div>
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
          Signup
        </Button>
        <br />
        <br />
        <p className="text-center d-flex justify-content-center">
          Have an Account ?
          <a href="/login" className="text-primary fw-italic ms-2">
            Login
          </a>
        </p>
      </form>
    </SignupCard>
  );
}

export default Signup;
