import app from "./src/app.js";
import { PORT } from "./src/config.js";


const serverPort = PORT || 3000;

app.listen(serverPort, () => {
    console.log("Listening on port:", serverPort)
})