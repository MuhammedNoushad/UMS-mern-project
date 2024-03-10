import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

// Create GET request
app.get("/", (req, res) => {
    res.send("API");
  });

app.listen(port, () => {
  console.log(`app is running on the port http://127.0.0.1:${port}`);
});
