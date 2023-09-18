import express from "express";
const port = 8000;
const server = express();
server.get("/", (req, res) => {
    res.json({ status: "Server On" });
});
server.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
//# sourceMappingURL=index.js.map