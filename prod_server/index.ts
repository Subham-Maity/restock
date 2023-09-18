import express, { Express, Request, Response } from "express";
const port = 8000;

const server: Express = express();

server.get("/", (req: Request, res: Response) => {
  res.json({ status: "Server On" });
});

server.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
