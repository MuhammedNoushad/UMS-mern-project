import React from "react";
import Profile from "./Profile";
import { Container } from "react-bootstrap";

function Home() {
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Profile />
    </Container>
  );
}

export default Home;
