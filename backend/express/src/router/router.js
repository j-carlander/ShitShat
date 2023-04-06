import express from "express";
import dotenv from "dotenv";
import authFilter from "../filter/authFilters.js";
import { fetchCollection } from "../mongo/mongoDB.js";
dotenv.config();

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ msg: "up and running" });
});

// for all users to se all emergency messages
router.get("/broadcast", async (req, res) => {
  try {
    let result = await fetchCollection("broadcast").find().toArray();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

// for all users to se all channels
router.get("/channel", async (req, res) => {
  try {
    let result = await fetchCollection("channelList").find().toArray();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

// adding middelware,
// all routes below needs to authorize
router.use(authFilter.auth);

// connect to channel, user needs to have signed in
router.get("/channel/:id", async (req, res) => {
  let requestedChannel = req.params.id;
  try {
    let result = await fetchCollection(requestedChannel).find().toArray();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

// create a new channel, user needs to have signed in
router.put("/channel", async (req, res) => {

  const title = req.body;

  try {
  let existingChannel = await fetchCollection('channelList').findOne(title);

  if(existingChannel) {
    res.send("Room already exist");  
    return console.log("existingChannel =", existingChannel.title);
  }
    
    let newChannel = await fetchCollection("channelList").insertOne(title);

    res.send("new channel created");
  }catch(err) {
    console.log(err);
  };

  
});

// send message to channel, user needs to have signed in
router.post("/channel/:id", (req, res) => {
  let requestedChannel = req.params.id;
  res.send("message for channel id, recived");
});

//adding middleware
// all routed below need to be admin
router.use(authFilter.admin);

// for admin, delete a channel with id
router.delete("/channel/:id", (req, res) => {
  let requestedChannel = req.params.id;
  res.send("channel with id deleted");
});

// for admin to send emergency message to be broadcast to all users
router.post("/broadcast", (req, res) => {
  res.send("emergency message sent, socket.io");
});

export default router;
