import log from "../utils/logger/logger";
import http from "http";
import app from "./app";
import swaggerDocs from "../services/swagger/swagger";
import "../logs";
import connectDB from "../config/dbConnect";
import config from "../config/default";

const server = http.createServer(app);
(async () => {
  try {
    // Wait for DB connection to be established
    await connectDB();
    log.info("Connected to the database successfully.");
    server
      .listen(config.port, () => {
        swaggerDocs(app, config.port);
        log.info(`Server live on: http://localhost:${config.port}`);
      })
      .on("error", (e) => {
        log.error("Error occurred in the server:", e);
        // Exit the process with failure code
        process.exit(1);
      });
  } catch (error) {
    log.error("Error connecting to the database:", error);
    // Exit the process with failure code
    process.exit(1);
  }
})();
