const express = require("express");

const adminController = require("../controller/adminController");

const admin_route = express.Router();

admin_route.get("/fetchUser", adminController.fetchUser);
admin_route.delete("/delete_user/:id", adminController.deleteUser);
admin_route.get("/search", adminController.serchUser);
admin_route.put("/edit_user", adminController.editUser);

module.exports = admin_route;
