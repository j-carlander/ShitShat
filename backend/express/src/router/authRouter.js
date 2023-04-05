import express from "express";
import bcrypt from "bcrypt";

const auth = express.Router();

// for user log in
auth.post("/login", (req, res) => {
  let dbUser; // = fetch(db).find({username:req.body.identifier})

  if (!dbUser) return res.status(400).send("wrong username or password");

  let passwordMatch = bcrypt.compare(req.body.password, dbUser.password);

  if (passwordMatch) {
    // let token = jwtUtil.
    res.send("User logged in");
  }
});

// for user registration
auth.post("/register", (req, res) => {
  res.send("user created");
});

export default auth;
