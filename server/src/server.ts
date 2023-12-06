import { port } from './config.js';
import app from './app.js';
import connectDB from "./config/dbConnection.js";


// Connect to the database first
connectDB()
    .then(() => {
        // Start the server only when the DB connection is successful
        app.listen(port, () => {
            console.log(`Server live on: http://localhost:${port}`);
        }).on('error', (e) => console.error(e));
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });