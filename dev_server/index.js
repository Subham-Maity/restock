import express from "express";
const server = express();
const port = 8000;

server.get("/", (req, res) => {
  res.json({ status: "Server On" });
});

server.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
