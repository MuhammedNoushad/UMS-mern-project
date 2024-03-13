const express = require("express");
const multer = require("multer");
const userController = require("../controller/userController");

const user_route = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Multer upload instance
const upload = multer({ storage: storage });

// Route setup
user_route.post("/signup", userController.addNewUser);
user_route.post("/login", userController.loginUser);

// Edit profile route with file upload
user_route.put("/edit_profile", upload.single("image"), userController.editProfile);

module.exports = user_route;
