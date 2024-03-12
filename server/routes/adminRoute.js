const express = require("express");

const adminController = require("../controller/adminController");

const admin_route = express.Router();

admin_route.get("/fetchUser", adminController.fetchUser);
admin_route.delete("/delete_user/:id", adminController.deleteUser);
admin_route.get("/search", adminController.serchUser);

module.exports = admin_route;
