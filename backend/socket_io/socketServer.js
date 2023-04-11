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

// app.post('/message'(req,res) => {

// })

io.on("connect", (socket) => {
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
