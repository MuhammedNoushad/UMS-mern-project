const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute.js");
const adminRoute = require("./routes/adminRoute.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.use("/", userRoute);
app.use("/admin", adminRoute);

// Connect to the database
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("Database successfully connected.");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB Atlas connection error:", err);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on the port http://127.0.0.1:${port}`);
});
