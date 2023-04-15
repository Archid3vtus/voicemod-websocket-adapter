import express from "express";
import voicemodController from "./controllers/voicemod";

const server = express();
const { PORT: port, computerIP } = process.env;

// body parser middleware for JSON
server.use(express.json());

server.use("/voicemod", voicemodController);

server.get("/", (req, res) => {
  res.status(201).send("authenticating");
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
