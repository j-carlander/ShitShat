import express from "express";
import router from "./src/router/router.js";
import auth from "./src/router/authRouter.js";
import cors from 'cors';

const port = 4500;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "up and running" });
});

app.use("/auth", auth);
app.use("/api", router);

app.listen(port, () => {
  console.log("Server started, listening on port: " + port);
});

// console.log(process.env.URI);
