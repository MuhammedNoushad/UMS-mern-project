const express = require("express");

const userController = require("../controller/userController");

const user_route = express.Router();

user_route.get("/", userController.loadHome);

module.exports = user_route;
