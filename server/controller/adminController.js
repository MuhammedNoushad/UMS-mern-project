const User = require("../model/userModel");

const fetchUser = async (req, res) => {
  try {
    const userData = await User.find({ isAdmin: false });

    if (userData) {
      res.status(200).json({
        success: true,
        data: userData,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// For deleting the user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const userData = await User.findByIdAndDelete(id);

    if (userData) {
      res
        .status(200)
        .json({ success: true, message: "User successfully deleted." });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Something went wrong." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// To serch user from the database
const serchUser = async (req, res) => {
  try {
    const { q } = req.query;
    const users = await User.find({
      isAdmin: false,
      username: { $regex: new RegExp(`^${q}`) },
    });

    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// For edit the user in the database
const editUser = async (req, res) => {
  try {
    const data = req.body;

    const userData = await User.findByIdAndUpdate(data.id, {
      username: data.username,
      email: data.email,
      phone_number: data.phonenumber,
    });

    if (userData) {
      res
        .status(200)
        .json({ success: true, message: "User updated successfully." });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchUser,
  deleteUser,
  serchUser,
  editUser,
};
