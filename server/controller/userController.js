const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

// To add new User
const addNewUser = async (req, res) => {
  try {
    const data = req.body;

    const user = new User({
      username: data.username,
      email: data.email,
      password: data.password,
      phone_number: data.phonenumber,
    });

    const userData = await user.save();

    if (userData) {
      res.status(200).json({
        success: true,
        message: "User created successfully.",
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Sorry, Something went wrong." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// Check Credential and login user
const loginUser = async (req, res) => {
  try {
    const data = req.body;

    const userData = await User.findOne({ email: data.email });

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (userData.password === data.password) {
      const token = jwt.sign({ userId: userData._id }, "your_secret_key_here", {
        expiresIn: "1h",
      });

      res.status(200).json({
        success: true,
        message: "User login successful.",
        isAdmin: userData.isAdmin,
        data: userData,
        token: token,
      });
    } else {
      res.status(401).json({ success: false, message: "Incorrect password." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// To edit user profile
const editProfile = async (req, res) => {
  try {
    const data = req.body;
    const file = req.file;

    const user = await User.findById(data.id);

    const image = file ? file.filename : user.image;

    const userData = await User.findByIdAndUpdate(data.id, {
      username: data.username,
      email: data.email,
      phone_number: data.phonenumber,
      image: image,
    });

    if (userData) {
      res
        .status(200)
        .json({ success: true, message: "User updated successfully." });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = {
  addNewUser,
  loginUser,
  editProfile,
};
