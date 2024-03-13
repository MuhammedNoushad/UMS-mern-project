import React, { useEffect } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { BsPersonFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios/axios";
import { setData } from "../store/usersDataSlice";
import { useNavigate, useParams } from "react-router-dom";

// Function to fetch data from the server
const fetchData = async (dispatch) => {
  try {
    const response = await axios.get("/admin/fetchUser");
    dispatch(setData(response.data.data));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const userData = useSelector((state) =>
    state.users.data.find((data) => data._id === id)
  );

  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);

  const editUserHandler = (id) => {
    navigate(`/edit_profile/${id}`);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="mb-3">
          {!userData?.image ? (
            <Col xs={3}>
              <BsPersonFill size={40} />
            </Col>
          ) : (
            <img
              alt="Posts"
              width="200px"
              height="200px"
              src={`http://localhost:8080/${userData.image}`}
            ></img>
          )}
          <Col>
            <Card.Title>{userData && userData.username}</Card.Title>
            <Card.Text>{userData && userData.email}</Card.Text>
            <Card.Text>{userData && userData.phone_number}</Card.Text>
          </Col>
        </Row>
        <Button
          variant="outline-primary"
          onClick={() => {
            editUserHandler(userData._id);
          }}
        >
          Edit Profile
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Profile;
