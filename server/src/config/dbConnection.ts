import mongoose, {ConnectOptions, Mongoose} from "mongoose";
import config from "./default.js";

const connectDB = async (): Promise<void> => {
    try {
        const uri: string =
            process.env.MONGO_URL || `mongodb://localhost:${config.port}/mydatabase`;

        const options: ConnectOptions = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        } as ConnectOptions;

        const con = await mongoose.connect(uri, options);


        console.log(`MongoDB Connected: ` + `${con.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        } else {
            console.log(`An unknown error occurred`);
        }
        process.exit(1);
    }
};

export default connectDB;
