import app from "./src/app.js";
import { PORT } from "./src/config.js";
import connectDB from "./src/services/database.js";

// Connecting with DB
connectDB()

const serverPort = PORT || 3000;

app.listen(serverPort, () => {
    console.log("Listening on port:", serverPort)
})