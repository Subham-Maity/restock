import express, { Application, Request, Response } from "express";
const port = 8000;

const server: Application = express();

server.get("/", (req: Request, res: Response) => {
  res.json({ status: "Server On" });
});

server.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
