import React, { Fragment, useEffect } from "react";
import { useSignOut } from "react-auth-kit";
import { Button, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoggedIn } from "../store/userDataSlice";

function NavbarComponent() {
  const isUserLoggedIn = useSelector((state) => state.userData.userLoggedIn);
  const dispatch = useDispatch(userLoggedIn);
  const navigate = useNavigate();
  const signOut = useSignOut();

  useEffect(() => {
    if (document.cookie) {
      dispatch(userLoggedIn(true));
    }
  }, []);

  const logoutHandler = () => {
    signOut();
    dispatch(userLoggedIn(false));
    navigate("/login");
  };

  const Nav = (
    <Navbar bg="light" expand="lg" className="m-4 p-2">
      <Navbar.Brand href="/">UMS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        {isUserLoggedIn && (
          <Button variant="outline-danger" onClick={logoutHandler}>
            Logout
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
  return <Fragment>{Nav}</Fragment>;
}

export default NavbarComponent;
