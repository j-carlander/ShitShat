import express, { response } from "express";
import bcrypt from "bcrypt";
import jwtUtil from "../util/jwtUtil.js";
import generateUsername from "../services/generateUsername.js";
import registerUserInDb from "../services/registerUserInDb.js";
import { fetchCollection } from "../mongo/mongoDB.js";

const auth = express.Router();

// for user log in
auth.post("/login", async (req, res) => {
  let dbUser = await fetchCollection("users").findOne({
    email: req.body.identifier,
  });
  console.table(dbUser);
  if (!dbUser) return res.status(400).send("wrong username or password");

  let passwordMatch = await bcrypt.compare(req.body.password, dbUser.password);

  if (passwordMatch) {
    let userDetails = {
      username: dbUser.username,
      admin: dbUser.admin,
    };
    let token = jwtUtil.generateToken(userDetails);
    let responseBody = {
      jwt: token,
      details: userDetails,
    };
    res.status(200).json(responseBody);
  } else {
    res.status(400).send("wrong username or password");
  }
});

// for user registration
auth.post("/register", async (req, res) => {
  if (
    req.body.firstname == undefined ||
    req.body.lastname == undefined ||
    req.body.email == undefined ||
    req.body.password == undefined
  ) {
    return res.status(400).send("Missing user details");
  }

  let passwordHash = await bcrypt.hash(req.body.password, 10);
  let user = {
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    username: generateUsername(req.body.firstname, req.body.lastname),
    email: req.body.email,
    password: passwordHash,
    admin: false,
  };

  let registered = await registerUserInDb(user);
  res.status(registered.status).json(registered.result);
});

export default auth;
