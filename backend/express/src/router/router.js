import express from "express";
import dotenv from "dotenv";
import authFilter from "../filter/authFilters.js";
import { fetchCollection } from "../mongo/mongoDB.js";
import { sendToSocketServer } from "../services/socketService.js";
dotenv.config();

const router = express.Router();

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

// for all users to se all channels, user needs to have signed in
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

// connect to channel,
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
  const title = req.body.title ? req.body.title : false;

  if (!title) return res.status(400).send("Missing title for new room");

  title.title = title.title.toLowerCase().replaceAll(" ", "_");
  console.log("title: ", title);
  try {
    let existingChannel = await fetchCollection("channelList").findOne(title);

    if (existingChannel) {
      // prevent user from creating a room that already exist
      res.status(400).send("Room already exist");
      return console.log("existingChannel =", existingChannel.title);
    }

    let newChannel = await fetchCollection("channelList").insertOne(title);
    await sendToSocketServer("channel-list", {
      // send new room to socket server to broadcast that a new room was created.
      title: title.title,
      _id: newChannel.insertedId,
    });

    let createMsg = {
      msg: "Channel created",
      recieved: new Date().toLocaleString(),
    };
    await fetchCollection(title.title).insertOne(createMsg);

    res.send("new channel created");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

// send message to channel, user needs to have signed in
router.post("/channel/:title", async (req, res) => {
  let toChannel = req.params.title;
  let msgBody = req.body;
  msgBody.recieved = new Date().toLocaleString();
  msgBody.author = req.userDetails.username;

  let checkIfChannelExist = await fetchCollection("channelList").findOne({
    title: toChannel,
  });

  if (checkIfChannelExist) {
    // user can only send messages to rooms that exist
    await Promise.all([
      sendToSocketServer(toChannel, msgBody), // sends the message to the socket server for broadcasting on selected channel
      fetchCollection(toChannel).insertOne(msgBody), // saves the message to the database
    ]);
    res.send("message for channel " + toChannel + ", recived");
  } else {
    console.log(toChannel + " Does not exist");
    res.status(400).send("No such channel");
  }
});

// adding middleware
// all routes below need to be admin
router.use(authFilter.admin);

// for admin, delete a channel with title
router.delete("/channel/:title", async (req, res) => {
  if (!req.query.confirmed)
    return res.status(400).send("Room deletion not confirmed");

  let requestedChannel = req.params.title ? req.params.title : false;

  if (!requestedChannel) return res.status(400).send("No room provided");

  try {
    await Promise.all([
      fetchCollection("channelList").deleteOne({
        // removes the channel from the list of channels
        title: requestedChannel,
      }),
      fetchCollection(requestedChannel).drop(), // drops the collection for the channel
    ]);

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

  await Promise.all([
    sendToSocketServer("broadcast", msgBody), // send new message to socket server for broadcasting
    fetchCollection("broadcast").insertOne(msgBody), // save new message to database
  ]);

  res.send("message for channel braodcast, recived");
});

export default router;
