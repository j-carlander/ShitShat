import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.post("/socket/:id", (req, res) => {
  let channel = req.params.id;
  let msg = req.body;
  //   io.to(channel).emit(msg);
  io.emit(channel, msg);

  res.sendStatus(200);
});

io.on("connection", (socket) => {
  socket.emit("new-connection", `User connected`);

  socket.on("disconnect", () => console.log("User left"));
  //   socket.on("send-message", (data) => {
  //     console.log(data);
  //     socket.broadcast.emit("new-message", data);
  //   });
});

httpServer.listen(3000, () => {
  console.log("Server listen on 3000");
});
