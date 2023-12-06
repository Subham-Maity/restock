import mongoose from "mongoose";
import config from "./default.js";
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URL || `mongodb://localhost:${config.port}/mydatabase`;
        const options = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        };
        const con = await mongoose.connect(uri, options);
        console.log(`MongoDB Connected: ` + `${con.connection.host}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        }
        else {
            console.log(`An unknown error occurred`);
        }
        process.exit(1);
    }
};
export default connectDB;
//# sourceMappingURL=dbConnection.js.map