import express from "express";
import router from "./router/router.js";

const port = 4500;

const app = express();

app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
  console.log("Server started, listening on port: " + port);
});
