import express from "express";
import dotenv from "dotenv";
import authFilter from "../filter/authFilters.js";
import { fetchCollection } from "../mongo/mongoDB.js";
dotenv.config();

const router = express.Router();

router.get("/health", (req, res) => {
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
router.get("/channel/:title", async (req, res) => {
  let requestedChannel = req.params.title;
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
  title.title = title.title.toLowerCase().replaceAll(" ", "_");
  console.log("title: ", title);
  try {
    let existingChannel = await fetchCollection("channelList").findOne(title);

    if (existingChannel) {
      res.status(400).send("Room already exist");
      return console.log("existingChannel =", existingChannel.title);
    }

    let newChannel = await fetchCollection("channelList").insertOne(title);
    let createMsg = {
      msg: "Channel created",
      recieved: new Date().toLocaleString(),
    };
    let created = await fetchCollection(title.title).insertOne(createMsg);

    res.send("new channel created");
  } catch (err) {
    console.log(err);
  }
});

// send message to channel, user needs to have signed in
router.post("/channel/:title", async (req, res) => {
  let toChannel = req.params.title;
  let msgBody = req.body;
  msgBody.recieved = new Date().toLocaleString();
  msgBody.author = req.userDetails.username;

  let checkIfChannelExist = await fetchCollection("channelList").findOne(
    toChannel
  );

  if (checkIfChannelExist) {
    let socketURL = "http://127.0.0.1:3000/socket/" + toChannel
    let fetchOptions = {
      method: 'POST',
      body: msgBody
    }
    let socket = await fetch(socketURL, fetchOptions)
    let created = await fetchCollection(toChannel).insertOne(msgBody);
    res.send("message for channel " + toChannel + ", recived");
  } else {
    console.log(toChannel + " Does not exist");
    res.status(400).send("No such channel");
  }
});

//adding middleware
// all routed below need to be admin
router.use(authFilter.admin);

// for admin, delete a channel with title
router.delete("/channel/:title", async (req, res) => {
  let requestedChannel = req.params.title;
  try {
    let del = await fetchCollection("channelList").deleteOne({
      title: requestedChannel,
    });
    let drop = await fetchCollection(requestedChannel).drop();

    res.status(200).send("channel deleted");
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // Internal server error
  }
});

// for admin to send emergency message to be broadcast to all users
router.post("/broadcast", async (req, res) => {
  let msgBody = req.body;
  msgBody.recieved = new Date().toLocaleString();
  msgBody.author = "Administrator";

  let created = await fetchCollection("broadcast").insertOne(msgBody);
  res.send("message for channel braodcast, recived");
});

export default router;
