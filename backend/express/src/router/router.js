import express from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ msg: "up and running" });
});

// for all users to se all channels
router.get("/channel", (req, res) => {
  res.send("channel list");
});

// connect to channel, user needs to sign in
router.get("/channel/:id", (req, res) => {
  res.send("messages for channel with id , socket.io");
});

// create a new channel, user needs to sign in
router.put("/channel", (req, res) => {
  res.send("new channel, title: req.body.title");
});

// send message to channel, user needs to sign in
router.post("/channel/:id", (req, res) => {
  res.send("message for channel id, recived");
});

// delete a channel with id, user needs to sign in
router.delete("/channel/:id", (req, res) => {
  res.send("channel with id deleted");
});

// for all users to se all emergency messages
router.get("/broadcast", (req, res) => {
  res.send("emergency messages");
});

// for admin to send emergency message to be broadcast to all users
router.post("/broadcast", (req, res) => {
  res.send("emergency message sent, socket.io");
});

export default router;
