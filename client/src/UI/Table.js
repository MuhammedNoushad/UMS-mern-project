import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

import axios from "../axios/axios";
import { useToast } from "./Toaster";
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

function Table() {
  const showToast = useToast();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.data);

  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);

  // Delete the user from the database
  const userDeleteHandler = async (id) => {
    try {
      const response = await axios.delete(`/admin/delete_user/${id}`);

      if (response.status === 200) {
        showToast(response.data.message, "success");
        fetchData(dispatch);
      } else {
        showToast(response.data.message, "error");
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const tableData = users.length ? (
    <table className="table table-striped table-bordered ">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((row) => (
          <tr key={row._id}>
            <td>{row.username}</td>
            <td>{row.email}</td>
            <td>{row.phone_number}</td>
            <td className="d-flex justify-content-between">
              <Button variant="outline-warning">Edit</Button>
              <span className="mx-2"></span>
              <Button
                variant="outline-danger"
                onClick={() => {
                  userDeleteHandler(row._id);
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="d-flex justify-content-center align-items-center">
    <img
      className="m-b-3"
      src="https://i.pinimg.com/564x/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.jpg"
      alt="placeholder"
    />
  </div>
  );

  return (
    <div className="mx-auto p-4" style={{ maxWidth: "1200px" }}>
      {tableData}
    </div>
  );
}

export default Table;
