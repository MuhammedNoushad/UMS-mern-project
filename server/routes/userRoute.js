const express = require("express");

const userController = require("../controller/userController");

const user_route = express.Router();

user_route.post("/signup", userController.addNewUser);
user_route.post("/login", userController.loginUser);

module.exports = user_route;
