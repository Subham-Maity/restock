import mongoose, { ConnectOptions, Mongoose } from "mongoose";
import colors from "colors";
import config from "./default.js";

const connectDB = async (): Promise<void> => {
  try {
    const uri:string =
      process.env.MONGO_URL || `mongodb://localhost:${config.port}/mydatabase`;

    const options: ConnectOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions;

    const con = await mongoose.connect(uri, options);


    console.log(`MongoDB Connected: ` + `${con.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`.red.bold);
    } else {
      console.log(`An unknown error occurred`.red.bold);
    }
    process.exit(1);
  }
};

export default connectDB;
