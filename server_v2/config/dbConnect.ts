import mongoose from "mongoose";
import config from "./default";
import log from "../utils/logger/logger";

const connectDB = async (): Promise<void> => {
  try {
    const uri: string =
      config.db || `mongodb://localhost:${config.port}/mydatabase`;
    //It is recommended to set useNewUrlParser, useUnifiedTopology, and useCreateIndex to true.
    mongoose.set("strictQuery", true);
    const con = await mongoose.connect(uri);

    log.info(`MongoDB Connected: ` + `${con.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      log.info(`Error: ${error.message}`);
    } else {
      log.info(`An unknown error occurred`);
    }
    process.exit(1);
  }
};

export default connectDB;
