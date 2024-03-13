import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

import SignupCard from "../UI/Card";
import axios from "../axios/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../UI/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../store/usersDataSlice";

// Function to fetch data from the server
const fetchData = async (dispatch) => {
  try {
    const response = await axios.get("/admin/fetchUser");
    dispatch(setData(response.data.data));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function EditUser() {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const showToast = useToast();
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const usernameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const imageRef = useRef();
  const userData = useSelector((state) =>
    state.users.data.find((data) => data._id === id)
  );

  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);

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

    // Create a new FormData object
    const formData = new FormData();

    // Append fields to the FormData object
    formData.append("id", id);
    formData.append("username", usernameRef.current.value);
    formData.append("phonenumber", phoneRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("image", image);

    axios
      .put("/edit_profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        showToast(res.data.message, "success");
        navigate(`/${id}`);
      })
      .catch((error) => {
        showToast(error.message, "error");
      });
  };

  const showImage = image ? (
    <img
      alt="Posts"
      width="200px"
      height="200px"
      src={image ? URL.createObjectURL(image) : ""}
    ></img>
  ) : (
    <img
      alt="Posts"
      width="200px"
      height="200px"
      src={`http://localhost:8080/${userData.image}`}
    ></img>
  );

  return (
    <SignupCard>
      <h3 className="text-center">Edit User</h3>
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
            defaultValue={userData && userData.username}
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
            defaultValue={userData && userData.phone_number}
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
            defaultValue={userData && userData.email}
            onChange={() => setEmailError("")}
          />
          {emailError && <p className="text-danger">{emailError}</p>}
        </div>
        <div className="mb-3">
          {showImage}
          <input
            type="file"
            className="form_control"
            id="image"
            name="image"
            ref={imageRef}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <Button className="mx-auto" variant="secondary" type="submit">
          Update
        </Button>
      </form>
    </SignupCard>
  );
}

export default EditUser;
