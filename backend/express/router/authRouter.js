import express from "express";

const auth = express.Router();

// for user log in
auth.post("/login", (req, res) => {
  res.send("User logged in");
});

// for user registration
auth.post("/register", (req, res) => {
  res.send("user created");
});

export default auth;
