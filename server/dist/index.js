import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/dbConnection.js";
/* CONFIG */
/* CONFIG */
dotenv.config();
const server = express();
server.use(express.json());
server.use(helmet());
server.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
server.use(morgan("common"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8000;
server.get("/", (req, res) => {
    res.send("Yes, you are connected to the server! ✅");
});
(async () => {
    await connectDB()
        .then(() => {
        server.listen(PORT, () => {
            console.log(`Server live on: ` + `http://localhost:${PORT}`);
        });
    })
        .catch((err) => {
        console.log("Error: ", err);
        throw new Error(err.message);
    });
})();
//# sourceMappingURL=index.js.map