import React, { useState } from "react";
import { Form, FormControl } from "react-bootstrap";

import axios from "../axios/axios";
import { setData } from "../store/usersDataSlice";
import { useDispatch } from "react-redux";

function SearchBar() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleChange = async (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    try {
      const response = await axios.get(`/admin/search?q=${inputValue}`);
      dispatch(setData(response.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mx-auto p-4" style={{ maxWidth: "1200px" }}>
      <Form
        style={{ display: "flex", alignItems: "center" }}
        className="m-4 p-2"
      >
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={query}
          onChange={handleChange}
        />
      </Form>
    </div>
  );
}

export default SearchBar;
