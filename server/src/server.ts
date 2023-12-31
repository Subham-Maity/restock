import {port} from './config.js';
import app from './app.js';
import connectDB from "./config/dbConnection.js";
import swaggerDocs from "./utils/swagger.js";
import log from "./utils/logger.js";


// Connect to the database first
connectDB()
    .then(() => {
        // Start the server only when the DB connection is successful
        app.listen(port, () => {
            swaggerDocs(app, port);
            log.info(`Server live on: http://localhost:${port}`);

            //on usually used for listening to events like error, close, etc
        }).on('error', (e) => console.error(e));
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });