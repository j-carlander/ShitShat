import express, { response } from "express";
import bcrypt from "bcrypt";
import jwtUtil from "../util/jwtUtil.js";
import generateUsername from "../services/generateUsername.js";
import registerUserInDb from "../services/registerUserInDb.js";

const auth = express.Router();

// for user log in
auth.post("/login", (req, res) => {
  let dbUser; // = fetch(db).find({username:req.body.identifier})

  if (!dbUser) return res.status(400).send("wrong username or password");

  let passwordMatch = bcrypt.compare(req.body.password, dbUser.password);

  if (passwordMatch) {
    let payload = {
      username: dbUser.username,
      email: dbUser.email,
      role: dbUser.role,
    };
    let token = jwtUtil.generateToken(payload);
    let responseBody = {
      jwt: token,
      details: payload,
    };
    res.status(200).json(responseBody);
  } else {
    res.status(400).send("wrong username or password");
  }
});

// for user registration
auth.post("/register", async (req, res) => {
  if (
    req.body.firstName == undefined ||
    req.body.lastName == undefined ||
    req.body.email == undefined ||
    req.body.password == undefined
  ) {
    return res.status(400).send("Missing user details");
  }

  let hash = await bcrypt.hash(req.body.password, 10);
  let user = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    username: generateUsername(req.body.firstName, req.body.lastName),
    email: req.body.email,
    password: hash,
  };

  let registered = await registerUserInDb(user);
  res.send("user created");
});

export default auth;
