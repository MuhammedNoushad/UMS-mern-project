const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require("./routes/userRoute.js");
const adminRoute = require("./routes/adminRoute.js");
dotenv.config();

const app = express();
// connect to the database
mongoose.connect(process.env.MONGODB__URI);

mongoose.connection.on("connected", () => {
  console.log("database successfully connected.");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB Atlas connection error:", err);
});

const port = process.env.PORT || 8080;

app.use("/", userRoute);
app.use("/admin", adminRoute);

app.listen(port, () => {
  console.log(`app is running on the port http://127.0.0.1:${port}`);
});
